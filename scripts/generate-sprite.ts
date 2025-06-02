import fs from "fs"
import path from "path"

import chokidar from "chokidar"
import { optimize } from "svgo"

const ICONS_DIR = path.join(process.cwd(), "public/icons")
const SPRITE_PATH = path.join(process.cwd(), "public/sprite.svg")
const TYPES_PATH = path.join(process.cwd(), "src/types/icon-names.ts")

const generateSvgSprite = async () => {
  try {
    if (!fs.existsSync(ICONS_DIR)) {
      fs.mkdirSync(ICONS_DIR, { recursive: true })
      return
    }

    const files = fs
      .readdirSync(ICONS_DIR)
      .filter(file => file.endsWith(".svg"))

    const symbols = await Promise.all(
      files.map(async file => {
        const filePath = path.join(ICONS_DIR, file)
        const svgContent = fs.readFileSync(filePath, "utf8")

        const optimized = optimize(svgContent, {
          plugins: [
            "removeDimensions",
            {
              name: "preset-default",
              params: {
                overrides: {
                  removeViewBox: false,
                },
              },
            },
            "removeTitle",
            "removeDesc",
            {
              name: "removeAttrs",
              params: {
                attrs: "(fill|stroke)",
              },
            },
          ],
        })

        const iconName = path.basename(file, ".svg")
        return optimized.data
          .replace("<svg", `<symbol id="icon-${iconName}"`)
          .replace("</svg>", "</symbol>")
          .replace(/<path /g, '<path fill="currentColor" ')
      })
    )

    const sprite = `
      <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        ${symbols.join("\n")}
      </svg>
    `

    fs.writeFileSync(SPRITE_PATH, sprite)

    const typeContent = `
      export const iconNames = {
        ${files.map(file => `'${path.basename(file, ".svg")}': true`).join(",\n  ")}
      } as const
      
      export type IconName = keyof typeof iconNames
    `

    fs.mkdirSync(path.dirname(TYPES_PATH), { recursive: true })
    fs.writeFileSync(TYPES_PATH, typeContent)
  } catch (error) {
    console.error("Error generating sprite:", error)
  }
}

generateSvgSprite()

if (process.env.NODE_ENV === "development") {
  chokidar
    .watch(ICONS_DIR)
    .on("add", generateSvgSprite)
    .on("change", generateSvgSprite)
    .on("unlink", generateSvgSprite)
}

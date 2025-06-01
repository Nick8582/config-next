"use client"

import { type PropsWithChildren } from "react"

import { Toaster } from "sonner"

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Toaster position={"bottom-right"} duration={2500} />
    </>
  )
}

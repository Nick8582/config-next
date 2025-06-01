export const AuthToken = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
} as const

export type AuthToken = (typeof AuthToken)[keyof typeof AuthToken]

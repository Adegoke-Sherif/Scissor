import crypto from "crypto"

export const generateShortUrl = () => {
  return crypto.randomBytes(4).toString("hex")
}


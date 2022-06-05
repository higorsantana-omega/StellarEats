import NotAuthorized from '@/errors/NotAuthorized'
import jwt from 'jsonwebtoken'

export default class Authentication {
  decodeAccessToken (accessToken: string | undefined): string {
    if (!accessToken) {
      throw new NotAuthorized('No token provided')
    }

    try {
      const userID = jwt.verify(
        accessToken,
        process.env.JWT_SECRET as string
      )

      return userID as string
    } catch {
      throw new NotAuthorized('Invalid token')
    }
  }

  createAccessToken (userID: string): string {
    const accessToken = jwt.sign(
      userID,
      process.env.JWT_SECRET as string
    )

    return accessToken
  }
}

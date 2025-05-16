/** @notice Library imports */
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { Response } from "express";
/// Local imports
import { JWT_AUTH_SECRET } from "@/configs";

export class AuthServices {
  public static signAndSetAuthCookie(res: Response, id: string) {
    const token = jwt.sign(id, JWT_AUTH_SECRET);
    res.cookie("authorization", token, {
      httpOnly: true,
    });
  }

  public static validateAuthCookie(token?: string): string | undefined {
    try {
      /// If no auth token
      if (!token) {
        return undefined;
      }

      const userId = jwt.verify(token, JWT_AUTH_SECRET);
      return userId as string;
    } catch {
      return undefined;
    }
  }

  public static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public static async isValidPassword(
    hash: string,
    plain: string
  ): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}

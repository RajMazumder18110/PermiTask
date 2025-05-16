/** @notice Library imports */
import type { NextFunction, Request, Response } from "express";
/// Local imports
import { AuthServices } from "@/services";
import { UnAuthorizedError } from "@/utils/errors";

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /// Extract & validate auth token
  const token = req.cookies.authorization;
  const userId = AuthServices.validateAuthCookie(token);
  if (!userId) {
    next(UnAuthorizedError);
    return;
  }

  /// Assign request context
  req.authUserId = userId as string;
  next();
};

/** @notice Library imports */
import { StatusCodes } from "http-status-codes";
import type { NextFunction, Request, Response } from "express";
/// Local imports
import { PermiTaskError } from "@/utils/errors";

export const errorHandlerMiddleware = (
  err: PermiTaskError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /// If it's a thrown error
  if (err instanceof PermiTaskError) {
    res.status(err.statusCode).json({
      message: err.message,
      errors: err.error,
    });
    return;
  }

  /// If its an unknown error
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "InternalServerError",
    errors: null,
  });
};

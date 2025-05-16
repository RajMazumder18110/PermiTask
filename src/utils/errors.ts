/** @notice Library imports */
import type { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";

/// Base error class
export class PermiTaskError extends Error {
  constructor(
    public statusCode: StatusCodes,
    public message: string,
    public error?: any
  ) {
    super(message);
    this.name = "PermiTaskError";
  }
}

export const formValidationError = (err: ZodError) =>
  new PermiTaskError(
    StatusCodes.BAD_REQUEST,
    "FormValidationError",
    err.flatten().fieldErrors
  );

export const UnAuthorizedError = new PermiTaskError(
  StatusCodes.UNAUTHORIZED,
  "UnAuthorized"
);

export const InvalidEmailOfPasswordError = new PermiTaskError(
  StatusCodes.BAD_REQUEST,
  "InvalidEmailOrPassword"
);

export const EmailAlreadyRegisteredError = new PermiTaskError(
  StatusCodes.CONFLICT,
  "EmailAlreadyRegistered"
);

/** @notice Library imports */
import { StatusCodes } from "http-status-codes";
import type { NextFunction, Request, Response } from "express";
/// Local imports
import {
  formValidationError,
  EmailAlreadyRegisteredError,
  InvalidEmailOfPasswordError,
} from "@/utils/errors";
import { UserServices, AuthServices } from "@/services";
import { loginSchema, registrationSchema } from "@/zod/schema";

export class AuthControllers {
  public static async whoAmI(req: Request, res: Response) {
    res.json({ message: "success", data: req.authUserId });
  }

  public static async login(req: Request, res: Response, next: NextFunction) {
    /// Payload validation
    const validationResult = loginSchema.safeParse(req.body);
    if (!validationResult.success) {
      next(formValidationError(validationResult.error));
      return;
    }

    /// Grabbing & Validate user
    const user = await UserServices.findByEmail(
      validationResult.data.email,
      true
    );
    if (!user) {
      next(InvalidEmailOfPasswordError);
      return;
    }

    /// Validate password
    const validPassword = await AuthServices.isValidPassword(
      user.password,
      validationResult.data.password
    );
    if (!validPassword) {
      next(InvalidEmailOfPasswordError);
      return;
    }

    /// Generate & assign authorization token
    AuthServices.signAndSetAuthCookie(res, user.id);

    /// Final response
    res.status(StatusCodes.OK).json({ message: "success" });
  }

  public static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    /// Payload validation
    const validationResult = registrationSchema.safeParse(req.body);
    if (!validationResult.success) {
      next(formValidationError(validationResult.error));
      return;
    }

    /// Grabbing & Validate user
    const user = await UserServices.findByEmail(validationResult.data.email);
    if (user) {
      next(EmailAlreadyRegisteredError);
      return;
    }

    /// Hashing password
    const hashedPassword = await AuthServices.hashPassword(
      validationResult.data.password
    );

    /// Adding into database
    const userId = await UserServices.create({
      ...validationResult.data,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });
    /// Generate & assign authorization token
    AuthServices.signAndSetAuthCookie(res, userId);

    /// Final response
    res.status(StatusCodes.CREATED).json({
      message: "success",
      data: {
        userId,
      },
    });
  }
}

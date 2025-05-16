/** @notice Library imports */
import { Router } from "express";
/// Local imports
import { authorization } from "@/middlewares";
import { AuthControllers } from "@/controllers";

/// Routes
const enum AuthRoutes {
  LOGIN = "/login",
  WHOAMI = "/whoami",
  REGISTER = "/register",
}

/// Auth Router
const authRouter = Router();

/// Routes
authRouter.post(AuthRoutes.LOGIN, AuthControllers.login);
authRouter.post(AuthRoutes.REGISTER, AuthControllers.register);

// After Authentication
authRouter.get(AuthRoutes.WHOAMI, authorization, AuthControllers.whoAmI);

export { authRouter };

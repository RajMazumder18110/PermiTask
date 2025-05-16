/** @notice Library imports */
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
/// Local imports
import { authRouter } from "@/routers";
import { COOKIE_SECRET, PORT, logger } from "@/configs";
import { loggerMiddleware, errorHandlerMiddleware } from "@/middlewares";

const app = express();

/// Global middlewares
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.use(cookieParser(COOKIE_SECRET));

/// Routers
app.use("/auth", authRouter);

/// Error handler
app.use(errorHandlerMiddleware);

/// listener
app.listen(PORT, () => logger.info({ status: "Running", PORT }));

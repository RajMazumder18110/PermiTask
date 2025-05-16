/** @notice Library imports */
import type { NextFunction, Request, Response } from "express";
/// Local imports
import { logger } from "@/configs";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /// Grabbing the start time.
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    const logDetails = {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      query: req.query,
      agent: req.headers["user-agent"],
    };

    if (res.statusCode >= 500) {
      logger.error(logDetails);
    } else if (res.statusCode >= 400) {
      logger.warn(logDetails);
    } else {
      logger.info(logDetails);
    }
  });

  next();
};

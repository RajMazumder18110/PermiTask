/** @notice Library imports */
import winston from "winston";

/// Logger
export const logger = winston.createLogger({
  level: "info",
  defaultMeta: {
    application: "PermiTask",
  },

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),

  transports: [new winston.transports.Console()],
});

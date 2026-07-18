import { NextFunction, Request, Response } from "express";

export interface HttpError extends Error {
  statusCode?: number;
}

export function errorHandler(
  error: HttpError,
  _request: Request,
  response: Response,
  _next: NextFunction,
): void {
  console.error(error);

  response.status(error.statusCode ?? 500).json({
    message: error.message || "Something went wrong",
  });
}

// helpers/session-regenerator.ts
import { Request, Response, NextFunction } from "express";

export const sessionRegenerator = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.session && !req.session.createdAt) {
      req.session.createdAt = new Date();
    }

    const now = Date.now();
    const createdAt = req.session?.createdAt?.getTime() ?? 0; // Check for null or undefined createdAt

    if (now - createdAt > 5 * 60 * 1000) {
      req.session.regenerate((err) => {
        if (err) return next(err);
        req.session.createdAt = new Date();
        next();
      });
      return;
    }
    next();
  };
};

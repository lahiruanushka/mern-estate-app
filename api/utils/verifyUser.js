import jwt from 'jsonwebtoken';
import { createError } from "./customError.js";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(createError(401, "Unauthorized access - no token provided."));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(createError(403, "Invalid or expired token."));
    }
    req.user = user;
    next();
  });
};

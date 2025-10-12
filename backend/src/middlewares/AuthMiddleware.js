import jwt from "jsonwebtoken";

const AuthMiddleware = async (req, res, next) => {
  const token = req.headers.token;

  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized. Please try again." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.id;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized. Please try again." });
  }
};

export default AuthMiddleware;

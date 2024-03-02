import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash); //a promiss with true or false
};
export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};
export const createJWT = (admin) => {
  const token = jwt.sign(
    {
      id: admin.id,
      email: admin.email,
    },
    process.env.JWT_SECRET
  );
  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }
  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.json({ message: "not valide token" });
    return;
  }

  try {
    const admin = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = admin;
    next();
  } catch (e) {
    console.error(e);
    res.status(401);
    res.json({ message: "not valide Token" });
    return;
  }
};


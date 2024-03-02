import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";
import { Request, Response, NextFunction } from "express";
import { verify, JwtPayload } from "jsonwebtoken"; // Replace with your library

//login
export const createNewAdmin = async (req, res, next) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const admin = await prisma.admin.create({
      data: {
        email: req.body.email,
        password: hashedPassword,
      },
    });
    const token = createJWT(admin);
    res.json({ token: token, message: "Admin has created succesfully" });
  } catch (error) {
    error.type = "input";
    next(error);
    // res.status(500).json({ error: error.message });
  }
};

//sign in

export const signin = async (req, res, next) => {
  const admin = await prisma.admin.findUnique({
    where: {
      email: req.body.email,
    },
  });
  const isValid = await comparePasswords(req.body.password, admin.password);
  if (!isValid) {
    res.status(401);
    res.json({
      massage: "nope you are not authorized please put Token in headers",
    });
    return;
  }
  const token = createJWT(admin);
  res.json({ token });
};
//logout :

const SECRET_KEY = "dina Mechraoui"; //secret key
export const logoutMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract the access token from the request (e.g., from headers):
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Missing access token" });
    }
    // Verify the token using the secret key:
    const decoded = verify(token, SECRET_KEY) as JwtPayload;
    // Check if the token is still valid (not expired):
    if (Date.now() >= decoded.exp * 1000) {
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    }

    res.json({ message: "Successfully logged out!" });
  } catch (error) {
    console.error("Error invalidating access token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const editMiddleware = async (req, res, next) => {
  try {
    const adminId = req.params.id;
    // Extract updatable fields from the request body:
    const { name, surname, phoneNumber, photoUrl } = req.body;

    // Optional field handling (set to null if not provided):
    const updateData = {
      name: name ? name : null,
      surname: surname ? surname : null,
      phoneNumber: phoneNumber ? phoneNumber : null,
      photoUrl: photoUrl ? photoUrl : null,
    };
    console.log("the updateData : ", updateData);
    const updatedAdmin = await prisma.admin.update({
      where: { id: adminId },
      data: updateData,
    });
    // Response with updated data or error message:
    if (updatedAdmin) {
      res
        .status(200)
        .json({ message: "Profile updated successfully", admin: updatedAdmin });
    } else {
      res.status(404).json({ message: "Admin with the provided ID not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

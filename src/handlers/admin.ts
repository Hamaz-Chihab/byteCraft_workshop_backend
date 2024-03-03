import { env } from "process";
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
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Access JWT_SECRET
const SECRET_KEY = process.env.JWT_SECRET;
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
export const createNewStudent = async (req, res, next) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const student = await prisma.student.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: hashedPassword,
        courseId: req.body.courseId,
      },
    });
    res.json({
      message: "a student has created succesfully",
      student: student,
    });
  } catch (error) {
    error.type = "input";
    next(error);
  }
};
export const createNewCourse = async (req, res, next) => {
  try {
    const course = await prisma.course.create({
      data: {
        name: req.body.name,
      },
    });
    console.log("this is the course you created : ", course);
    res.json({
      message: "a course has created succesfully",
      course: course,
    });
  } catch (error) {
    error.type = "input";
    next(error);
  }
};
export const deleteStudent = async (req, res, next) => {
  try {
    const studentExists = await prisma.student.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!studentExists) {
      return res.status(404).json({ message: "Student not found" });
    }

    const deleted = await prisma.student.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    // Handle other errors
    error.type = "input";
    next(error);
  }
};

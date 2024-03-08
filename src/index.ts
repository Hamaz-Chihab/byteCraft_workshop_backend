import * as dotenv from "dotenv";
dotenv.config();
import app from "./server";
import config from "./config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";

app.listen(config.port, () => {
  const httpServer = app.getHttpServer(); // Access the HTTP server

  // Mount Swagger UI middleware
  httpServer.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  console.log(`hello on http://localhost:${config.port}`);
  console.log("the server is opened NOW");
});

import cors from "cors";
import express from "express";
import { env } from "./config/env";
import movieRoutes from "./routes/movie.routes";
import { errorHandler } from "./middleware/error-handler";

export const app = express();

app.use(
  cors({
    origin: env.frontendUrl,
  }),
);

app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.use("/api/movies", movieRoutes);

app.use((_request, response) => {
  response.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

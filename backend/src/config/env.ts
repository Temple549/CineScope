import dotenv from "dotenv";

dotenv.config();

const requiredEnv = ["TMDB_API_KEY", "TMDB_BASE_URL"] as const;

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  port: Number(process.env.PORT ?? 4000),
  tmdbApiKey: process.env.TMDB_API_KEY as string,
  tmdbBaseUrl: process.env.TMDB_BASE_URL as string,
  frontendUrl: process.env.FRONTEND_URL ?? "http://localhost:3000",
};

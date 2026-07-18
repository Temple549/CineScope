import { Request, Response } from "express";
import { tmdbService } from "../services/tmdb.service";

function parsePage(value: unknown): number {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const parsed = Number(rawValue);

  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

function getRouteParam(value: string | string[] | undefined): string {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value) && typeof value[0] === "string") {
    return value[0];
  }

  const error = new Error("Missing route parameter") as Error & {
    statusCode?: number;
  };

  error.statusCode = 400;
  throw error;
}

function parseMovieId(value: string | string[] | undefined): number {
  const id = Number(getRouteParam(value));

  if (!Number.isInteger(id) || id <= 0) {
    const error = new Error("Invalid movie ID") as Error & {
      statusCode?: number;
    };

    error.statusCode = 400;
    throw error;
  }

  return id;
}

export async function getTrending(
  _request: Request,
  response: Response,
): Promise<void> {
  response.json(await tmdbService.getTrending());
}

export async function getPopular(
  request: Request,
  response: Response,
): Promise<void> {
  response.json(await tmdbService.getPopular(parsePage(request.query.page)));
}

export async function getTopRated(
  request: Request,
  response: Response,
): Promise<void> {
  response.json(await tmdbService.getTopRated(parsePage(request.query.page)));
}

export async function getUpcoming(
  request: Request,
  response: Response,
): Promise<void> {
  response.json(await tmdbService.getUpcoming(parsePage(request.query.page)));
}

export async function searchMovies(
  request: Request,
  response: Response,
): Promise<void> {
  const rawQuery = request.query.query;
  const query = Array.isArray(rawQuery)
    ? String(rawQuery[0] ?? "").trim()
    : String(rawQuery ?? "").trim();

  if (!query) {
    response.status(400).json({
      message: "A search query is required",
    });
    return;
  }

  response.json(
    await tmdbService.searchMovies(query, parsePage(request.query.page)),
  );
}

export async function getMovieDetails(
  request: Request,
  response: Response,
): Promise<void> {
  response.json(
    await tmdbService.getMovieDetails(parseMovieId(request.params.id)),
  );
}

export async function getMovieVideos(
  request: Request,
  response: Response,
): Promise<void> {
  response.json(
    await tmdbService.getMovieVideos(parseMovieId(request.params.id)),
  );
}

export async function getMovieCredits(
  request: Request,
  response: Response,
): Promise<void> {
  response.json(
    await tmdbService.getMovieCredits(parseMovieId(request.params.id)),
  );
}

export async function getSimilarMovies(
  request: Request,
  response: Response,
): Promise<void> {
  response.json(
    await tmdbService.getSimilarMovies(
      parseMovieId(request.params.id),
      parsePage(request.query.page),
    ),
  );
}

export async function getGenres(
  _request: Request,
  response: Response,
): Promise<void> {
  response.json(await tmdbService.getGenres());
}

export async function getMoviesByGenre(
  request: Request,
  response: Response,
): Promise<void> {
  const genreId = parseMovieId(request.params.genreId);

  response.json(
    await tmdbService.getMoviesByGenre(
      genreId,
      parsePage(request.query.page),
    ),
  );
}

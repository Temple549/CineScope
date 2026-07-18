import axios from "axios";
import {
  Credits,
  Genre,
  Movie,
  PaginatedResponse,
  Video,
} from "../types/movie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

export const movieApi = {
  getTrending: async () =>
    (await api.get<PaginatedResponse<Movie>>("/movies/trending")).data,

  getPopular: async (page = 1) =>
    (
      await api.get<PaginatedResponse<Movie>>("/movies/popular", {
        params: { page },
      })
    ).data,

  getTopRated: async (page = 1) =>
    (
      await api.get<PaginatedResponse<Movie>>("/movies/top-rated", {
        params: { page },
      })
    ).data,

  getUpcoming: async (page = 1) =>
    (
      await api.get<PaginatedResponse<Movie>>("/movies/upcoming", {
        params: { page },
      })
    ).data,

  search: async (query: string, page = 1) =>
    (
      await api.get<PaginatedResponse<Movie>>("/movies/search", {
        params: { query, page },
      })
    ).data,

  getDetails: async (id: number) =>
    (await api.get<Movie>(`/movies/${id}`)).data,

  getVideos: async (id: number) =>
    (await api.get<{ results: Video[] }>(`/movies/${id}/videos`)).data,

  getCredits: async (id: number) =>
    (await api.get<Credits>(`/movies/${id}/credits`)).data,

  getSimilar: async (id: number) =>
    (await api.get<PaginatedResponse<Movie>>(`/movies/${id}/similar`)).data,

  getGenres: async () =>
    (await api.get<{ genres: Genre[] }>("/movies/genres")).data,

  getByGenre: async (genreId: number, page = 1) =>
    (
      await api.get<PaginatedResponse<Movie>>(`/movies/genre/${genreId}`, {
        params: { page },
      })
    ).data,
};

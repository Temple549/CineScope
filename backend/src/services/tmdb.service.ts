import axios, { AxiosInstance } from "axios";
import { env } from "../config/env";
import {
  TmdbCredits,
  TmdbGenre,
  TmdbMovie,
  TmdbMovieDetails,
  TmdbPagedResponse,
  TmdbVideo,
  TmdbVideosResponse,
} from "../types/tmdb";

class TmdbService {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: env.tmdbBaseUrl,
      params: {
        api_key: env.tmdbApiKey,
        language: "en-US",
      },
      timeout: 10000,
    });
  }

  async getTrending(): Promise<TmdbPagedResponse<TmdbMovie>> {
    const response = await this.client.get<TmdbPagedResponse<TmdbMovie>>(
      "/trending/movie/week",
    );

    return response.data;
  }

  async getPopular(
    page = 1,
  ): Promise<TmdbPagedResponse<TmdbMovie>> {
    const response = await this.client.get<TmdbPagedResponse<TmdbMovie>>(
      "/movie/popular",
      { params: { page } },
    );

    return response.data;
  }

  async getTopRated(
    page = 1,
  ): Promise<TmdbPagedResponse<TmdbMovie>> {
    const response = await this.client.get<TmdbPagedResponse<TmdbMovie>>(
      "/movie/top_rated",
      { params: { page } },
    );

    return response.data;
  }

  async getUpcoming(
    page = 1,
  ): Promise<TmdbPagedResponse<TmdbMovie>> {
    const response = await this.client.get<TmdbPagedResponse<TmdbMovie>>(
      "/movie/upcoming",
      { params: { page } },
    );

    return response.data;
  }

  async searchMovies(
    query: string,
    page = 1,
  ): Promise<TmdbPagedResponse<TmdbMovie>> {
    const response = await this.client.get<TmdbPagedResponse<TmdbMovie>>(
      "/search/movie",
      {
        params: {
          query,
          page,
          include_adult: false,
        },
      },
    );

    return response.data;
  }

  async getMovieDetails(id: number): Promise<TmdbMovieDetails> {
    const response = await this.client.get<TmdbMovieDetails>(`/movie/${id}`);
    return response.data;
  }

  async getMovieVideos(id: number): Promise<TmdbVideosResponse> {
    const response = await this.client.get<TmdbVideosResponse>(
      `/movie/${id}/videos`,
    );

    return response.data;
  }

  async getMovieCredits(id: number): Promise<TmdbCredits> {
    const response = await this.client.get<TmdbCredits>(
      `/movie/${id}/credits`,
    );

    return response.data;
  }

  async getSimilarMovies(
    id: number,
    page = 1,
  ): Promise<TmdbPagedResponse<TmdbMovie>> {
    const response = await this.client.get<TmdbPagedResponse<TmdbMovie>>(
      `/movie/${id}/similar`,
      { params: { page } },
    );

    return response.data;
  }

  async getGenres(): Promise<{ genres: TmdbGenre[] }> {
    const response = await this.client.get<{ genres: TmdbGenre[] }>(
      "/genre/movie/list",
    );

    return response.data;
  }

  async getMoviesByGenre(
    genreId: number,
    page = 1,
  ): Promise<TmdbPagedResponse<TmdbMovie>> {
    const response = await this.client.get<TmdbPagedResponse<TmdbMovie>>(
      "/discover/movie",
      {
        params: {
          with_genres: genreId,
          page,
          sort_by: "popularity.desc",
        },
      },
    );

    return response.data;
  }
}

export const tmdbService = new TmdbService();

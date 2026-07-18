const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export function getPosterUrl(
  path: string | null,
  size: "w342" | "w500" | "original" = "w500",
): string {
  return path
    ? `${TMDB_IMAGE_BASE_URL}/${size}${path}`
    : "/poster-placeholder.svg";
}

export function getBackdropUrl(
  path: string | null,
  size: "w780" | "w1280" | "original" = "w1280",
): string {
  return path
    ? `${TMDB_IMAGE_BASE_URL}/${size}${path}`
    : "/backdrop-placeholder.svg";
}

export function getProfileUrl(path: string | null): string {
  return path
    ? `${TMDB_IMAGE_BASE_URL}/w185${path}`
    : "/profile-placeholder.svg";
}

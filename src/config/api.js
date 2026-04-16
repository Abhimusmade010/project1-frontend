/**
 * API origin for fetch calls.
 * - Development: defaults to "" so requests are same-origin and CRA's package.json "proxy" forwards them.
 * - Production: set REACT_APP_API_BASE_URL (no trailing slash), e.g. https://api.example.com
 */
const fromEnv = (process.env.REACT_APP_API_BASE_URL || "").trim().replace(/\/$/, "");

const API_BASE_URL =
  fromEnv ||
  (process.env.NODE_ENV === "development" ? "" : "");

if (!API_BASE_URL && process.env.NODE_ENV === "production") {
  console.warn(
    "REACT_APP_API_BASE_URL is not set. Production builds need it unless the API is served from the same origin."
  );
}

/** Parse JSON body; returns null if empty or not JSON (e.g. HTML error page from proxy). */
export async function parseResponseJson(response) {
  const text = await response.text();
  if (!text || !text.trim()) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export default API_BASE_URL;

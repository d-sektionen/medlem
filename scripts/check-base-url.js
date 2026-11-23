import { loadEnv } from "vite";

// Load the same env files Vite uses for a production build (.env,
// .env.production, .env.local, .env.production.local).
const env = loadEnv("production", process.cwd(), "");
const baseUrl = env.BASE_URL || "https://backend.d-sektionen.se";

if (baseUrl.includes("localhost") || baseUrl.includes("127.0.0.1")) {
  console.warn(
    `\nWarning: BASE_URL is set to "${baseUrl}", which includes "localhost".\n` +
      "The deployed site will not be able to reach the backend.\n" +
      "Update BASE_URL in your .env file (for example https://backend.d-sektionen.se) before deploying.\n",
  );

  process.exitCode = 1;
}

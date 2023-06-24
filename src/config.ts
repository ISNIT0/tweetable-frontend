const configs = {
  production: {
    apiUrl: "https://api-tweetable.hackthepress.org",
  },
  development: {
    apiUrl: "http://localhost:4000",
  },
};

const environment =
  process.env.NODE_ENV === "production" ? "production" : "development";
export const config = configs[environment];

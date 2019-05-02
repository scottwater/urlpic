import md5 from "md5";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

export default function(token: string, url: string): boolean {
  return token === generateToken(url);
}

export const generateToken = (
  url: string,
  key: string | undefined = envTokenKey
) => {
  if (!key) {
    throw new Error("No key set generating tokens");
  }

  return md5(`${url}:${key}`);
};

export const envTokenKey = process.env.TOKEN_KEY;

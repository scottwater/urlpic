import { generateToken } from "../src/authorization";
const url = process.argv[2];
const tokenKeyArg = process.argv[3];
let tokenKeyOverride = undefined;

//might be simpler with https://www.npmjs.com/package/minimist
//but this avoids another dependency

if (tokenKeyArg && tokenKeyArg === "--token") {
  if (process.argv[4]) {
    tokenKeyOverride = process.argv[4];
  }
}

if (url) {
  console.log(
    `Generating a token based on ${url} and ${tokenKeyOverride ||
      process.env.TOKEN_KEY ||
      "MISSING TOKEN!"}`
  );
  const token = generateToken(url, tokenKeyOverride);
  console.log(`TOKEN: ${token}`);
} else {
  console.log("No Url was supplied");
}
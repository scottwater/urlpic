import { IncomingMessage, ServerResponse } from "http";
import { parseRequest } from "./parser";
import { captureScreen } from "./chromium";
import ScreenOptions from "./screen_options";

const isDev = process.env.NOW_REGION === "dev1";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  try {
    if (!req.url) {
      res.writeHead(409, "No URL!");
      res.end("No Url");
      return;
    }

    const parsedReq = parseRequest(req.url);
    const screenOptions = new ScreenOptions(parsedReq);

    if (!screenOptions.isAuthorized) {
      res.writeHead(401, "Not Authorized");
      res.end(`The token '${screenOptions.token || "(MISSING)"}' is not valid`);
      return;
    }
    //const filePath = await writeTempFile(text, html);
    const file = await captureScreen(screenOptions, isDev);
    res.statusCode = 200;
    if (screenOptions.isPDF) {
      res.setHeader("Content-Type", "application/pdf");
    } else {
      res.setHeader("Content-Type", `image/${screenOptions.fileType}`);
    }

    if (!isDev) {
      res.setHeader(
        "Cache-Control",
        `public, immutable, no-transform, s-maxage=${
          screenOptions.ttl
        }, max-age=${screenOptions.ttl}`
      );
    } else {
      console.log(`Would have been cached for ${screenOptions.ttl} seconds`);
    }
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e);
  }
}

import { parse } from "url";

export function parseRequest(requestedUrl: string) {
  const { query = {} } = parse(requestedUrl || "", true);
  const { height, width, url, fileType, token, ttl, fullPage } = query;

  const parsedRequest: ParsedRequest = {
    height: getFirstArray(height),
    width: getFirstArray(width),
    url: getFirstArray(url),
    token: getFirstArray(token),
    ttl: getFirstArray(ttl),
    fullPage: getFirstArray(fullPage),
    fileType: getAndVerifyFileType(fileType)
  };
  return parsedRequest;
}

function getFirstArray(stringOrArray: string[] | string): string {
  return Array.isArray(stringOrArray) ? stringOrArray[0] : stringOrArray;
}

function getAndVerifyFileType(fileType: string[] | string): FileType {
  const firstFileType = getFirstArray(fileType);
  switch (firstFileType) {
    case "pdf":
      return "pdf";
    case "jpeg":
      return "jpeg";
    default:
      return "png";
  }
}

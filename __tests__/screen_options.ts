import ScreenOptions from "../src/screen_options";
import { generateToken } from "../src/authorization";
import { parseRequest } from "../src/parser";

const happyReq = (): ParsedRequest => {
  return {
    url: "https://scottw.com",
    width: "800",
    height: "600",
    ttl: "2hours",
    fileType: "png",
    fullPage: "0",
    token: generateToken("https://scottw.com")
  };
};

test("Should pull known values from a URL", () => {
  const parsedReq = happyReq();

  const so = new ScreenOptions(parsedReq);
  expect(so.url).toBe(parsedReq.url);
  expect(so.width).toBe(800);
  expect(so.height).toBe(600);
  expect(so.ttl).toBe(60 * 60 * 2);
  expect(so.isAuthorized).toBeTruthy();
  expect(so.fileType).toBe(parsedReq.fileType);
});

test("Should properly handle missing values", () => {
  // Typescript is smart enough to not let you create
  // a bad ParsedRequest via code. Not smart enough to
  // stop end users.
  const parsedReq = parseRequest("https://abadurl.com");
  const so = new ScreenOptions(parsedReq);
  expect(so.url).toBe("https://scottw.com");
  expect(so.width).toEqual(1600);
  expect(so.height).toBe(1200);
  expect(so.ttl).toBe(60 * 60);
  expect(so.isAuthorized).toBeFalsy();
  expect(so.fileType).toBe(parsedReq.fileType);
  expect(so.isPDF).toBeFalsy();
});

test("Should be a PDF", () => {
  const parsedReq = happyReq();
  parsedReq.fileType = "pdf";

  const so = new ScreenOptions(parsedReq);
  expect(so.url).toBe(parsedReq.url);
  expect(so.width).toBe(800);
  expect(so.height).toBe(600);
  expect(so.ttl).toBe(60 * 60 * 2);
  expect(so.isAuthorized).toBeTruthy();
  expect(so.fileType).toBe(parsedReq.fileType);
  expect(so.isPDF).toBeTruthy();
});

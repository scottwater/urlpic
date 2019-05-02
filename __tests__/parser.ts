import { parseRequest } from "../src/parser";

test("Should have a happy path with a expected url", () => {
  const requestedUrl =
    "https://somesite.com?height=100&width=50&token=abc&ttl=1hour&url=https://scottw.com";
  const parsedRequest = parseRequest(requestedUrl);
  expect(parsedRequest.url).toBe("https://scottw.com");
  expect(parsedRequest.height).toBe("100");
  expect(parsedRequest.width).toBe("50");
  expect(parsedRequest.token).toBe("abc");
  expect(parsedRequest.ttl).toBe("1hour");
});

test("Should be OK for all parameters to be missing", () => {
  const requestedUrl = "http://somebadsite.com";
  const parsedRequest = parseRequest(requestedUrl);
  expect(parsedRequest.url).toBeUndefined();
  expect(parsedRequest.height).toBeUndefined();
  expect(parsedRequest.width).toBeUndefined();
  expect(parsedRequest.token).toBeUndefined();
  expect(parsedRequest.ttl).toBeUndefined();
});

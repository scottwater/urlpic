import validate from "../src/authorization";
import md5 from "md5";

test("should not be authorized", () => {
  expect(validate("abc", "https://scottw.com")).toBeFalsy();
});

test("should be a valid token", () => {
  const token = md5(`https://scottw.com:${process.env.TOKEN_KEY}`);
  expect(validate(token, "https://scottw.com")).toBeTruthy();
});

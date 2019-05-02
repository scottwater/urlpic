import ttl from "../src/ttl";

test("It should default to 1 minute", () => {
  expect(ttl("")).toBe(60);
});

test("It will return just the number of seconds", () => {
  expect(ttl("3")).toBe(180);
});

test("It will return a multiple of the supplied unit", () => {
  expect(ttl("10 seconds")).toBe(600);
  expect(ttl("10 second")).toBe(600);
  expect(ttl("10seconds")).toBe(600);
  expect(ttl("10second")).toBe(600);
});

test("It should return 60 to a random string", () => {
  expect(ttl("HELLO WORLD")).toBe(60);
});

test("should use seconds if a unit of time does not exist", () => {
  expect(ttl("100 half days")).toBe(100 * 60);
});

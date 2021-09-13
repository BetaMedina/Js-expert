const { describe, it } = require("mocha");
const request = require("supertest");
const app = require("./api");
const assert = require('assert')

describe("API suite test", () => {
  describe("/contact", () => {
    it("should request the contact page and return http status 200", async () => {
      const response = await request(app)
      .get("/contact")
      .expect(200);

      assert.deepStrictEqual(response.text,'Contact page')
    });
  });
  describe("/", () => {
    it("should request an inexistent route and should expected return generic route", async () => {
      const response = await request(app)
      .get("/")
      .expect(200);

      assert.deepStrictEqual(response.text,'hello world')
    });
  });
});

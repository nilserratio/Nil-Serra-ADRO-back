import request from "supertest";
import app from "./app.js";

describe("Given a GET '/ping' endpoint", () => {
  describe("When it recieve a request", () => {
    test("Then it shoud respond with an status code 200 and message 'Entered'", async () => {
      const expectedStatusCode = 200;

      const pongMessage = {
        message: "Entered",
      };

      const response = await request(app)
        .get("/ping")
        .expect(expectedStatusCode);

      expect(response.body).toStrictEqual(pongMessage);
    });
  });
});

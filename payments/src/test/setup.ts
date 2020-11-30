import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";
import jwt from "jsonwebtoken";

declare global {
  namespace NodeJS {
    interface Global {
      signup(id?: string): string[];
    }
  }
}
jest.mock("../nats-wrapper");

process.env.STRIPE_KEY = "sk_test_czWJbdOA610q3DydwtqQgOvr00lXQx5XwQ";

let mongo: any;
beforeAll(async () => {
  jest.clearAllMocks();
  process.env.JWT_KEY = "asdfgh";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signup = (id?: string) => {
  // Build a JWT payload. { id, email, iat}
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };
  // Create JWT!

  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // Build Session Object { jwt: MY_JWT }
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);

  //Take JSON and encode it was base64
  const base64 = Buffer.from(sessionJSON).toString("base64");
  // return a string thats the cookie with the encoded data
  return [`express:sess=${base64}`];
};

import jwt from "jsonwebtoken";

function createAccessToken({ payload }) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      "privateKey",
      { algorithm: "HS256", expiresIn: "1d" },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}

function getHeaderToken(req) {
  return req.headers["authorization"].split(" ")[1];
}

function verifyJWT(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "privateKey", (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}

export { createAccessToken, getHeaderToken, verifyJWT };

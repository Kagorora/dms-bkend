import jwt from "jsonwebtoken";

const tokenGenerator = (id) => {
  return jwt.sign({ id }, process.env.PRIVATE_KEY, {
    expiresIn: "30d",
  });
};

export default tokenGenerator;

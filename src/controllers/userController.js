import asyncHandler from "express-async-handler";
import User from "../../database/models/userModel.js";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      userType: user.userType,
      email: user.email,
      location: user.location,
      token: null,
    });
  } else {
    res.status(401);
    throw new Error("Invalid userName or Password");
  }
});

export { authUser };

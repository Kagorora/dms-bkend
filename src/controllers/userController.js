import asyncHandler from "express-async-handler";
import User from "../../database/models/userModel.js";
import tokenGenerator from "../utils/tokenGenerator.js";

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
      token: tokenGenerator(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid userName or Password");
  }
});

const getProfile = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      userType: user.userType,
      email: user.email,
      location: user.location,
    });
  } else {
    res.status(401);
    throw new Error("No result found!");
  }
});


const updateProfile = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    if(req.body.password){
      user.password = req.body.password;
    }
    user.email = req.body.email || user.email;
    user.nationalId = req.body.nationalId || user.nationalId;
    user.userType = req.body.userType || user.userType;
    user.location = req.body.location || user.location;

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      userType: updateUser.userType,
      email: updateUser.email,
      location: updateUser.location,
      token: tokenGenerator(updateUser._id),
    })

  } else {
    res.status(404);
    throw new Error("No result found!");
  }
});



const userSignUp = asyncHandler(async (req, res) => {
  const {
    name,
    phoneNumber,
    password,
    email,
    nationalId,
    userType,
    location,
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    phoneNumber,
    password,
    email,
    nationalId,
    userType,
    location,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      email: user.email,
      nationalId: user.nationalId,
      userType: user.userType,
      location: user.location,
      token: tokenGenerator(user._id),
    });
  } else {
    res.status(400);
    throw new Error(error);
  }
});

export { authUser, getProfile, userSignUp, updateProfile };

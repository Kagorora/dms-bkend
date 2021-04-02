import asyncHandler from "express-async-handler";
import User from "../../database/models/userModel.js";
import tokenGenerator from "../utils/tokenGenerator.js";
import { isNationalId, isPhoneNumber } from "rwa-validator";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      userType: user.userType,
      email: user.email,
      token: tokenGenerator(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid userName or Password");
  }
});

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      userType: user.userType,
      email: user.email,
      phoneNumber: user.phoneNumber,
      nationalId: user.nationalId,
      province: user.province ,
      district: user.district ,
      sector: user.sector ,
      cell: user.cell ,
      village: user.village ,
      streetNumber: user.streetNumber
    });
  } else {
    res.status(404);
    throw new Error("No result found!");
  }
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    if (req.body.password) {
      user.password = req.body.password;
    }
    user.email = req.body.email || user.email;
    user.nationalId = req.body.nationalId || user.nationalId;
    user.userType = req.body.userType || user.userType;
    (user.phoneNumber = req.body.phoneNumber || user.phoneNumber),
    (user.nationalId = req.body.nationalId || user.nationalId);
    user.province = req.body.province || user.province ,
    user.district = req.body.district || user.district ,
    user.sector = req.body.sector || user.sector ,
    user.cell = req.body.cell || user.cell ,
    user.village = req.body.village || user.village ,
    user.streetNumber = req.body.streetNumber || user.streetNumber

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      userType: updateUser.userType,
      email: updateUser.email,
      phoneNumber: updateUser.phoneNumber,
      nationalId: updateUser.nationalId,
      province: updateUser.province ,
      district: updateUser.district ,
      sector: updateUser.sector ,
      cell: updateUser.cell ,
      village: updateUser.village ,
      streetNumber: updateUser.streetNumber,
      token: tokenGenerator(updateUser._id),
    });
  } else {
    res.status(404);
    throw new Error("No result found!");
  }
});

const userSignUp = asyncHandler(async (req, res) => {
  const {
    name,
    phoneNumber,
    nationalId,
    email,
    userType,
    password
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  if(isPhoneNumber(`${phoneNumber}`) == false){
    res.status(400);
    throw new Error("Invalid Phone Number!");
  }

  if(isNationalId(`${nationalId}`) == false){
    res.status(400);
    throw new Error("Invalid National Id!");
  }

  const user = await User.create({
    name,
    phoneNumber,
    nationalId,
    email,
    userType,
    password
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      nationalId: user.nationalId,
      email: user.email,
      userType: user.userType,
      token: tokenGenerator(user._id),
    });
  } else {
    res.status(400);
    throw new Error(error);
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (users) {
    res.json(users);
  } else {
    res.status(404);
    throw new Error("No result found!");
  }
});

const removeUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await User.remove(user);
    res.json("user deleted");
  } else {
    res.status(404);
    throw new Error("No result found!");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("No result found!");
  }
});

const updateUsersProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.password = user.password;
    user.email = req.body.email || user.email;
    user.nationalId = req.body.nationalId || user.nationalId;
    user.userType = req.body.userType || user.userType;
    (user.phoneNumber = req.body.phoneNumber || user.phoneNumber),
    (user.nationalId = req.body.nationalId || user.nationalId);

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      phoneNumber: updateUser.phoneNumber,
      email: updateUser.email,
      nationalId: updateUser.nationalId,
      userType: updateUser.userType,
      phoneNumber: updateUser.phoneNumber,
      nationalId: updateUser.nationalId,
    });
  } else {
    res.status(404);
    throw new Error("No result found!");
  }
});

export {
  authUser,
  getProfile,
  userSignUp,
  updateProfile,
  getAllUsers,
  removeUser,
  getUserById,
  updateUsersProfile,
};

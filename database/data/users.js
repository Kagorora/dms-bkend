import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    phoneNumber: "0782299719",
    password: bcrypt.hashSync("123456", 10),
    email: "admin@gmail.com",
    nationalId: "11994801",
    userType: "admin",
    location: "Kigali",
  },
  {
    name: "Aheza",
    phoneNumber: "0782299711",
    password: bcrypt.hashSync("123456", 10),
    email: "aheza@gmail.com",
    nationalId: "11994802",
    userType: "buyer",
    location: "Kigali",
  },
  {
    name: "Smart Home",
    phoneNumber: "0782299712",
    password: bcrypt.hashSync("123456", 10),
    email: "smart@gmail.com",
    nationalId: "11994803",
    userType: "seller",
    location: "Kigali",
  },
];

export default users;

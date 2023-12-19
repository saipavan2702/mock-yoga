import Data from "../models/db.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const registerRoute = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    age,
    batch,
    updatedDate,
    paymentStatus,
  } = req.body;
  const user = await Data.findOne({ email });

  if (user) {
    return res.json({ msg: "Email already exists", status: false });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const savedUser = await Data.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: hashedPassword,
    age: age,
    batch: batch,
    updatedDate: updatedDate,
    paymentStatus: paymentStatus,
  });

  delete savedUser.password;
  return res.json(savedUser);
};

const loginRoute = async (req, res) => {
  const { email, password } = req.body;
  const user = await Data.findOne({ email });

  if (!user) {
    return res.json({ msg: "Email is not registered", status: false });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({ msg: "Password does not match", status: false });
  }
  delete user.password;
  return res.json(user);
};

const updateRoute = async (req, res, next) => {
  try {
    const { email, paymentStatus } = req.body;

    const updatedUser = await Data.updateOne(
      { email: email },
      {
        paymentStatus: paymentStatus,
      }
    );

    const user = await Data.findOne({ email: email });
    return res.json(user);
  } catch (ex) {
    next(ex);
  }
};

const statusRoute = async (req, res, next) => {
  try {
    const user = await Data.findById(req.params.id);
    console.log(user);
    return res.json(user);
  } catch (ex) {
    next(ex);
  }
};

const batchRoute = async (req, res, next) => {
  try {
    const user = await Data.findById(req.params.id);
    const { batch } = req.body;
  } catch (ex) {
    next(ex);
  }
};
export { registerRoute, loginRoute, updateRoute, statusRoute, batchRoute };

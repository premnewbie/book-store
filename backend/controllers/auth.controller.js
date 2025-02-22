import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";


export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      throw new Error("All field are required");
    }

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const usernameExits = await User.findOne({ username });

    if (usernameExits) {
      return res
        .status(400)
        .json({ message: "This username is taken, try another name" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User({
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }

    return res
      .status(201)
      .json({ user: newUser, message: "User created successfully" });
  } catch (error) {
    console.log("Error in signup controller function", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({ user: user, message: "User logged in successfully" });
  } catch (error) {
    console.log("Error in login controller function", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller function", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUser = async(req,res) => {
  try{
    const {user} = req;
    res.status(200).json({
      user
    });
  } catch (error) {
    console.log("Error in fetching user", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

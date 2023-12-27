import passGen from "../generators/password_gen.js";
import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import jwt from 'jsonwebtoken'
export default class UserController {
  // sign in user and redirect page on the basis of user type and initiate session
  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(404)
          .json({ status: false, message: "Invalid user." });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res
          .status(404)
          .json({ status: false, message: "Invalid password" });
      }
      if (passwordMatch) {
        const token = jwt.sign(
          {
            userId: user._id,
            userEmail: user.email,
            userType: user.account_type,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        // req.session.user = user.email
        // console.log(req.session)
        res.cookie("jwt", token, { httpOnly: true });
        return res.status(200).json({
          success: true,
          message: "Login successful",
          token: token,
        });
      } else {
        return res
          .status(404)
          .json({ status: false, message: "Invalid user." });
      }
    } catch (err) {
      console.log("Error while log in", err);
      return res
        .status(500)
        .json({ status: false, message: "Internal server error." });
    }
  }
  // signup user
  async signUp(req, res) {
    try {
      const password = "12345";
      const encPassword = await passGen.crypt(password);
      if (!encPassword) {
        res
          .status(500)
          .json({ success: false, error: "Unable to create user." });
      }
      const email = req.body.email.trim();
      const user = await User.findOne({ email: email });
      if (user) {
        return res
          .status(400)
          .json({ success: false, message: "Email is already registered" });
      }
      const newUser = await User.create({
        first_name: req.body.fName,
        last_name: req.body.lName,
        email: email,
        password: encPassword,
      });
      const data = {
        firstName: newUser.first_name,
        lastName: newUser.lastName,
        email: newUser.email,
        id: newUser._id,
        createdAt: newUser.createdAt,
      };
      return res.status(200).json({
        success: true,
        data: data,
      });
    } catch (err) {
      console.log("Error while signup the user", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  }
  // logout and clear session
  async postLogout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        return res.status(200).json({ success: true, message: "Logged out." });
      }
    });
    return res.clearCookie("jwt");
  }
}

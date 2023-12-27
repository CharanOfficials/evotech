// To implement admin specific features

import jwt from "jsonwebtoken";
const validateAdmin = (req, res, next) => {
  // 1. Read token
  console.log(req.header.Authorization);
  // If no token then send invalid token
  if (
    !req.headers.authorization &&
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.status(404).json({ status: false, message: "Invalid User" });
  }
  // If token then check validity
  // try {
  //   let token = req.headers.authorization.split(" ")[1];
  //   const payloadjwt = jwt.verify(token, process.env.JWT_SECRET);
  //   if (payloadjwt.userType !== "admin") {
  //     return res.status(401).json({
  //       status: false,
  //       message: "Unauthorized request are not allowed",
  //     });
  //   }
  //   req.userID = payloadjwt.userId;
  //   req.email = payloadjwt.userEmail;
  //   // If valid call next
  //   next();
  // } catch (err) {
  //   // else return error
  //   if (err.name === "TokenExpiredError") {
  //     return res.status(401).json({
  //       status: false,
  //       message: "Unauthorized request are not allowed",
  //     });
  //   }
  //   console.log("JWT middleware:", err);
  //   return res.status(401).json({
  //     status: false,
  //     message: "Unauthorized request are not allowed",
  //   });
  // }
};

export default validateAdmin;

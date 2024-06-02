import { TryCatch } from "./error";
import { User } from "../models/User";
import ErrorHandler from "../utils/utility-class";

//Middleware to make sure only admin is allowed

// export const adminOnly = TryCatch(async (req, res, next) => {
//   const { id } = req.query;
//   if (!id) return next(new ErrorHandler("Please Login", 401));
//   const user = await User.findById(id);
//   if (!user) return next(new ErrorHandler("Invalid id", 401));
//   if (user.role !== "admin")
//     return next(new ErrorHandler("You do not parmission of this", 401));
//   next();
// });

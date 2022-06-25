import { UserModel } from "../models/user.model.js";

export const authAdmin = async (req, res, next) => {
  try {
    //Get User Information by Id
    const user = await UserModel.findOne({ _id: req.userId });

    req.isAdmin = user.isAdmin;

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

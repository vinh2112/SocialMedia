import { PaymentModel } from "../models/payment.model.js";
import { UserModel } from "../models/user.model.js";

export const getPayments = async (req, res) => {
  try {
    const payments = await PaymentModel.find({
      $or: [{ userId: req.userId }, { posterId: req.userId }],
    })
      .populate("postId")
      .populate("userId", "name avatar email")
      .populate("posterId", "name avatar email")
      .lean();

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPayment = async (req, res) => {
  try {
    const { posterId, price, isSuccess, type } = req.body;
    const { postId } = req.params;

    // Create Payment
    const payment = await PaymentModel.findOne({ postId, userId: req.userId });
    if (!payment) {
      const newPayment = new PaymentModel({
        userId: req.userId,
        posterId,
        postId,
        price,
        isSuccess,
      });
      await newPayment.save();
      await PaymentModel.populate(newPayment, [
        {
          path: "userId",
          select: "name email avatar",
        },
        { path: "postId" },
      ]);
      // //

      //Update wallet User
      // type = 1: use photoos wallet, type = 2: use e-wallet

      if (type === 1) {
        await UserModel.findByIdAndUpdate(posterId, { $inc: { wallet: price } });
        await UserModel.findByIdAndUpdate(req.userId, {
          $inc: { wallet: -price },
        });
      } else if (type === 2) {
        await UserModel.findByIdAndUpdate(posterId, { $inc: { wallet: price } });
      }
      //

      return res.status(200).json(true);
    }

    return res.status(200).json(false);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const checkPayment = async (req, res) => {
  try {
    const payment = await PaymentModel.findOne({ userId: req.userId, postId: req.params.postId });
    if (!payment) return res.status(200).json(false);
    res.status(200).json(true);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

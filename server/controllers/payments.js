import { PaymentModel } from "../models/PaymentModel.js";

export const getPayments = async (req, res) => {
  try {
    const payments = await PaymentModel.find({
      $or: [{ userId: req.userId }, { posterId: req.userId }],
    })
      .populate("postId")
      .populate("userId", "name avatar email")
      .populate("posterId", "name avatar email");

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPayment = async (req, res) => {
  try {
    const { posterId, price, isSuccess } = req.body;
    const { postId } = req.params;

    const payment = new PaymentModel({
      userId: req.userId,
      posterId,
      postId,
      price,
      isSuccess,
    });
    await payment.save();
    await PaymentModel.populate(payment, [
      {
        path: "userId",
        select: "name email avatar",
      },
      { path: "postId" },
    ]);

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ msg: error.message });
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

import { PaymentModel } from "../models/PaymentModel.js";

export const createPayment = async (req, res) => {
  try {
    const { postId, price, isSuccess } = req.body;

    const payment = new PaymentModel({
      userId: req.userId,
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
    const payment = await PaymentModel.findOne({ userId: req.uesrId, postId: req.params.postId });
    if (!payment) return res.status(500).json(false);
    res.status(200).json(true);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

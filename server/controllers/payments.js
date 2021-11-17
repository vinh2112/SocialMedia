import { PaymentModel } from "../models/PaymentModel.js";

export const createPayment = async (req, res) => {
  try {
<<<<<<< HEAD
    const {price, isSuccess } = req.body;
    const {postId} = req.params;
=======
    const { price, isSuccess } = req.body;
    const { postId } = req.params;
>>>>>>> 8c254739450e6314e5e521bccdb404871290eead

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
    const payment = await PaymentModel.findOne({ userId: req.userId, postId: req.params.postId });
<<<<<<< HEAD
    if (!payment) return res.status(201).json(false);
=======
    if (!payment) return res.status(500).json(false);
>>>>>>> 8c254739450e6314e5e521bccdb404871290eead
    res.status(200).json(true);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

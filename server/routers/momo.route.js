import express from "express";
import crypto from "crypto";
import https from "https";
import dotenv from "dotenv";
import queryString from "query-string";
import { verifyToken } from "../middlewares/auth.js";
import axios from "axios";

dotenv.config();

const router = express.Router();

router.post("/momo", async (req, res) => {
  const { url, price } = req.body;

  const vndRate = await axios
    .get("https://api.fastforex.io/fetch-multi?from=USD&to=VND&api_key=demo")
    .then((res) => res.data.results.VND);

  var partnerCode = process.env.MOMO_PARTNER_CODE;
  var accessKey = process.env.MOMO_ACCESS_KEY;
  var secretkey = process.env.MOMO_SECRET_KEY;
  var requestId = partnerCode + new Date().getTime();
  var orderId = requestId;
  var orderInfo = "MoMo";
  var redirectUrl = url;
  var ipnUrl = url;
  var amount = Math.ceil(price * vndRate) || Math.ceil(price * 23000);
  var requestType = "captureWallet";
  var extraData = "";

  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;

  var signature = crypto.createHmac("sha256", secretkey).update(rawSignature).digest("hex");

  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: "en",
  });

  const options = {
    hostname: "test-payment.momo.vn",
    port: 443,
    path: "/v2/gateway/api/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
  };

  const request = https.request(options, (response) => {
    response.setEncoding("utf8");
    response.on("data", (body) => {
      res.json(JSON.parse(body).payUrl);
    });
    response.on("end", () => {
      console.log("No more data in response.");
    });
  });

  request.on("error", (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  // write data to request body
  console.log("Sending....");
  request.write(requestBody);
  request.end();
});

router.get("/momo/confirm", async (req, res) => {
  const query = req.query;
  const signature = req.query.signature;

  delete query.signature;
  delete query.partnerUserId;
  query.accessKey = process.env.MOMO_ACCESS_KEY;

  var secretkey = process.env.MOMO_SECRET_KEY;
  var rawSignature = queryString.stringify(query);

  var verifySignature = crypto.createHmac("sha256", secretkey).update(rawSignature).digest("hex");

  if (signature === verifySignature) {
    return res.status(200).json({ isSuccess: true });
  } else {
    return res.status(200).json({ isSuccess: false });
  }
});

export default router;

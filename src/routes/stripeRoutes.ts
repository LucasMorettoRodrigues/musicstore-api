import express from "express"
import { Request, Response } from "express"
const router = express.Router()
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);

router.post("/payment", (req: Request, res: Response) => {
  stripe.charges.create(
    {
      source: req.body?.tokenId,
      amount: req.body?.amount,
      currency: "usd",
    },
    (stripeErr: any, stripeRes: any) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
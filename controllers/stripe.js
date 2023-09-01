// const Order = require("../models/Order");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.Payment = (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).send(stripeErr);
      } else {
        res.status(200).send(stripeRes);
      }
    }
  );
};
// exports.Payment = async (req, res) => {
//   const { userId, products, amount, address } = req.body;

//   try {
//     // Create a new order
//     const order = new Order({
//       userId,
//       products,
//       amount,
//       address,
//       status: "pending",
//     });

//     // Save the order to the database
//     await order.save();

//     // Create a new Stripe Checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: products.map((product) => {
//         return {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: product.title,
//               description: product.desc,
//               images: [product.img],
//             },
//             unit_amount: product.price * 100, // Stripe requires the amount in cents
//           },
//           quantity: product.quantity,
//         };
//       }),
//       mode: "payment",
//       success_url: `${process.env.CLIENT_URL}/success`,
//       cancel_url: `${process.env.CLIENT_URL}/pay`,
//     });

//     res.send({ url: session.url });
//   } catch (error) {
//     console.error("Error creating checkout session:", error);
//     res
//       .status(500)
//       .send({ error: "An error occurred during payment processing." });
//   }
// };

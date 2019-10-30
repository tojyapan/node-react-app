const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
  app.post('/api/stripe', async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "jpy",
      description: "¥500 for 5 credits",
      source: req.body.id
    });

    req.user.credits += 500;
    const user = await req.user.save();

    res.send(user);
  });
};

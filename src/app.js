const express = require("express");
const app = express();
const PORT = 3000;
const Razorpay = require("razorpay");

app.get("/", (req, resp) => {
  resp.sendFile(__dirname + "/src/index.html");
});

app.get("/payment", (req, resp) => {
  const amt = Number(req.query.amt);

  var instance = new Razorpay({
    key_id: "rzp_test_GdY64KeA7Y6Id5",
    key_secret: "FDQGaguHju6NbmwI4VvNJQJu",
  });

  var options = {
    amount: amt * 100,
    currency: "INR",
    receipt: "order_recept",
  };

  instance.orders.create(options, function (err, order) {
    resp.send(order);
  });
});

app.listen(PORT, () => {
  console.log("server running on port : " + PORT);
});

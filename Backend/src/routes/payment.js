
const express=require('express');
const router=express.Router();
const Student = require("../../models/student.js");
const authjwt = require('../middleware/authjwt.js');
const Mentor = require("../../models/mentor.js");

const stripe = require('stripe')(process.env.STRIPE_SECRET);

router.post('/create-checkout-session', authjwt, async (req, res) => {
    console.log('Creating checkout session...');
    const studentId = req.user.id;         
    const mentorId = req.body.mentorId;

    try {
        // Fetch mentor and student from DB
        const mentor = await Mentor.findById(mentorId);
        const student = await Student.findById(studentId);
    
        if (!mentor || !student) {
          return res.status(404).json({ error: 'Mentor or Student not found' });
        }
    
    
        // Create a checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Session with ${mentor.name}`,
                        },
                        unit_amount: 2000, // Amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            //for transfering to mentor accounts
            payment_intent_data: {
                application_fee_amount: 200, // 10% fee (in cents)
                transfer_data: {
                    destination: mentor.accountId, // Mentor's Stripe Connect account ID
        },
    },
            
            success_url: `http://localhost:3000/success`,
            cancel_url: `http://localhost:3000/cancel`,
        });

        res.json({ id: session.id });
    } catch (err) {
        console.error("Payment Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

//add a create stripe account option in mentor profile

router.post("/account", authjwt,  async (req, res) => {
    let mentor = await Mentor.findById(req.user.id); 

    if (!mentor) {
        return res.status(404).json({ error: "Mentor not found" });
    }
  try {
    const account = await stripe.accounts.create({
      controller: {
        stripe_dashboard: {
          type: "express",
        },
        fees: {
          payer: "application"
        },
        losses: {
          payments: "application"
        },
      },
    });

    mentor.accountId = account.id; // Save the Stripe account ID to the mentor's profile
    await mentor.save(); // Save the updated mentor profile
    console.log("Stripe account created:", account.id);
    res.json({
      account: account.id,
    });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to create an account",
      error
    );
    res.status(500);
    res.send({ error: error.message });
  }
});

router.post("/account_link", authjwt , async (req, res) => {
  try {
    let mentor = await Mentor.findById(req.user.id);
    account = mentor.accountId; 

    const accountLink = await stripe.accountLinks.create({
      account: account,
      return_url: `${req.headers.origin}/return/${account}`,
      refresh_url: `${req.headers.origin}/refresh/${account}`,
      type: "account_onboarding",
    });

    res.json(accountLink);
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to create an account link:",
      error
    );
    res.status(500);
    res.send({ error: error.message });
  }
});


module.exports=router;
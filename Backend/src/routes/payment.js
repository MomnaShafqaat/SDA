const express = require('express');
const router = express.Router();
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
            // For transferring to mentor accounts
            /*
            payment_intent_data: {
                application_fee_amount: 200, // 10% fee (in cents)
                transfer_data: {
                    destination: mentor.accountId, // Mentor's Stripe Connect account ID
                },
            },
            */
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });

        res.json({ id: session.id });
    } catch (err) {
        console.error("Payment Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;

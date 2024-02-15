import { Checkout } from 'checkout-sdk-node';

// Documentation: https://www.checkout.com/docs/previous/payments/payment-methods/bank-transfers/giropay
export default async function handler(req, res) {
    if (req.method === 'POST') {

        try {

            // ------------------------------------ Method 1 (START) ------------------------------------

            const body = {
                source: {
                    type: "giropay",
                    purpose: "Black Tee"
                },
                shipping: {
                    address: {
                        city: "Berlin",
                        zip: "10101",
                        country: "DE"
                    }
                },
                amount: 1999,
                currency: "EUR",
                success_url: "http://example.com/payments/success",
                failure_url: "http://example.com/payments/fail"
            }

            const paymentResponse = await fetch('https://api.sandbox.checkout.com/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.SECRET_KEY}`, // Replace YOUR_SECRET_KEY with your actual Checkout.com secret key
                },
                body: JSON.stringify(body),
            });

            const paymentData = await paymentResponse.json();

            // ------------------------------------ Method 1 (END) ------------------------------------


            // ------------------------------------ Method 2 (START) ------------------------------------

            // const cko = new Checkout(process.env.SECRET_KEY); // Use your secret key

            // const paymentData = await cko.payments.request({
            //     source: {
            //         type: "giropay",
            //         purpose: "Black Tee"
            //     },
            //     // shipping: {
            //     //     address: {
            //     //         city: "Berlin",
            //     //         zip: "10101",
            //     //         country: "DE"
            //     //     }
            //     // },
            //     amount: 1999,
            //     currency: "EUR",
            //     success_url: "http://example.com/payments/success",
            //     failure_url: "http://example.com/payments/fail"
            // });

            // ------------------------------------ Method 2 (END) ------------------------------------

            // ALWAYS GETTING:
            // approved: false,
            // status: 'Declined',
            // response_code: '20046',
            // response_summary: 'Bank Decline',
            // Info about error: https://www.checkout.com/docs/developer-resources/codes/api-response-codes
            console.log(paymentData);


            // If the request is successful, redirect the customer to the giropay page
            if (paymentData.status === "Pending" && paymentData._links && paymentData._links.redirect) {
                res.redirect(paymentData._links.redirect.href);
            } else {

                const errorResponse = {
                    error: 'Payment initiation failed',
                    status: paymentData.status,
                    code: paymentData.response_code,
                    summary: paymentData.response_summary,
                };

                // Handle other statuses or errors
                res.status(400).json({ errorResponse });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

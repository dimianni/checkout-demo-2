export default async function handler(req, res) {
    if (req.method === 'POST') {

        try {
            const body = {
                amount: 1000,
                currency: "EUR",
                reference: "ORD-123A",
                billing: {
                    address: {
                        country: "NL"
                    }
                },
                customer: {
                    name: "John Smith",
                    email: "john.smith@example.com"
                },
                "3ds": {
                    enabled: true
                },
                allow_payment_methods: ["card", "ideal"],
                processing_channel_id: process.env.PROCESSING_CHANNEL_ID,
                success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
                failure_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-failure`,
                cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`
            }

            const paymentResponse = await fetch('https://api.sandbox.checkout.com/hosted-payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.SECRET_KEY}`,
                },
                body: JSON.stringify(body),
            });

            const paymentData = await paymentResponse.json();
            console.log(paymentData);

            // Always getting:
            //
            // warnings: [
            //     {
            //         code: 'payment_method_unavailable',
            //         value: 'ideal',
            //         description: 'Payment method ideal is not configured.'
            //     }
            // ]
            //
            // WORKS WITH KEYS PROVIDED IN THE FIRST TEST

            // If the request is successful, redirect the customer to the giropay page
            if (paymentData._links && paymentData._links.redirect) {
                res.status(200).json(paymentData);
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

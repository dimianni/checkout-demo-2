// Documentation: https://www.checkout.com/docs/payments/accept-payments/accept-a-payment-on-your-website-with-payment-components/get-started-with-payment-components

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const body = {
            amount: 1999,
            currency: "EUR",
            reference: "ORD-123A",
            billing: {
                address: {
                    country: "DE",
                },
            },
            customer: {
                name: "John Smith",
                email: "john.smith@example.com",
            },
            success_url: "https://example.com/payments/success",
            failure_url: "https://example.com/payments/failure",
        };

        // const body = {
        //     source: {
        //         type: "giropay",
        //         purpose: "Black Tee" // Adjust the purpose as per your transaction
        //     },
        //     amount: 1999,
        //     currency: "EUR",
        //     success_url: "http://example.com/payments/success", // Adjust with your actual success URL
        //     failure_url: "http://example.com/payments/fail" // Adjust with your actual failure URL
        // };

        // OR https://api.sandbox.checkout.com/payment-sessions
        try {
            const paymentSessionResponse = await fetch('https://api.sandbox.checkout.com/payment-sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.SECRET_KEY}`,
                },
                body: JSON.stringify(body),
            });

            const paymentSessionData = await paymentSessionResponse.json();

            res.status(200).json(paymentSessionData);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create payment session' });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

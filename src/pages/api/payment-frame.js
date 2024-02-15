import { Checkout } from 'checkout-sdk-node';

// Documentation: https://github.com/checkout/frames-react
// Get Started: https://www.checkout.com/docs/get-started
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { token } = req.body; // Get the token from the request body

        const cko = new Checkout(process.env.SECRET_KEY);

        try {
            const paymentResponse = await cko.payments.request({
                source: {
                    type: 'token',
                    token, // The token received from the client-side Frames
                },
                currency: 'EUR',
                amount: 1999,
            });

            // Send the payment response back to the client
            res.status(200).json(paymentResponse);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        // Handle any requests other than POST
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

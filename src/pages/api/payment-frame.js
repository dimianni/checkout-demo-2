import { Checkout } from 'checkout-sdk-node';

// Documentation: https://github.com/checkout/frames-react
// Get Started: https://www.checkout.com/docs/get-started
export default async function handler(req, res) {
    if (req.method === 'POST') {

        const { token, preferred_scheme } = req.body; // Get the token from the request body

        const cko = new Checkout(process.env.SECRET_KEY);

        try {

            let paymentRequest = {
                source: {
                    type: 'token',
                    token, // The token received from the client-side Frames
                },
                processing_channel_id: process.env.PROCESSING_CHANNEL_ID,
                "3ds": { // Enclose 3ds in quotes
                    enabled: true
                },
                currency: 'EUR',
                amount: 1999,
                success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
                failure_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-failure`
            }

            // Conditionally add the processing field if preferred_scheme exists and is not empty
            if (preferred_scheme && preferred_scheme.trim() !== '') {
                paymentRequest.processing = {
                    preferred_scheme
                };
            }

            const paymentResponse = await cko.payments.request(paymentRequest);

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

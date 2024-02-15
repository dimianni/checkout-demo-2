import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { loadCheckoutWebComponents } from '@checkout.com/checkout-web-components';

// Documentation: https://www.checkout.com/docs/payments/accept-payments/accept-a-payment-on-your-website-with-payment-components/get-started-with-payment-components
// The payment methods enabled for the payment session are determined by:
    // the customer's device
    // the values you provide for specific fields in your request
    // the payment methods that have been activated for your account

export default function PaymentPage() {
    const router = useRouter();

    const [payments, setPayments] = useState(null);

    useEffect(() => {
        async function initializePayment() {
            const orderResponse = await fetch('/api/payment-session', { method: 'POST' });
            const paymentSession = await orderResponse.json();

            // Usage: README file https://www.npmjs.com/package/checkout-web-components?activeTab=code
            const cko = await loadCheckoutWebComponents({
                publicKey: 'pk_sbox_kuzru7zyphwbnsi7nrzxy7wfmef',
                environment: 'sandbox',
                locale: 'de-DE',
                paymentSession,
                onPaymentCompleted: (component, paymentResponse) => {
                    // Handle payment success
                    router.push('/success');
                },
                onError: (component, error) => {
                    // Handle payment error
                    console.error('Payment error:', error);
                },
            });

            // Create and mount the payments component
            const payments = cko.create('payments');
            setPayments(payments);
            payments.mount('#payments');
        }

        initializePayment();

        // Cleanup function to unmount the payments component
        return () => {
            if (payments) {
                payments.unmount(); // Call the unmount method to clean up
            }
        };
    }, [router, payments]);

    return (
        <div>
            <form id="payment-form">
                <div className="payments-container">
                    <div id="payments"></div> {/* This element will host the payment UI */}
                </div>
            </form>
        </div>
    );
}

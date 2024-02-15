import toast, { Toaster } from 'react-hot-toast'

// Documentation: https://www.checkout.com/docs/previous/payments/payment-methods/bank-transfers/giropay
const GiropayPayment = () => {
    const initiatePayment = async () => {
        try {
            // Send a POST request to your server-side endpoint to initiate the payment
            const response = await fetch('/api/payment-giropay', {
                method: 'POST'
            });

            console.log(response);

            if (!response.ok) {
                const errorData = await response.json(); // Parse the error response
                throw new Error(`Payment initiation failed with status ${errorData.errorResponse.status}. Response code: ${errorData.errorResponse.code}. ${errorData.errorResponse.summary}.`); // Use the error summary from your errorResponse
            }

            // If the response is successful, your server should handle the redirection
            // The server might send back a redirect URL, or directly perform the redirect
            const data = await response.json();

            // Optionally handle the response data, such as redirect URLs
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
            }
        } catch (error) {
            console.error(error);
            // alert(`${error.message}`); // Comes from throw new Error
            toast.error(`${error.message}`, { duration: 8000 })
        }
    };

    return (
        <>
            <button className="border-none rounded px-4 py-2 text-white font-medium w-full bg-[#525284] shadow-[0_1px_3px_0_rgba(19,57,94,0.4)] hover:bg-[#1c204e] active:bg-[#0b2a49] cursor-pointer" onClick={initiatePayment}>GIROPAY</button>
            <Toaster position="bottom-center" />
        </>
    );
};

export default GiropayPayment;

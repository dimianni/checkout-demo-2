import toast, { Toaster } from 'react-hot-toast'

const HostedPage = () => {
    const initiatePayment = async () => {
        try {
            // Send a POST request to your server-side endpoint to initiate the payment
            const response = await fetch('/api/payment-hosted', {
                method: 'POST'
            });

            console.log(response);

            if (!response.ok) {
                const errorData = await response.json(); // Parse the error response
                throw new Error(`Payment initiation failed with status ${errorData.errorResponse.status}. Response code: ${errorData.errorResponse.code}. ${errorData.errorResponse.summary}.`); // Use the error summary from your errorResponse
            }

            // If the response is successful, your server should handle the redirection
            const paymentResult = await response.json();
            console.log(paymentResult);
            if (paymentResult._links && paymentResult._links.redirect) {
                window.location.href = paymentResult._links.redirect.href;
            } else {
                // Handle other outcomes (e.g., direct success, error messages)
            }
        } catch (error) {
            console.error(error);
            // alert(`${error.message}`); // Comes from throw new Error
            toast.error(`${error.message}`, { duration: 8000 })
        }
    };

    return (
        <>
            <button className="border-none rounded px-4 py-2 text-white font-medium w-full bg-[#525284] shadow-[0_1px_3px_0_rgba(19,57,94,0.4)] hover:bg-[#1c204e] active:bg-[#0b2a49] cursor-pointer" onClick={initiatePayment}>HOSTED PAYMENT PAGE</button>
            <Toaster position="bottom-center" />
        </>
    );
};

export default HostedPage;

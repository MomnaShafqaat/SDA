
import axiosInstance from "../hooks/axiosInstance";
import {loadStripe } from '@stripe/stripe-js';

const PayButton = ({mentorId , accountId}) => {

  const handlePayment = async () => {
    try {
         const stripe = await loadStripe('pk_test_51QuUDjIENBzZHlrqzEmxvoNAtzO3p9i6fQVgql68l1hUiFZgLer0wwyNEXIGn94ezKGkV9BcgjUwHgzdeVuvcXcO00raRrxXqI'); 
                
      const response = await axiosInstance.post("payment/create-checkout-session", {
        mentorId: mentorId
      });

      result = await stripe.redirectToCheckout({
            sessionId: response.data.id,
        }); 
        if (result.error) {
            console.error('Error redirecting to checkout:', result.error.message);
        } else {
            console.log('Redirecting to checkout...');
        }
      
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  if (!accountId) return null;

  return (
    <button onClick={handlePayment} className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors">
      Pay for priority DM
    </button>
  );
}

export default PayButton;
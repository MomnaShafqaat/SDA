import axios from 'axios';
import GenericService from './genericService';
import {loadStripe } from '@stripe/stripe-js';


class PaymentService extends GenericService {
    constructor() {
        super();
        this.baseUrl = 'http://localhost:5000/api/payment/';
    }

    makePayment = async (mentorId) => {
        console.log('Making payment for mentor with ID:', mentorId);
        const stripe = await loadStripe('pk_test_51QuUDjIENBzZHlrqzEmxvoNAtzO3p9i6fQVgql68l1hUiFZgLer0wwyNEXIGn94ezKGkV9BcgjUwHgzdeVuvcXcO00raRrxXqI'); 
        let token = localStorage.getItem('jwt_token');
        console.log("Token being sent:", token);
        console.log('sending payment req' + mentorId) ;
        const response = await this.post(`${this.baseUrl}create-checkout-session`, { mentorId }, {
             headers:{
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        //response.data;    
       result = await stripe.redirectToCheckout({
            sessionId: response.data.id,
        }); 
        if (result.error) {
            console.error('Error redirecting to checkout:', result.error.message);
        } else {
            console.log('Redirecting to checkout...');
        }
        
    }

    checkAccount = async () => {
        try{
        let token = localStorage.getItem('jwt_token');
        const response = await  this.post(`${this.baseUrl}account_link`, {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                },
        }) ;
        const { url, error } = response.data;

    if (url) {
      window.location.href = url;
    }

    if (error) {
      setError(true);
    }
  } catch (err) {
    console.error('Error generating account link:', err);
    setError(true);
  }
        
    }
    
}

let paymentService = new PaymentService();
export default paymentService;

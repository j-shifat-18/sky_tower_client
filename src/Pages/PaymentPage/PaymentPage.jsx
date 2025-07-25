import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const location = useLocation();
  console.log(location.state)
//   const { data: paymentData } = location.state; 
//   console.log(paymentData)

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm paymentData={location.state} />
    </Elements>
  );
};

export default PaymentPage;
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const CheckoutForm = ({ paymentData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();

  const price = paymentData.rent;

  useEffect(() => {
    if (paymentData?.rent) {
      axiosSecure
        .post("/create-payment-intent", { rent: price })
        .then((res) => setClientSecret(res.data.clientSecret));
    }
  }, [price, paymentData, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (methodError) {
      console.error("Payment method creation failed:", methodError.message);
      alert(methodError.message);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmError) {
      console.error("Payment confirmation failed:", confirmError.message);
      alert(confirmError.message);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      const paymentRecord = {
        email: paymentData.email,
        rent: paymentData.rent,
        floor: paymentData.floor,
        block: paymentData.block,
        apartmentNo: paymentData.apartmentNo,
        month: paymentData.month,
        transactionId: paymentIntent.id,
        createdAt: new Date().toISOString(),
      };

      try {
        await axiosSecure.post("/payments", paymentRecord);
        Swal.fire({
                icon: 'success',
                title: 'Payment Successfull!',
                showConfirmButton: false,
                timer: 1500
              });
      } catch (err) {
        console.error("Failed to record payment:", err);
        alert("Payment succeeded but saving data failed.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-100 rounded-xl shadow-lg border border-base-200">
      <h2 className="text-3xl font-semibold text-center mb-6 text-primary">
        Complete Your Payment
      </h2>

      <div className="bg-base-200 p-4 rounded-lg mb-6 space-y-1 text-sm">
        <p><span className="font-semibold">Apartment:</span> {paymentData.apartmentNo}</p>
        <p><span className="font-semibold">Block:</span> {paymentData.block}</p>
        <p><span className="font-semibold">Floor:</span> {paymentData.floor}</p>
        <p><span className="font-semibold">Month:</span> {paymentData.month}</p>
        <p><span className="font-semibold">Rent:</span> ${price}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-4 bg-base-200 rounded-lg border border-base-300">
          <CardElement
            className="bg-base-100 p-3 rounded-md"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#333',
                  '::placeholder': {
                    color: '#a3a3a3',
                  },
                },
                invalid: {
                  color: '#e53e3e',
                },
              },
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!stripe || !clientSecret}
          className="btn btn-primary w-full uppercase tracking-wide"
        >
          Pay ${price?.toFixed(2)}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;

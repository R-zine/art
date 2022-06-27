import React from "react";
import { Typography, Button } from "@material-ui/core";
import {
  CardElement,
  ElementsConsumer,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Review from "./Review";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({
  token,
  nextStep,
  backStep,
  shippingData,
  onCaptureCheckout,
}) => {
  console.log(token);
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: token.live.line_items,
        customer: {
          firstName: shippingData.firstName,
          lastName: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: shippingData.shippingOption,
          street: shippingData.address1,
          city: shippingData.city,
          state: shippingData.shippingSubdivision,
          zip: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: {
          shippingMethod: shippingData.shippingOption,
        },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      onCaptureCheckout(token.id, orderData);
      nextStep();
    }
  };

  return (
    <>
      <Review token={token} />
      <div className="payment--form">
        <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
          Payment method
        </Typography>
        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ elements, stripe }) => (
              <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                <CardElement />

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button variant="outlined" onClick={backStep}>
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!stripe}
                    color="primary"
                  >
                    Pay {token.live.subtotal.formatted_with_symbol}
                  </Button>
                </div>
              </form>
            )}
          </ElementsConsumer>
        </Elements>
      </div>
    </>
  );
};

export default PaymentForm;

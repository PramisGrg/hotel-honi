import { useGetPayment } from "@/queries/payment/get-payment";

const PaymentMethod = () => {
  const { data: payment } = useGetPayment();
  console.log(payment, "This is payment");
  const paymentData = payment?.data || [];
  return (
    <div>
      <h1>This is payment method</h1>
      {paymentData.map((payment) => (
        <div>{payment.name}</div>
      ))}
    </div>
  );
};

export default PaymentMethod;

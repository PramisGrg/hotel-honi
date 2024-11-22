interface CalculatePriceType {
  discountType?: string;
  discount?: number;
  serviceChargeType?: string;
  serviceCharge?: number;
  totalAmount?: number;
  tax?: number;
}

export const calculatePrice = ({
  discountType = "PERCENTAGE",
  discount = 0,
  serviceChargeType = "PERCENTAGE",
  serviceCharge = 0,
  totalAmount = 0,
  tax = 13,
}: CalculatePriceType) => {
  let totalAmountAfterDiscount = 0;
  let discountAmount = 0;
  let serviceChargeAmount = 0;

  if (discountType === "PERCENTAGE") {
    discountAmount = totalAmount * (Number(discount) / 100);
    totalAmountAfterDiscount = totalAmount - discountAmount;
  } else {
    discountAmount = Number(discount);
    totalAmountAfterDiscount = totalAmount - discountAmount;
  }
  if (serviceChargeType === "PERCENTAGE") {
    serviceChargeAmount =
      totalAmountAfterDiscount * (Number(serviceCharge) / 100);
  } else {
    serviceChargeAmount = Number(serviceCharge);
  }
  const taxAmount = totalAmountAfterDiscount * (Number(tax) / 100);
  return totalAmountAfterDiscount + serviceChargeAmount + taxAmount;
};

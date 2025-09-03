import { twMerge } from "tailwind-merge";

interface Props {
  amount: number | undefined;
  className?: string;
}

const PriceFormatter = ({ amount, className }: Props) => {
  const formattedPrice =
    amount !== undefined
      ? amount.toLocaleString("fr-MA", {
          style: "currency",
          currency: "MAD",
          minimumFractionDigits: 0,
        })
      : "—"; // fallback if amount is undefined

  return (
    <span
      className={twMerge("text-sm font-semibold text-darkColor", className)}
    >
      {formattedPrice}
    </span>
  );
};

export default PriceFormatter;

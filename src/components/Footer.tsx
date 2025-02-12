import { Button } from "./ui/button";
import { CartItem } from "@/types/types";
import { useTranslation } from "react-i18next";

interface FooterProps {
    cart: CartItem[];
    onCheckout: () => void;
}

/**
 * Footer Component
 * 
 * Displays a sticky footer with:
 * - The total number of tickets in the cart
 * - The total price of all tickets
 * - A "Checkout now" button (disabled if the cart is empty)
 * 
 */

export const Footer = ({ cart, onCheckout }: FooterProps) => {
    const { t } = useTranslation();

    return (
        <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex justify-center">
            {/* inner content */}
            <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
                {/* total in cart state */}
                <div className="flex flex-col text-zinc-400">
                    <span>
                        {t("Total for")} {t("ticket", { count: cart.length })}
                    </span>
                    <span className="text-2xl font-semibold">
                        {cart.reduce((total, item) => total + (item.price || 0), 0)} {t("CZK")}
                    </span>
                </div>

                {/* checkout button */}
                <Button
                    disabled={cart.length === 0}
                    variant="default"
                    onClick={onCheckout} // Open modal
                >
                    {t("Checkout now")}
                </Button>
            </div>
        </nav>
    );
};

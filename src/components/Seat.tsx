import { Button } from "@/components/ui/button.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { cn } from "@/lib/utils.ts";
import React from "react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useTranslation } from "react-i18next";

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
    "data-number"?: number; // Seat number
    "data-information"?: string; // Additional seat info (e.g., "Nedostupné")
    "data-ticket-type"?: string; // Ticket type ID
    "data-price"?: number; // Ticket price
    "data-row"?: number; // Seat row
    "data-seat-id"?: string; // Unique seat ID
    "data-ticket-name"?: string; // Ticket type (e.g., "VIP ticket")
}

/**
 * Seat Component
 *
 * Represents an interactive seat in a seating chart.
 *
 * - **Green:** The seat is in the cart.
 * - **Gray:** The seat is unavailable.
 * - **Amber:** VIP seat.
 * - **Blue:** Regular seat.
 *
 * Users can click to add or remove the seat from their cart.
 *
 */

export const Seat = React.forwardRef<HTMLDivElement, SeatProps>((props, ref) => {
    const {
        "data-number": seatNumber,
        "data-information": seatInfo,
        "data-ticket-type": ticketTypeId,
        "data-price": price,
        "data-row": row,
        "data-seat-id": seatId,
        "data-ticket-name": name,
    } = props;

    const isUnavailable = seatInfo === "Nedostupné";
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const { addToCart, removeFromCart, isInCart } = useCart();
    const inCart = isInCart(seatId || "");
    const { t } = useTranslation();

    const handleClick = () => {
        if (inCart) {
            removeFromCart(seatId || "");
        } else {
            addToCart({
                seatId: seatId || "",
                row: row || 0,
                place: seatNumber || 0,
                ticketTypeId,
                price,
            });
        }
    };

    /**
     * Determines the seat's color based on its availability and type.
     */

    const seatClass = isUnavailable
        ? "bg-gray-400 opacity-60"
        : inCart
        ? "bg-green-600" // Green for seats in the cart
        : name === "VIP ticket"
        ? "bg-amber-400 hover:bg-amber-500"
        : "bg-blue-500 hover:bg-blue-600";

    return (
        <div>
            {isUnavailable ? (
                // Non-interactive placeholder seat
                <div
                    className={cn(
                        "size-8 rounded-full bg-gray-700 opacity-50 flex items-center justify-center",
                        props.className
                    )}
                    ref={ref}
                >
                    <span className="text-white font-bold">&#10007;</span> 
                    </div>
            ) : (
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger
                        onMouseEnter={() => setIsPopoverOpen(true)}
                        onMouseLeave={() => setIsPopoverOpen(false)}
                    >
                        <div
                            className={cn(
                                "size-8 rounded-full transition-color flex items-center justify-center cursor-pointer",
                                seatClass,
                                props.className
                            )}
                            ref={ref}
                            onClick={handleClick}
                        >
                            {inCart ? (
                                // if the seat is in a cart then show green checkmark
                                <span className="text-white font-bold">&#10003;</span>
                            ) : (
                                // otherwise show seatNnumber
                                <span className="text-xs font-medium">{seatNumber}</span>
                            )}
                        </div>
                    </PopoverTrigger>
                    <PopoverContent
                        onMouseEnter={() => setIsPopoverOpen(true)}
                        onMouseLeave={() => setIsPopoverOpen(false)}
                    >
                        <div className="p-2 text-sm">
                            <p>
                                <strong>{t("Row")}:</strong> {row}
                            </p>
                            <p>
                                <strong>{t("Seat")}:</strong> {seatNumber}
                            </p>
                            {ticketTypeId && (
                                <p>
                                    <strong>{t("Type of the ticket")}:</strong> {name == "Regular ticket" ? t("Regular ticket") : t("VIP ticket")}
                                </p>
                            )}
                            {price !== undefined && (
                                <p>
                                    <strong>{t("Price")}:</strong> {price} CZK
                                </p>
                            )}
                        </div>
                        <footer className="flex flex-col">
                            <Button onClick={handleClick} variant={inCart ? "destructive" : "default"} size="sm">
                                {inCart ? t("Remove from cart") : t("Add to cart")}
                            </Button>
                        </footer>
                    </PopoverContent>
                </Popover>
            )}
        </div>
    );
});

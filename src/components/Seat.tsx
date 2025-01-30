import { Button } from "@/components/ui/button.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { cn } from "@/lib/utils.ts";
import React from "react";
import { useCart } from "@/components/context/CartContext";
import { useState } from "react";

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
    "data-number"?: number; // Seat number
    "data-information"?: string; // Additional seat info (e.g., "Nedostupné")
    "data-ticket-type"?: string; // Ticket type ID
    "data-price"?: number; // Ticket price
    "data-row"?: number; // Seat row
    "data-seat-id"?: string; // Unique seat ID
    "data-ticket-name"?: string; // Ticket type (e.g., "VIP ticket")
}

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
    const seatClass = isUnavailable
        ? "bg-gray-400 opacity-60"
        : inCart
        ? "bg-blue-600 text-white"
        : name === "VIP ticket"
        ? "bg-yellow-500"
        : "bg-green-600";

    return (
        <div>
            {isUnavailable ? (
                // Non-interactive placeholder seat
                <div
                    className={cn(
                        "size-8 rounded-full bg-gray-300 opacity-50 flex items-center justify-center",
                        props.className
                    )}
                    ref={ref}
                />
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
                            <span className="text-xs font-medium">{seatNumber}</span>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent
                        onMouseEnter={() => setIsPopoverOpen(true)}
                        onMouseLeave={() => setIsPopoverOpen(false)}
                    >
                        <div className="p-2 text-sm">
                            <p>
                                <strong>Řada:</strong> {row}
                            </p>
                            <p>
                                <strong>Sedadlo:</strong> {seatNumber}
                            </p>
                            {ticketTypeId && (
                                <p>
                                    <strong>Typ:</strong> {name}
                                </p>
                            )}
                            {price !== undefined && (
                                <p>
                                    <strong>Cena:</strong> {price} CZK
                                </p>
                            )}
                        </div>
                        <footer className="flex flex-col">
                            <Button onClick={handleClick} variant={inCart ? "destructive" : "default"} size="sm">
                                {inCart ? "Remove from cart" : "Add to cart"}
                            </Button>
                        </footer>
                    </PopoverContent>
                </Popover>
            )}
        </div>
    );
});

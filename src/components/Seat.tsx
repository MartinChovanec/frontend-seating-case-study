import { Button } from "@/components/ui/button.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { cn } from "@/lib/utils.ts";
import React from "react";
import { useCart } from "@/components/context/CartContext";

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
    "data-number"?: number; // Seat number
    "data-information"?: string; // Additional seat info (e.g., "Nedostupné")
    "data-ticket-type"?: string; // Ticket type (e.g., "VIP ticket")
    "data-price"?: number; // Ticket price
    "data-row"?: number; // Seat row
    "data-seat-id"?: string; // Unique seat ID
}

export const Seat = React.forwardRef<HTMLDivElement, SeatProps>((props, ref) => {
    const {
        "data-number": seatNumber,
        "data-information": seatInfo,
        "data-ticket-type": ticketType,
        "data-price": price,
        "data-row": row,
        "data-seat-id": seatId,
    } = props;

    const isUnavailable = seatInfo === "Nedostupné";

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
                ticketType,
                price,
            });
        }
    };

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
                <Popover>
                    <PopoverTrigger>
                        <div
                            className={cn(
                                "size-8 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-color flex items-center justify-center",
                                inCart ? "bg-blue-300" : "",
                                props.className
                            )}
                            ref={ref}
                        >
                            <span className="text-xs text-zinc-600 font-medium">{seatNumber}</span>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="p-2 text-sm">
                            <p>
                                <strong>Row:</strong> {row}
                            </p>
                            <p>
                                <strong>Seat:</strong> {seatNumber}
                            </p>
                            {ticketType && (
                                <p>
                                    <strong>Type:</strong> {ticketType}
                                </p>
                            )}
                            {price !== undefined && (
                                <p>
                                    <strong>Price:</strong> {price} CZK
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

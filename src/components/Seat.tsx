import { Button } from "@/components/ui/button.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { cn } from "@/lib/utils.ts";
import React from "react";

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
    "data-number"?: number; // Prop for seat number
    "data-information"?: string; // Additional seat info (e.g., "Nedostupné")
    "data-ticket-type"?: string; // Ticket type (e.g., "VIP ticket")
    "data-price"?: number; // Ticket price
}

export const Seat = React.forwardRef<HTMLDivElement, SeatProps>((props, ref) => {
    const isInCart = false;
    const seatNumber = props["data-number"] || 0; // Get seat number
    const isUnavailable = props["data-information"] === "Nedostupné"; // Check if seat is unavailable

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
                                "size-8 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-color",
                                props.className
                            )}
                            ref={ref}
                        >
                            <span className="text-xs text-zinc-600 font-medium">
                                {seatNumber} {/* Display seat number */}
                            </span>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="p-2 text-sm">
                            {/* Display seat information */}
                            <p>
                                <strong>Seat:</strong> {seatNumber}
                            </p>
                            {props["data-ticket-type"] && (
                                <p>
                                    <strong>Type:</strong> {props["data-ticket-type"]}
                                </p>
                            )}
                            {props["data-price"] !== undefined && (
                                <p>
                                    <strong>Price:</strong> {props["data-price"]} CZK
                                </p>
                            )}
                            {props["data-information"] && (
                                <p>
                                    <strong>Info:</strong> {props["data-information"]}
                                </p>
                            )}
                        </div>

                        <footer className="flex flex-col">
                            {isInCart ? (
                                <Button disabled variant="destructive" size="sm">
                                    Remove from cart
                                </Button>
                            ) : (
                                <Button disabled variant="default" size="sm">
                                    Add to cart
                                </Button>
                            )}
                        </footer>
                    </PopoverContent>
                </Popover>
            )}
        </div>
    );
});

// SeatingCard.tsx
import React from "react";
import { Seat } from "@/components/Seat";
import { SeatData } from "@/types/types";

interface SeatingCardProps {
    seatsLoading: boolean;
    seatsError: string | null;
    seats: SeatData | null;
}

export const SeatingMap: React.FC<SeatingCardProps> = ({ seatsLoading, seatsError, seats }) => {
    return (
        <div className="bg-white rounded-md w-full xl:max-w-[calc(100%-340px)] p-3 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-zinc-900">Vyberte si sedadla</h2>
            {seatsLoading && <p>Loading seats...</p>}
            {seatsError && <p className="text-red-500">{seatsError}</p>}
            {!seatsLoading &&
                seats &&
                seats.seatRows.map((row) => (
                    <div key={row.seatRow} className="mb-4 last:mb-0">
                        <h3 className="text-left text-xs font-medium text-zinc-600 mb-2">Row {row.seatRow}</h3>
                        <div className="flex gap-2 overflow-x-auto">
                            {row.seats.map((seat) => {
                                const ticketType = seats.ticketTypes.find((type) => type.id === seat.ticketTypeId);
                                return (
                                    <Seat
                                        key={seat.seatId}
                                        data-number={seat.information !== "Nedostupné" ? seat.place : undefined}
                                        data-information={seat.information}
                                        data-ticket-type={ticketType?.id}
                                        data-ticket-name={ticketType?.name}
                                        data-price={ticketType?.price}
                                        data-row={row.seatRow}
                                        data-seat-id={seat.seatId}
                                    />
                                );
                            })}
                        </div>
                    </div>
                ))}
        </div>
    );
};

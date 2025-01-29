import { useEffect, useState } from "react";

interface TicketType {
    id: string;
    name: string;
    price: number;
}

interface Seat {
    seatId: string;
    place: number;
    ticketTypeId?: string; // Optional for placeholder seats
    information?: string; // Optional field for placeholder seats
}

interface SeatRow {
    seatRow: number;
    seats: Seat[];
}

interface SeatData {
    ticketTypes: TicketType[];
    seatRows: SeatRow[];
}

export const getSeats = (eventId: string) => {
    const [seats, setSeats] = useState<SeatData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const response = await fetch(
                    `https://nfctron-frontend-seating-case-study-2024.vercel.app/event-tickets?eventId=${eventId}`
                );
                if (!response.ok) {
                    throw new Error(`Failed to load seats: ${response.statusText}`);
                }
                const data: SeatData = await response.json();
                console.log(data, "sedadla začátek");

                // Find the highest place number across all rows
                const maxPlace = Math.max(...data.seatRows.flatMap((row) => row.seats.map((seat) => seat.place)));

                // Fill missing places in each row
                const filledSeatRows = data.seatRows.map((row) => {
                    const existingPlaces = new Set(row.seats.map((seat) => seat.place));

                    // Generate missing seats
                    const missingSeats = Array.from({ length: maxPlace }, (_, i) => i + 1)
                        .filter((place) => !existingPlaces.has(place))
                        .map((place) => ({
                            seatId: `placeholder-${row.seatRow}-${place}`,
                            place,
                            information: "Nedostupné",
                        }));

                    return {
                        ...row,
                        seats: [...row.seats, ...missingSeats].sort((a, b) => a.place - b.place), // Sort seats by place
                    };
                });

                setSeats({ ...data, seatRows: filledSeatRows });
                console.log(seats, "sedadla final");
            } catch (err: any) {
                setError(err.message || "Failed to load seats.");
            } finally {
                setLoading(false);
            }
        };

        if (eventId) {
            fetchSeats();
        }
    }, [eventId]);

    return { seats, loading, error };
};

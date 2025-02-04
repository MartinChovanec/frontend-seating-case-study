import { useEffect, useState } from "react";
import { SeatData } from "@/types/types";

// Gets ticket Data. Use API (method:GET) https://nfctron-frontend-seating-case-study-2024.vercel.app/event-tickets?eventId=<uuid>
// Because api returns different numbers of seats in rows.
// For better clarity we enrich the output with seats (these seats cannot be added to the basket) that api did not return. 
// This means. We ensure that each row displays the same number of seats.

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

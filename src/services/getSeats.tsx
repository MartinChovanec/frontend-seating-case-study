import { useEffect, useState } from "react";
import { SeatData } from "@/types/types";

/**
 * Fetches seat data for a given event and enriches the output to ensure each row displays the same number of seats.
 * The API may return an inconsistent number of seats per row, so missing seats are added as placeholders
 * (these seats cannot be added to the basket).
 *
 * Uses API: `GET https://nfctron-frontend-seating-case-study-2024.vercel.app/event-tickets?eventId=<uuid>`
 *
 * @param {string} eventId - The unique ID of the event to fetch seat data for.
 * @returns {object} An object containing:
 * - `seats` (SeatData | null): The enriched seat data if available.
 * - `loading` (boolean): `true` while fetching data, `false` once loaded.
 * - `error` (string | null): Error message if fetching fails.
 *
 * @example
 * const { seats, loading, error } = getSeats("event-123");
 */

export const getSeats = (eventId: string) => {
    const [seats, setSeats] = useState<SeatData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        /**
         * Fetches seat data from the API, processes it to fill missing seats, and updates the state.
         */
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

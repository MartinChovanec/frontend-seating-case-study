import { useEffect, useState } from "react";

interface TicketType {
  id: string;
  name: string;
  price: number;
}

interface Seat {
  seatId: string;
  place: number;
  ticketTypeId: string;
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
        console.log(data, "puvodni data")

        // Sort seatRows by seatRow and seats by place
        const sortedData: SeatData = {
          ...data,
          seatRows: data.seatRows
            .sort((a, b) => a.seatRow - b.seatRow) // Sort rows
            .map((row) => ({
              ...row,
              seats: row.seats.sort((a, b) => a.place - b.place), // Sort seats within each row
            })),
        };

        setSeats(sortedData);
        console.log(sortedData, "sortedData")
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

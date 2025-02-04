import { useEffect, useState } from "react";

interface EventData {
  eventId: string;
  namePub: string;
  description: string;
  currencyIso: string;
  dateFrom: string;
  dateTo: string;
  headerImageUrl: string;
  place: string;
}

/**
 * Fetches event data from the API and provides state management for loading and errors.
 * Uses the API: `GET https://nfctron-frontend-seating-case-study-2024.vercel.app/event`
 *
 * @returns {object} An object containing:
 * - `event` (EventData | null): Event data if available.
 * - `loading` (boolean): `true` while fetching data, `false` once loaded.
 * - `error` (string | null): Error message if fetching fails.
 *
 * @example
 * const { event, loading, error } = getEvent();
 */

export const getEvent = () => {
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Fetches event data from the API and updates the state.
     * Handles errors and loading states.
     */
    const fetchEvent = async () => {
      try {
                const response = await fetch("https://nfctron-frontend-seating-case-study-2024.vercel.app/event");
        if (!response.ok) {
          throw new Error(`Nedošlo k načtení dat. Kontaktujte prosím podporu.: ${response.statusText}`);
        }
        const data = await response.json();
        setEvent(data);
      } catch (err: any) {
        setError(err.message || "Nedošlo k načtení dat. Kontaktujte prosím podporu.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, []);

  return { event, loading, error };
};

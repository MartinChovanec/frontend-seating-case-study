import { Button } from "@/components/ui/button";
import { EventData } from "@/types/types";

interface EventInfoProps {
    event: EventData | null;
    loading: boolean;
    error: string | null;
}

const generateICSFile = (event: EventData) => {
    if (!event) return "";

    const formatDateToICS = (dateString: string) => {
        return new Date(dateString).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const startDate = formatDateToICS(event.dateFrom);
    const endDate = formatDateToICS(event.dateTo);

    const uid = `${event.eventId}@nfctron.com`;

    // Escapeování speciálních znaků
    const escapeICS = (text: string) =>
        text
            .replace(/(\r\n|\r|\n)/g, "\\n")
            .replace(/,/g, "\\,")
            .replace(/;/g, "\\;");

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//NFCtron//Event Calendar//EN
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${startDate}
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${escapeICS(event.namePub)}
DESCRIPTION:${escapeICS(event.description)}
LOCATION:${escapeICS(event.place)}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar" });
    return URL.createObjectURL(blob);
};

/**
 * EventInfoPanel Component
 *
 * Displays key information about an event, including:
 * - Event image, name, description, place, and date range
 * - Loading and error states
 * - A disabled "Add to calendar" button (can be extended in the future)
 */
export const EventInfoPanel = ({ event, loading, error }: EventInfoProps) => {
    return (
        <aside className="w-full xl:w-80 bg-white rounded-md shadow-sm p-3 flex flex-col gap-2 mb-4 xl:mb-0">
            {loading && <p>Loading event details...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {event && (
                <>
                    <img
                        src={event.headerImageUrl}
                        alt={event.namePub}
                        className="rounded-md h-32 object-cover custom-object-position"
                    />
                    <h1 className="text-xl text-zinc-900 font-semibold">{event.namePub}</h1>
                    <p className="text-sm text-zinc-500">{event.description}</p>
                    <p className="text-sm text-zinc-400">
                        <strong>Place:</strong> {event.place}
                    </p>
                    <p className="text-sm text-zinc-400">
                        <strong>Start:</strong> {new Date(event.dateFrom).toLocaleString()}
                    </p>
                    <p className="text-sm text-zinc-400">
                        <strong>End:</strong> {new Date(event.dateTo).toLocaleString()}
                    </p>
                    <a href={generateICSFile(event)} download={`${event.namePub.replace(/\s+/g, "_")}.ics`}>
                        <Button variant="secondary">Add to calendar</Button>
                    </a>
                </>
            )}
        </aside>
    );
};

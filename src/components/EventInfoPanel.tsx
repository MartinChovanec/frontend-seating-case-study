import { Button } from "@/components/ui/button";
import { EventData } from "@/types/types";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";


interface EventInfoProps {
    event: EventData | null;
    loading: boolean;
    error: string | null;
}

/**
 * Formats a date string to the iCalendar (ICS) format.
 * @param dateString - The date string to be formatted.
 * @returns A formatted date string in ICS format.
 */
const formatDateToICS = (dateString: string) => {
    return new Date(dateString).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
};

/**
 * Generates an ICS (iCalendar) file for an event.
 * @param event - The event data to be converted into an ICS file.
 * @returns A downloadable ICS file URL.
 */
const generateICSFile = (event: EventData) => {
    if (!event) return "";

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
 * Generates a Google Calendar event URL.
 * @param event - The event data to be converted into a Google Calendar link.
 * @returns A Google Calendar URL.
 */
const generateGoogleCalendarUrl = (event: EventData) => {
    const startDate = formatDateToICS(event.dateFrom);
    const endDate = formatDateToICS(event.dateTo);

    return (
        `https://calendar.google.com/calendar/render?action=TEMPLATE` +
        `&text=${encodeURIComponent(event.namePub)}` +
        `&dates=${startDate}/${endDate}` +
        `&details=${encodeURIComponent(event.description)}` +
        `&location=${encodeURIComponent(event.place)}` +
        `&sf=true&output=xml`
    );
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
    const { t } = useTranslation();
    const [isAndroid, setIsAndroid] = useState(false);

    useEffect(() => {
        setIsAndroid(/Android/i.test(navigator.userAgent));
    }, []);

    return (
        <aside className="w-full xl:w-80 bg-white rounded-md shadow-sm p-3 flex flex-col gap-2 mb-4 xl:mb-0">
            {loading && <p>{t("Loading event details...")}</p>}
            {error && <p className="text-red-500">{t("Error loading event")}</p>}
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
                        <strong>{t("Place")}:</strong> {event.place}
                    </p>
                    <p className="text-sm text-zinc-400">
                        <strong>{t("Start")}:</strong> {new Date(event.dateFrom).toLocaleString()}
                    </p>
                    <p className="text-sm text-zinc-400">
                        <strong>{t("End")}:</strong> {new Date(event.dateTo).toLocaleString()}
                    </p>

                    {isAndroid ? (
                        <a href={generateGoogleCalendarUrl(event)} target="_blank" rel="noopener noreferrer">
                            <Button variant="secondary">{t("Add to Calendar")}</Button>
                        </a>
                    ) : (
                        <a href={generateICSFile(event)} download={`${event.namePub.replace(/\s+/g, "_")}.ics`}>
                            <Button variant="secondary">{t("Add to Calendar")}</Button>
                        </a>
                    )}
                </>
            )}
        </aside>
    );
};

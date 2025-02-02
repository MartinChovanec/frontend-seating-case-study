import { Button } from "@/components/ui/button";
import { EventData } from "@/types/types";

interface EventInfoProps {
    event: EventData | null;
    loading: boolean;
    error: string | null;
}

export const EventInfoPanel: React.FC<EventInfoProps> = ({ event, loading, error }) => {
    return (
        <aside className="w-full xl:w-80 bg-white rounded-md shadow-sm p-3 flex flex-col gap-2 mb-4 xl:mb-0">
            {loading && <p>Loading event details...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {event && (
                <>
                    <img
                        src={event.headerImageUrl}
                        alt={event.namePub}
                        className="rounded-md h-32 object-cover"
                    />
                    <h1 className="text-xl text-zinc-900 font-semibold">{event.namePub}</h1>
                    <p className="text-sm text-zinc-500">{event.description}</p>
                    <p className="text-sm text-zinc-400">
                        <strong>Místo:</strong> {event.place}
                    </p>
                    <p className="text-sm text-zinc-400">
                        <strong>Od:</strong> {new Date(event.dateFrom).toLocaleString()}
                    </p>
                    <p className="text-sm text-zinc-400">
                        <strong>Do:</strong> {new Date(event.dateTo).toLocaleString()}
                    </p>
                    <Button variant="secondary" disabled>
                        Add to calendar
                    </Button>
                </>
            )}
        </aside>
    );
}; 
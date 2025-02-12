// SeatingCard.tsx
import { Seat } from "@/components/Seat";
import { SeatData } from "@/types/types";
import { useTranslation } from "react-i18next";


interface SeatingCardProps {
    seatsLoading: boolean;
    seatsError: string | null;
    seats: SeatData | null;
}
/**
 * SeatingMap Component
 *
 * Generates a seat map where users can select available seats.
 * - Displays loading and error messages as needed.
 * - Maps through seat rows and renders each seat with corresponding data.
 * - Uses the `Seat` component for individual seats.
 */
export const SeatingMap = ({ seatsLoading, seatsError, seats }: SeatingCardProps) => {

    const { t } = useTranslation();

    const getTicketColor = (ticketName: string | undefined) => {
        switch (ticketName) {
            case "VIP ticket":
                return "bg-amber-400";
            case "Regular ticket":
                return "bg-blue-500";
            default:
                return "bg-gray-400";
        }
    };
    return (
        <div className="bg-white rounded-md w-full xl:max-w-[calc(100%-340px)] p-3 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-zinc-900">{t("Choose your seats")}</h2>
            {/* Legenda */}
            {seats && seats.ticketTypes.length > 0 && (
                <div className="flex flex-wrap gap-4 mb-4">
                    {seats.ticketTypes.map((ticketType) => (
                        <div key={ticketType.id} className="flex items-center gap-2">
                            <span className={`w-4 h-4 rounded-full ${getTicketColor(ticketType.name)}`} />
                            <span className="text-sm text-zinc-700">
                                {t(ticketType.name)} - {ticketType.price} {t("CZK")}
                            </span>
                        </div>
                    ))}
                </div>
            )}
            {seatsLoading && <p>{t("Loading seats...")}</p>}
            {seatsError && <p className="text-red-500">{seatsError}</p>}
            {!seatsLoading &&
                seats &&
                seats.seatRows.map((row) => (
                    <div key={row.seatRow} className="mb-4 last:mb-0">
                        <h3 className="text-left text-xs font-medium text-zinc-600 mb-2">{t("Row")} {row.seatRow}</h3>
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

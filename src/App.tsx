import { Seat } from "@/components/Seat.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import "./App.css";
import { getEvent } from "@/components/hooks/getEvent";
import { getSeats } from "@/components/hooks/getSeats";

function App() {
    const isLoggedIn = false;
    const { event, loading, error } = getEvent();

    // Fetch seat data
    const { seats, loading: seatsLoading, error: seatsError } = getSeats(event?.eventId || "");

    return (
        <div className="flex flex-col grow">
            {/* header (wrapper) */}
            <nav className="sticky top-0 left-0 right-0 bg-white border-b border-zinc-200 flex justify-center">
                {/* inner content */}
                <div className="max-w-screen-lg p-4 grow flex items-center justify-between gap-3">
                    {/* application/author image/logo placeholder */}
                    <div className="max-w-[250px] w-full flex">
                        <div className="bg-zinc-100 rounded-md size-12" />
                    </div>
                    {/* app/author title/name placeholder */}
                    <div className="bg-zinc-100 rounded-md h-8 w-[200px]" />
                    {/* user menu */}
                    <div className="max-w-[250px] w-full flex justify-end">
                        {isLoggedIn ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost">
                                        <div className="flex items-center gap-2">
                                            <Avatar>
                                                <AvatarImage
                                                    src={`https://source.boringavatars.com/marble/120/<user-email>?colors=25106C,7F46DB`}
                                                />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>

                                            <div className="flex flex-col text-left">
                                                <span className="text-sm font-medium">John Doe</span>
                                                <span className="text-xs text-zinc-500">john.doe@nfctron.com</span>
                                            </div>
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[250px]">
                                    <DropdownMenuLabel>John Doe</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem disabled>Logout</DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button disabled variant="secondary">
                                Login or register
                            </Button>
                        )}
                    </div>
                </div>
            </nav>

            {/* main body (wrapper) */}
            <main className="grow flex flex-col justify-center">
                {/* inner content */}
                <div className="max-w-screen-lg m-auto p-4 flex items-start grow gap-3 w-full">
                    {/* seating card */}
                    <div className="bg-white rounded-md grow p-3 self-stretch shadow-sm">
                        {seatsLoading && <p>Loading seats...</p>}
                        {seatsError && <p className="text-red-500">{seatsError}</p>}
                        {!seatsLoading && seats && seats.seatRows.map((row) => (
                            <div key={row.seatRow} className="mb-4">
                                <h3 className="text-left text-xs font-medium text-zinc-600 mb-2">
                                    Row {row.seatRow}
                                </h3>
                                <div className="flex gap-2">
                                    {row.seats.map((seat) => {
                                        const ticketType = seats.ticketTypes.find(
                                            (type) => type.id === seat.ticketTypeId
                                        );
                                        return (
                                            <Seat
    key={seat.seatId}
    className={`${
        seat.information === "Nedostupné"
            ? "bg-gray-300 opacity-50" // Gray color for unavailable seats
            : ticketType?.name === "VIP ticket"
            ? "bg-yellow-300"
            : "bg-green-300"
    }`}
    data-number={seat.information !== "Nedostupné" ? seat.place : undefined}
    data-information={seat.information} // Pass seat information
>
    {seat.information !== "Nedostupné" && (
        <span className="text-xs">{ticketType?.name}</span>
    )}
</Seat>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* event info */}
                    <aside className="w-full max-w-sm bg-white rounded-md shadow-sm p-3 flex flex-col gap-2">
                        {loading && <p>Loading event details...</p>}
                        {error && <p className="text-red-500">{error}</p>}
                        {event && (
                            <>
                                {/* event header image placeholder 
						<div className="bg-zinc-100 rounded-md h-32" />*/}
                                <img
                                    src={event.headerImageUrl}
                                    alt={event.namePub}
                                    className="rounded-md h-32 object-cover"
                                />
                                {/* event name */}
                                <h1 className="text-xl text-zinc-900 font-semibold">{event.namePub}</h1>
                                {/* event description */}
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
                                {/* add to calendar button */}
                                <Button variant="secondary" disabled>
                                    Add to calendar
                                </Button>
                            </>
                        )}
                    </aside>
                </div>
            </main>

            {/* bottom cart affix (wrapper) */}
            <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex justify-center">
                {/* inner content */}
                <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
                    {/* total in cart state */}
                    <div className="flex flex-col">
                        <span>Total for [?] tickets</span>
                        <span className="text-2xl font-semibold">[?] CZK</span>
                    </div>

                    {/* checkout button */}
                    <Button disabled variant="default">
                        Checkout now
                    </Button>
                </div>
            </nav>
        </div>
    );
}

export default App;

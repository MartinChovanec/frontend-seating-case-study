export interface TicketType {
    id: string;
    name: string;
    price: number;
}

export interface Seat {
    seatId: string;
    place: number;
    information: string;
    ticketTypeId?: string;
}

export interface SeatRow {
    seatRow: number;
    seats: Seat[];
}

export interface SeatData {
    ticketTypes: TicketType[];
    seatRows: SeatRow[];
}


export interface EventData {
    eventId: string;
    namePub: string;
    description: string;
    currencyIso: string;
    dateFrom: string;
    dateTo: string;
    headerImageUrl: string;
    place: string;
}

export interface CartItem {
    seatId: string;
    row: number;
    place: number;
    price?: number;
    ticketTypeId?: string;
}
export interface UserData {
    email: string;
    firstName: string;
    lastName: string;
} 
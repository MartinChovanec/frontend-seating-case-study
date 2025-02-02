import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { UserData, EventData } from "@/types/types";

interface HeaderProps {
    user: UserData | null;
    setIsLoginOpen: (open: boolean) => void;
    isLoggedIn: boolean;
    event: EventData | null;
}

export const Header = ({ user, setIsLoginOpen, isLoggedIn, event }: HeaderProps) => {
    return (
        <nav className="sticky top-0 left-0 right-0 bg-white border-b border-zinc-200 flex justify-center">
            {/* inner content */}
            <div className="max-w-screen-lg p-4 grow flex items-center justify-between gap-3">
                {/* application/author image/logo placeholder */}
                <div className="max-w-[250px] w-full flex">
                    <div className="bg-zinc-100 rounded-md size-12" />
                </div>
                {/* app/author title/name placeholder */}
                <h1 className="text-zinc-900 flex-1 text-center md:text-left truncate max-w-[200px] md:max-w-none">
                    {event?.namePub || 'Loading event...'}
                </h1>
                
                {/* user menu */}
                <div className="max-w-[250px] w-full flex justify-end">
                    {isLoggedIn && user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost">
                                    <div className="flex items-center gap-2">
                                        <Avatar>
                                            <AvatarImage
                                                src={`https://source.boringavatars.com/marble/120/<user-email>?colors=25106C,7F46DB`}
                                            />
                                            <AvatarFallback>
                                                {user.firstName[0]} {user.lastName[0]}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="flex flex-col text-left">
                                            <span className="text-sm font-medium">
                                                {user.firstName} {user.lastName}
                                            </span>
                                            <span className="text-xs text-zinc-500">{user.email}</span>
                                        </div>
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[250px]">
                                <DropdownMenuLabel>
                                    {user.firstName} {user.lastName}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem disabled>Logout</DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setIsLoginOpen(true); // Otevřít login modal
                            }}
                        >
                            Login
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    );
};

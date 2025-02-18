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
import { useTranslation } from "react-i18next";
import Logo from "@/nfctron-logo-dark.svg";

interface HeaderProps {
    user: UserData | null;
    setIsLoginOpen: (open: boolean) => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    isLoggedIn: boolean;
    event: EventData | null;
    setUser: (userData: null) => void;
    openLogin: () => void;
}

/**
 * Header Component
 *
 * Displays:
 * - The event name from the provided event data
 * - A user authentication menu with login/logout options
 *
 * If the user is logged in, their avatar and details are displayed in a dropdown.
 * If not, a login button is shown.
 *
 */

export const Header = ({ user, setIsLoginOpen, setIsLoggedIn, isLoggedIn, event, setUser, openLogin }: HeaderProps) => {
    const { t, i18n } = useTranslation();

    return (
        <nav className="sticky top-0 left-0 right-0 bg-white border-b border-zinc-200 flex justify-center">
            {/* inner content */}
            <div className="max-w-screen-lg p-4 grow flex items-center justify-between gap-3">
                {/* application/author image/logo placeholder */}
                {/* Logo */}
                <div className="max-w-[100px] w-full flex">
                    <img src={Logo} alt="NFCtron Logo" className="h-10 w-auto object-contain" />
                </div>
                {/* app/author title/name placeholder */}
                <h1 className="text-zinc-900 flex-1 text-center truncate max-w-[200px] md:max-w-none max-[520px]:hidden">
                    {event?.namePub || "Loading event..."}
                </h1>
                <div className="flex flex-shrink-0 items-center gap-4">
                    {/* Language select */}
                    <Button variant="secondary" asChild className="px-3 py-2">
                        <select
                            className="cursor-pointer text-sm"
                            value={i18n.language}
                            onChange={(e) => i18n.changeLanguage(e.target.value)}
                        >
                            <option value="en">EN</option>
                            <option value="cs">CZ</option>
                        </select>
                    </Button>

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
                                        <DropdownMenuItem
                                            onClick={() => {
                                                setUser(null);
                                                setIsLoggedIn(false);
                                            }}
                                        >
                                            {t("Logout")}
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button variant="secondary" onClick={openLogin}>
                                {t("Login")}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

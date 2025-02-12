import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useTranslation } from "react-i18next";


interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (user: { email: string; firstName: string; lastName: string }) => void;
    isCheckoutClicked: boolean;
}

/**
 * LoginModal Component
 *
 * Handles user authentication using a login modal.
 * Uses the API: `POST https://nfctron-frontend-seating-case-study-2024.vercel.app/login`
 *
 * - Takes user credentials (email & password)
 * - Sends a login request to the API
 * - If successful:
 *   - Stores user data in `localStorage`
 *   - Calls `onSuccess` with user details
 *   - Closes the modal
 *   - Redirects user to `/checkout` if there are items in the cart, otherwise to `/`
 *
 */

export const LoginModal = ({
    isOpen,
    onClose,
    onSuccess,
    isCheckoutClicked,
}: LoginModalProps) => {
    const navigate = useNavigate();
    const { cart } = useCart();
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [loginError, setLoginError] = useState<string | null>(null);
    const { t } = useTranslation();


    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async () => {
        setLoginError(null);

        try {
            const response = await fetch("https://nfctron-frontend-seating-case-study-2024.vercel.app/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                throw new Error("Invalid email or password");
            }

            const data = await response.json();
            console.log("Login successful", data);

            // 🟢 Uložit uživatele do localStorage včetně hodnot z API
            localStorage.setItem(
                "user",
                JSON.stringify({
                    email: data.user.email,
                    firstName: data.user.firstName,
                    lastName: data.user.lastName,
                })
            );
            onClose(); // Zavřít modal
            onSuccess({
                email: data.user.email,
                firstName: data.user.firstName,
                lastName: data.user.lastName,
            });

            // Přesměrování na základě stavu košíku
            if (isCheckoutClicked && cart.length > 0) {
                navigate("/checkout");
            } else {
                navigate("/");
            }
        } catch (error: any) {
            setLoginError(error.message || "Login failed");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-gray-900">{t("Login to your account")}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    {loginError && <p className="text-red-500">{loginError}</p>}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        className="border p-2 rounded-md"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        className="border p-2 rounded-md"
                    />
                    <Button variant="default" onClick={handleLoginSubmit}>
                    {t("Login")}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LoginModal;

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"; // Import navigate

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate(); // Použití navigate
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [loginError, setLoginError] = useState<string | null>(null);

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
            navigate("/checkout"); // Přesměrovat na checkout
        } catch (error: any) {
            setLoginError(error.message || "Login failed");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-gray-900">Login to your account</DialogTitle>
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
                        Log in
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LoginModal;

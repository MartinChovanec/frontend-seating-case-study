import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "@/components/ui/button.tsx";
import { useTranslation } from "react-i18next";

interface CheckoutDialogProps {
    open: boolean;
    setIsCheckoutOpen: (open: boolean) => void;
    isLoggedIn: boolean;
    setIsLoginOpen: (open: boolean) => void;
    navigate: (path: string) => void;
}

/**
 * CheckoutDialog Component
 * 
 * Displays a modal after checkout, allowing the user to either log in or continue as a guest.
 *
 */


export const CheckoutDialog = ({
    open,
    setIsCheckoutOpen,
    isLoggedIn,
    setIsLoginOpen,
    navigate,
}: CheckoutDialogProps) => {
    

    const { t } = useTranslation();

    return (
        <Dialog open={open} onOpenChange={setIsCheckoutOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-gray-600">{t("Are you registered?")}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    {!isLoggedIn ? (
                        <>
                            <p className="text-sm text-gray-900">{t("Sign in to your account or continue as a guest.")}</p>
                            <Button
                                variant="default"
                                onClick={() => {
                                    setIsCheckoutOpen(false); // Close checkout modal
                                    setIsLoginOpen(true); // Open login modal
                                }}
                            >
                                {t("Sign in")}
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setIsCheckoutOpen(false); // Close modal
                                    navigate("/checkout"); // Redirect to na checkout
                                }}
                            >
                                {t("Continue as a guest")}
                            </Button>
                        </>
                    ) : (
                        <p className="text-sm text-gray-600">{t("You're logged in. Proceed to payment.")}</p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

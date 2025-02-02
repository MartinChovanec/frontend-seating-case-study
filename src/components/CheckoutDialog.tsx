import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "@/components/ui/button.tsx";

interface CheckoutDialogProps {
    open: boolean;
    setIsCheckoutOpen: (open: boolean) => void;
    isLoggedIn: boolean;
    setIsLoginOpen: (open: boolean) => void;
    navigate: (path: string) => void;
}

export const CheckoutDialog = ({
    open,
    setIsCheckoutOpen,
    isLoggedIn,
    setIsLoginOpen,
    navigate,
}: CheckoutDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={setIsCheckoutOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-gray-600">Are you registered?</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    {!isLoggedIn ? (
                        <>
                            <p className="text-sm text-gray-900">Sign in to your account or continue as a guest.</p>
                            <Button
                                variant="default"
                                onClick={() => {
                                    setIsCheckoutOpen(false); // Zavřít checkout modal
                                    setIsLoginOpen(true); // Otevřít login modal
                                }}
                            >
                                Sign in
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setIsCheckoutOpen(false); // Zavři modal
                                    navigate("/checkout"); // Přesměruj na checkout stránku
                                }}
                            >
                                Continue as a guest
                            </Button>
                        </>
                    ) : (
                        <p className="text-sm text-gray-600">You're logged in. Proceed to payment.</p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

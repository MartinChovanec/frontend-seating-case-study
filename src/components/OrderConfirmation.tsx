import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

/**
 * OrderConfirmation Component
 *
 * Displays a confirmation page with order details retrieved from localStorage.
 * If no order data is found, an error message is displayed.
 *
 */
export const OrderConfirmation = () => {
    const [order, setOrder] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        /**
         * Retrieves order details from localStorage.
         * If order data is missing, sets an error state.
         */
        const storedOrder = localStorage.getItem("order");
        if (storedOrder) {
            setOrder(JSON.parse(storedOrder));
        } else {
            setError(t("The order data could not be loaded"));
        }
    }, []);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
            <div className="bg-white shadow-md rounded-md p-6 max-w-lg w-full">
                <h1 className="text-2xl font-semibold text-center text-gray-900 mb-4">
                    {error ? t("Error during order") : t("Confirmation of order")}
                </h1>

                {error ? (
                    <>
                        <p className="text-red-500 text-center">{error}</p>
                        <p className="text-sm text-center text-gray-600 mt-2">
                            {t(
                                "The order could not be completed. Please try again. If problems persist, please contact support"
                            )}
                            support{" "}
                            <a
                                href="https://support.nfctron.com/cs/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                NFCTron Support
                            </a>
                        </p>
                    </>
                ) : (
                    <>
                        <p className="text-lg font-semibold text-center text-gray-900 mb-4">
                            {t("Thank you for your purchase")}🎉
                        </p>

                        <div className="mt-4 p-3 border rounded-md text-gray-900">
                            <p>
                                <strong>{t("Order number")}:</strong> {order?.orderId}
                            </p>
                            <p>
                                <strong>{t("Name")}:</strong> {order?.user.firstName} {order?.user.lastName}
                            </p>
                            <p>
                                <strong>{t("E-mail")}:</strong> {order?.user.email}
                            </p>
                            <p>
                                <strong>{t("Total price")}:</strong> {order?.totalAmount} {t("CZK")}
                            </p>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mt-4">{t("Purchased tickets")}:</h3>
                        <ul className="list-disc pl-5 text-gray-600">
                            {order?.tickets.map((ticket: any, index: number) => (
                                <li key={index}>
                                    {t("Ticket")} #{index + 1} – {t("Seat ID")}: {ticket.seatId}
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                <div className="flex justify-center mt-6">
                    <Button variant="default" onClick={() => navigate("/")}>
                        {t("Back to the main page")}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;

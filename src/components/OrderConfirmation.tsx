import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";


const OrderConfirmation = () => {
    const [order, setOrder] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Získání dat o objednávce z localStorage
        const storedOrder = localStorage.getItem("order");
        if (storedOrder) {
            setOrder(JSON.parse(storedOrder));
        } else {
            setError("Objednávku nebylo možné načíst.");
        }
    }, []);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
            <div className="bg-white shadow-md rounded-md p-6 max-w-lg w-full">
                <h1 className="text-2xl font-semibold text-center text-gray-900 mb-4">
                    {error ? "Chyba při objednávce" : "Potvrzení objednávky"}
                </h1>

                {error ? (
                    <>
                        <p className="text-red-500 text-center">{error}</p>
                        <p className="text-sm text-center text-gray-600 mt-2">
                            Objednávku nebylo možné dokončit. Zkuste to prosím znovu. Pokud problémy přetrvávají, kontaktujte podporu{" "}
                            <a
                                href="https://support.nfctron.com/cs/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                NFCTron Podpora
                            </a>
                        </p>
                    </>
                ) : (
                    <>

                        <p className="text-lg font-semibold text-center text-gray-900 mb-4">Děkujeme za nákup! 🎉</p>

                        <div className="mt-4 p-3 border rounded-md text-gray-900">
                            <p><strong>Číslo objednávky:</strong> {order?.orderId}</p>
                            <p><strong>Jméno:</strong> {order?.user.firstName} {order?.user.lastName}</p>
                            <p><strong>E-mail:</strong> {order?.user.email}</p>
                            <p><strong>Celková cena:</strong> {order?.totalAmount} CZK</p>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mt-4">Zakoupené lístky:</h3>
                        <ul className="list-disc pl-5 text-gray-600">
                            {order?.tickets.map((ticket: any, index: number) => (
                                <li key={index}>
                                    Lístek #{index + 1} – Seat ID: {ticket.seatId}
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                <div className="flex justify-center mt-6">
                    <Button variant="default" onClick={() => navigate("/")}>
                        Zpět na hlavní stránku
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;

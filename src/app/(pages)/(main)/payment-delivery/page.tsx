import PaymentDelivery from "@/app/_components/Payment/PaymentDelivery";
// import ProtectedRoute from "@/utils/ProtectedRoute";

export default function PaymentDeliveryPage() {
    return (
        // <ProtectedRoute>
            <section className="container">
                <PaymentDelivery />
            </section>
        // </ProtectedRoute>
    );
};
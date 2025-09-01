"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/lib/context/auth";

export default function ProtectedRoute({
    children,
    allowedRoles,
}: {
    children: React.ReactNode;
    allowedRoles?: string[]; // admin أو user
}) {
    const router = useRouter();
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext must be used within AuthContextProvider");
    }

    const { userData } = authContext;

    useEffect(() => {
        // مش عامل login
        if (!userData) {
            router.push("/login");
        }

        // لو فيه roles متاحة والـ user مش منهم
        if (allowedRoles && userData && !allowedRoles.includes(userData.role)) {
            router.push("/not-authorized");
        }
    }, [userData, allowedRoles, router]);

    if (!userData) return null; // لحد ما يتأكد

    return <>{children}</>;
}

'use client';

import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo/ApolloClient";
import { AuthContextProvider } from "@/lib/context/auth";
import Navbar from "../Navber/navbar";

const queryClient = new QueryClient();

export default function ProvidersWrapper({ children }: { children: ReactNode }) {
    return (
        <AuthContextProvider>
            <ApolloProvider client={client}>
                <QueryClientProvider client={queryClient}>
                    <Navbar />
                    {children}
                    <Toaster />
                </QueryClientProvider>
            </ApolloProvider>
        </AuthContextProvider>
    );
};
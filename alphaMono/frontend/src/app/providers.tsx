"use client";

import { ApolloProvider } from "@apollo/client";
import { NextUIProvider } from "@nextui-org/react";

import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

import api from "@/lib/api";

function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <ApolloProvider client={api}>
      <NextUIProvider navigate={router.push}>
        {children}
        <Toaster />
      </NextUIProvider>
    </ApolloProvider>
  );
}

export default Providers;

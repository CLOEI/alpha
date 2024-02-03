"use client";

import { Button, Spacer } from "@nextui-org/react";
import { ChevronLeft } from "lucide-react";

import { useRouter } from "next/navigation";

function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="p-2 min-h-screen">
      <div className="flex">
        <Button
          variant="ghost"
          size="sm"
          radius="sm"
          onClick={() => router.back()}
        >
          <ChevronLeft size={36} />
        </Button>
      </div>
      <Spacer y={2} />
      {children}
    </div>
  );
}

export default Layout;

import { Button, Spacer } from "@nextui-org/react";
import { ChevronLeft } from "lucide-react";

import Link from "next/link";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-2 min-h-screen">
      <div className="flex">
        <Button href="/" variant="ghost" size="sm" radius="sm" as={Link}>
          <ChevronLeft size={36} />
        </Button>
      </div>
      <Spacer y={2} />
      {children}
    </div>
  );
}

export default Layout;

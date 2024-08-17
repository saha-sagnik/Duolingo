"use client"

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

type Props = {
    label: string;
  iconSrc: string;
  href: string;
};

const SideBarItem = ({label,iconSrc,href}:Props) => {

    const pathname = usePathname();
    const isActive = pathname === href;
  
    return (
      <Button
        variant={isActive ? "sidebarOutline" : "sidebar"}
        className="h-[52px] justify-start"
        asChild
      >
        <Link href={href}>
          <Image
            src={iconSrc}
            alt={label}
            className="mr-5"
            height={32}
            width={32}
          />
          {label}
        </Link>
      </Button>
     );
};
 
export default SideBarItem;
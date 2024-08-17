import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import SideBarItem from "./sidebar-item";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";

import { Loader } from "lucide-react";

type Props = {
  className: string;
};

const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "left-0 top-0 flex h-full flex-col border-r-2 px-4 lg:fixed lg:w-[256px]",
        className
      )}
    >
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/logo.png" height={40} width={40} alt="lingo logo" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            LingoWiz
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SideBarItem 
        label="Learn" 
        href="/learn" 
        iconSrc="/learn.svg" 
        />
        <SideBarItem 
        label="LeaderBoard" 
        href="/leaderboard" 
        iconSrc="/leaderboard.svg" 
        />
        <SideBarItem 
        label="Quests" 
        href="/quests" 
        iconSrc="/quest.svg" 
        />
        <SideBarItem 
        label="Shop" 
        href="/shop" 
        iconSrc="/shop.svg" 
        />
      </div>
      <div className="p-4">
      <ClerkLoading>
        <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
      </ClerkLoading>
      <ClerkLoaded>
        <UserButton afterSignOutUrl="/"/>
      </ClerkLoaded>
      </div>
    </div>
  );
};

export default Sidebar;

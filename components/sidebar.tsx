import { cn } from "@/lib/utils";

type Props = {
    className: string,
}

const Sidebar = ({className}:Props) => {
    return ( 
        <div
      className={cn(
        "left-0 top-0 flex h-full flex-col border-r-2 px-4 lg:fixed lg:w-[256px]",
        className
      )}
    >
            SideBar
        </div>
     );
}
 
export default Sidebar;
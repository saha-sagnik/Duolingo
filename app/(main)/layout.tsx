import MobileHeader from "@/components/MobileHeader";
import Sidebar from "@/components/sidebar";

type Props = {
    children: React.ReactNode;
}

const LayoutPage = ({children}:Props) => {
    return ( 
      <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="h-full pt-[50px] lg:pl-[256px] lg:pt-0">
        <div className="mx-auto h-full max-w-[1056px] pt-6">{children}</div>
      </main>
    </>);
}
 
export default LayoutPage;
import MobileSideBar from './MobileSideBar.jsx'

const MobileHeader = () => {
    return ( 
        <nav className="lg:hidden px-6 h-[50px] flex items-center
        bg-yellow-500 border-b fixed top w-full z-50"> 
            
            <MobileSideBar/>
        </nav>
     );
}
 
export default MobileHeader;
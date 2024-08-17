import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet.tsx"
import Sidebar from './sidebar.tsx'
import { Menu } from "lucide-react"


function MobileSideBar() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>

      <SheetContent className="z-[100] p-0" side="left">
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}

export default MobileSideBar
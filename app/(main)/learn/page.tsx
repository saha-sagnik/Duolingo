import { FeedWrapper } from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import Header from "./header";
import UserpProgress from "@/components/UserProgress";

const Learn = () => {
    return ( 
        <div className="flex flex-row-reverse gap-[48px] px-6">
       <StickyWrapper>
       <UserpProgress
       activeCourse={{title:"Spanish", imageSrc:"/es.svg"}}
       hearts = {5}
       points = {100}
       hasActiveSubscription={false}
       
       />
       </StickyWrapper>
      
       <FeedWrapper>
       <Header title="Spanish"/>
       </FeedWrapper>
       
        </div>
     );
}
 
export default Learn;
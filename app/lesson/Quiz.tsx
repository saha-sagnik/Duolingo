"use client"

import { challengeOptions, challenges } from "@/db/schema";
import { useState } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";



type Props = {
    initialLessonId: number,
    initialHearts: number,
    initalPercentage: number,
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    userSubscription: any;
}

const Quiz = ({
    initialLessonId,
    initialHearts,
    initalPercentage,
    initialLessonChallenges,
    userSubscription
}:Props) => {

    const [hearts,setHearts] = useState(initialHearts);
    const[percentage,setPercentage] = useState(initalPercentage);

    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(()=>{
        const uncompletedIndex = challenges.findIndex((challenge)=>!challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });

    const [selectedOption, setSelectedOption] = useState<number>();
    const [status,setStatus] = useState<"correct" | "wrong" | "none">("none");

    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions ?? []
    
    const onSelect = (id:number)=>{
        if(status !=="none")
            return
        
        setSelectedOption(id);


    }

    const title  = challenge.type === "ASSIST" ? 
    "Select the correct meaning"
    : challenge.question;


    return ( 
        <>
        <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
         <div className="flex-1">
        <div className="flex h-full items-center justify-center">
          <div className="flex w-full flex-col gap-y-12 px-6 lg:min-h-[350px] lg:w-[600px] lg:px-0">
            <h1 className="text-center text-lg font-bold text-neutral-700 lg:text-start lg:text-3xl">
                        {title}
                    </h1>
                    <div>
                        {challenge.type === "ASSIST" && (
                            <QuestionBubble question = {challenge.question}/>
                        )}
                     <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={false}
                type={challenge.type}
              />
                    </div>
                </div>
            </div>

        </div>
        <Footer
        disabled={ !selectedOption}
        status={status}
        onCheck={()=>{}}
      />
        </>

     );
}
 
export default Quiz;
"use client"

import { challengeOptions, challenges } from "@/db/schema";
import { useState } from "react";
import { Header } from "./header";


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


    return ( 
        <>
        <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
        </>
     );
}
 
export default Quiz;
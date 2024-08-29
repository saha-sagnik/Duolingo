"use client"

import { challengeOptions, challenges } from "@/db/schema";
import { useState, useTransition } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/user-progress";
import { useAudio, useWindowSize, useMount } from "react-use";
import Image from "next/image";
import { ResultCard } from "./result-card";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti"
import { useHeartModel } from "@/store/use-hearts-model";
import { usePracticeModel } from "@/store/use-practice-model";


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

    const {open: openHeartModel} = useHeartModel();
    const {open: openPracticeModel} = usePracticeModel();

    useMount(()=>{
        if(initalPercentage===100)
            openPracticeModel();
    })

    const {width, height} = useWindowSize();

    const router = useRouter();

    const [
        correctAudio,
        _c,
        correctControls
    ] = useAudio({src: "/correct.wav"});

    const [
        incorrectAudio,
        _i,
        incorrectControls
    ] = useAudio({src: "/incorrect.wav"});

    const [finishAudio] = useAudio({src: "/finish.mp3", autoPlay: true});

    const [isPending, startTransition] = useTransition();


    const [lessonId] = useState(initialLessonId);
    const [hearts,setHearts] = useState(initialHearts);
    const[percentage,setPercentage] = useState(()=>{
        return initalPercentage === 100 ? 0 : initalPercentage
    });

    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(()=>{
        const uncompletedIndex = challenges.findIndex((challenge)=>!challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });

    const [selectedOption, setSelectedOption] = useState<number>();
    const [status,setStatus] = useState<"correct" | "wrong" | "none">("none");

    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions ?? []
    
    const onSelect = (id: number) => {
        if (status !== "none") return;
    
        setSelectedOption(id);
      };

    const onNext = ()=>{
        setActiveIndex((current)=>current+1);
    };

    const onContinue = ()=>{
        if(!selectedOption)
            return;
        if(status=="wrong"){
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }
        if(status=="correct"){
            onNext();
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        const correctOption = options.find((option)=> option.correct);

        if(!correctOption)
            return;

        if(correctOption && correctOption.id === selectedOption){
            startTransition(()=>{
                upsertChallengeProgress(challenge.id)
                .then((response)=>{
                    if(response?.error==="hearts"){
                       openHeartModel();
                        return;
                    }

                    correctControls.play();

                    setStatus("correct");
                    setPercentage((prev)=>prev + 100 / challenges.length);
                    
                    if(initalPercentage===100){
                        setHearts((prev)=>Math.min(prev+1, 5));
                    }
                })

                .catch(()=>toast.error("Something went wrong! Please try again!"))
            });
        }
        else
       {
        startTransition(()=>{
            reduceHearts(challenge.id)
            .then((response)=>{
                if(response?.error === "hearts"){
                    openHeartModel();
                    return;
                }

                incorrectControls.play();
                setStatus("wrong");

                if(!response?.error){
                    setHearts((prev)=>Math.max(prev-1,0));
                }
            })
            .catch(()=> toast.error("Something went wrong. Please try again."))
        });
       }
        
    };

    if(!challenge){
        return(
           <>
            {finishAudio}
        <Confetti
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10_000}
          width={width}
          height={height}
        /> 
        <div className="mx-auto flex h-full max-w-lg flex-col items-center justify-center gap-y-4 text-center lg:gap-y-8">
          <Image
            src="/finish.svg"
            alt="Finish"
            className="hidden lg:block"
            height={100}
            width={100}
          />

          <Image
            src="/finish.svg"
            alt="Finish"
            className="block lg:hidden"
            height={100}
            width={100}
          />

          <h1 className="text-lg font-bold text-neutral-700 lg:text-3xl">
            Great job! <br /> You&apos;ve completed the lesson.
          </h1>

          <div className="flex w-full items-center gap-x-4">
            <ResultCard variant="points" value={challenges.length * 10} />
            <ResultCard
              variant="hearts"
              value={ hearts}
            /> 
          </div>
        </div>

        <Footer
          lessonId={lessonId}
          status="completed"
          onCheck={() => router.push("/learn")}
        />
           </>
        )
    }

    const title  = challenge.type === "ASSIST" ? 
    "Select the correct meaning"
    : challenge.question;


    return ( 
        <>
        {correctAudio}
        {incorrectAudio}
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
                disabled={isPending}
                type={challenge.type}
              />
                    </div>
                </div>
            </div>

        </div>
        <Footer
        disabled={ !selectedOption}
        status={status}
        onCheck={onContinue}
      />
        </>

     );
}
 
export default Quiz;
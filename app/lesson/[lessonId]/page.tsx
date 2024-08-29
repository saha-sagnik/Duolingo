import { redirect } from "next/navigation";

import { getLesson, getUserProgress } from "@/db/queries";
import Quiz from "../Quiz";



type LessonIdPageProps = {
  params: {
    lessonId: number;
  };
};

const LessonIdPage = async ({ params }: LessonIdPageProps) => {
  const lessonData = getLesson(params.lessonId);
  const userProgressData = getUserProgress();
  //const userSubscriptionData = getUserSubscription();

  const [lesson, userProgress] = await Promise.all([
    lessonData,
    userProgressData,
   
  ]);

  if (!lesson || !userProgress) return redirect("/learn");

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initalPercentage={initialPercentage}
      userSubscription={null}
    />
  );
};

export default LessonIdPage;
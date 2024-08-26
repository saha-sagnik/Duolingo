import UserpProgress from "@/components/UserProgress";
import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import Quiz from "./Quiz";

const LessonPage = async () => {
  const lessonData = getLesson();
  const userProgressData = getUserProgress();

  const [lesson, userProgress] = await Promise.all([
    lessonData,
    userProgressData,
  ]);

  if (!userProgress || !lesson) redirect("/learn");

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) * 100;

  return (
  
    <Quiz
    initialLessonId = {lesson.id}
    initalPercentage = {initialPercentage}
    initialLessonChallenges = {lesson.challenges}
    initialHearts = {userProgress.hearts}
    userSubscription = {null}
    />
    );
};

export default LessonPage;

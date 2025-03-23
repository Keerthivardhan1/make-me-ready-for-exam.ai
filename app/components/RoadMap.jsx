import { useEffect, useState } from "react"
import Load from "./Load";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TaskProgress from "../components/TaskProgress";
import UserStore from "../store/userStore";
import RoadMapStore from "../store/RoadMapStore";


export default function RoadMap({roadmap , updateRoadMap , updateComppleteStatus}) {
  const user = UserStore();
  const roadMapStore = RoadMapStore()

  useEffect(() => {
    if (roadmap && roadmap.weeks) {
      const totalTasks = roadmap.weeks.flatMap((week) =>
        week.days.flatMap((day) => day.tasks)
      );
  
      const val = calculateCompletionPercentage(totalTasks);
      updateComppleteStatus(val); 
    }
  }, [roadmap]); 
  
  
  const handleCheckboxChange = (weekIndex, dayIndex, taskIndex) => {
    const newRoadmap = {
      ...roadmap, // Copy the original roadmap object
      weeks: roadmap.weeks.map((week, wIndex) => {
        if (wIndex === weekIndex) {
          // Only modify the target week
          return {
            ...week, // Copy the original week
            days: week.days.map((day, dIndex) => {
              if (dIndex === dayIndex) {
                // Only modify the target day
                return {
                  ...day, // Copy the original day
                  tasks: day.tasks.map((task, tIndex) => {
                    if (tIndex === taskIndex) {
                      // Toggle the completed status of the target task
                      return { ...task, completed: !task.completed };
                    }
                    return task; // Keep other tasks unchanged
                  }),
                };
              }
              return day; // Keep other days unchanged
            }),
          };
        }
        return week; // Keep other weeks unchanged
      }),
    };

    updateRoadMap(newRoadmap ); // Update the state with the modified roadmap
    roadMapStore.setRoadMap(newRoadmap);
  };

  const calculateCompletionPercentage = (items) => {
    if (!items || items.length === 0) return 0; // Handle cases with no items
    const completedTasks = items.filter((item) => item.completed).length;
    const val =  Math.round((completedTasks / items.length) * 100);
    return val;
  };






  
  return (
    <div className="m-10 w-[80vw]" >
      <h1 className="p-2 text-xl font-extrabold">{user.exam } :  RoadMap</h1>
       <>
       {roadmap && roadmap.weeks ? (
         <Accordion type="single" collapsible className="w-full">
           {roadmap &&
             roadmap.weeks &&
             roadmap.weeks.map((week, weekIndex) => (
               //  <Accordion  type="single"  collapsible  className="w-full">
               <AccordionItem
                 key={`week-${weekIndex}`}
                 value={`week-${weekIndex}`}
               >
                 <TaskProgress
                   val={calculateCompletionPercentage(
                     week.days.flatMap((day) => day.tasks)
                   )}
                 />
                 <AccordionTrigger className="font-bold text-xl">
                   Week {week.weekNumber} - <span className="text-green-600">Completion:{" "}
                   {calculateCompletionPercentage(
                     week.days.flatMap((day) => day.tasks)
                   )}
                   %
                   </span>
                 </AccordionTrigger>
                 {/* <div></div> */}
                 {/* <ul> */}
                 <AccordionContent>
                   {week.days.map((day, dayIndex) => (
                     <Accordion
                       key={`week-${weekIndex}-day-${dayIndex}`}
                       type="single"
                       collapsible
                     >
                       <AccordionItem
                         key={`week-${weekIndex}-day-${dayIndex}`}
                         value={`week-${weekIndex}-day-${dayIndex}`}
                       >
                         <AccordionTrigger className="font-bold">
                           {day.date} -{" "}
                           <span className="text-green-600">
                           {calculateCompletionPercentage(day.tasks)}%
                           Completed
                           </span>
                         </AccordionTrigger>
                         <ul>
                           {day.tasks.map((task, taskIndex) => (
                             <AccordionContent
                               key={`week-${weekIndex}-day-${dayIndex}-task-${taskIndex}`}
                               className="flex justify-between items-center p-2  gap-4"
                             >
                               {task.task}
                               <input
                                 type="checkbox"
                                 checked={task.completed}
                                 id="customCheckbox"
                                 className="custom-checkbox"
                                 onChange={() =>
                                   handleCheckboxChange(
                                     weekIndex,
                                     dayIndex,
                                     taskIndex
                                   )
                                 }
                               />
                             </AccordionContent>
                           ))}
                         </ul>
                       </AccordionItem>
                     </Accordion>
                   ))}
                 </AccordionContent>
                 {/* </ul> */}
               </AccordionItem>
             ))}
         </Accordion>
       ) : null
   }
   </>

    </div>
  )
}
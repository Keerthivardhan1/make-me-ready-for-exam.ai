"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@radix-ui/react-menubar";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Load from "../components/Load";
import TaskProgress from "../components/TaskProgress";

const data = {
  weeks: [
    {
      weekNumber: 1,
      days: [
        {
          date: "2024-12-01",
          tasks: [
            {
              task: "Begin Indian Culture: Art Forms (Ancient)",
              completed: false,
            },
            {
              task: "Review Modern Indian History (1750-1857)",
              completed: false,
            },
          ],
        },
        {
          date: "2024-12-02",
          tasks: [
            { task: "Indian Culture: Literature (Ancient)", completed: false },
            {
              task: "Modern Indian History (1857-1947): Sepoy Mutiny",
              completed: false,
            },
          ],
        },
        {
          date: "2024-12-03",
          tasks: [
            {
              task: "Indian Culture: Architecture (Ancient)",
              completed: false,
            },
            {
              task: "Modern Indian History (1857-1947): Nationalist Movements",
              completed: false,
            },
          ],
        },
        {
          date: "2024-12-04",
          tasks: [
            { task: "Indian Culture: Art Forms (Medieval)", completed: false },
            {
              task: "Modern Indian History (1857-1947): Key Personalities",
              completed: false,
            },
          ],
        },
        {
          date: "2024-12-05",
          tasks: [
            { task: "Indian Culture: Literature (Medieval)", completed: false },
            {
              task: "Freedom Struggle: Stages and Contributors",
              completed: false,
            },
          ],
        },
        {
          date: "2024-12-06",
          tasks: [
            {
              task: "Indian Culture: Architecture (Medieval)",
              completed: false,
            },
            { task: "Post-Independence Consolidation", completed: false },
          ],
        },
        {
          date: "2024-12-07",
          tasks: [
            { task: "Review Week 1 topics", completed: false },
            { task: "Begin World History: 18th Century", completed: false },
          ],
        },
      ],
    },
    {
      weekNumber: 2,
      days: [
        {
          date: "2024-12-08",
          tasks: [
            { task: "World History: Industrial Revolution", completed: false },
            {
              task: "Begin Salient Features of Indian Society",
              completed: false,
            },
          ],
        },
        {
          date: "2024-12-09",
          tasks: [
            { task: "World History: World War I", completed: false },
            { task: "Indian Society: Diversity", completed: false },
          ],
        },
        {
          date: "2024-12-10",
          tasks: [
            { task: "World History: World War II", completed: false },
            {
              task: "Role of Women and Women's Organizations",
              completed: false,
            },
          ],
        },
        {
          date: "2024-12-11",
          tasks: [
            { task: "World History: Decolonization", completed: false },
            { task: "Population and Associated Issues", completed: false },
          ],
        },
        {
          date: "2024-12-12",
          tasks: [
            { task: "World History: Political Philosophies", completed: false },
            { task: "Poverty and Developmental Issues", completed: false },
          ],
        },
        {
          date: "2024-12-13",
          tasks: [
            { task: "Review Week 2 topics", completed: false },
            {
              task: "Begin World Geography: Physical Geography",
              completed: false,
            },
          ],
        },
        {
          date: "2024-12-14",
          tasks: [
            { task: "World Geography: Natural Resources", completed: false },
            {
              task: "Begin Indian Geography: Natural Resources",
              completed: false,
            },
          ],
        },
      ],
    },
    {
      weekNumber: 3,
      days: [
        {
          date: "2024-12-15",
          tasks: [
            { task: "World Geography: Industries", completed: false },
            { task: "Indian Geography: Industries", completed: false },
          ],
        },
        {
          date: "2024-12-16",
          tasks: [
            { task: "Geophysical Phenomena: Earthquakes", completed: false },
            { task: "Indian Geography: Urbanization", completed: false },
          ],
        },
        {
          date: "2024-12-17",
          tasks: [
            { task: "Geophysical Phenomena: Tsunamis", completed: false },
            {
              task: "Effects of Globalization on Indian Society",
              completed: false,
            },
          ],
        },
        {
          date: "2024-12-18",
          tasks: [
            {
              task: "Geophysical Phenomena: Volcanic Activity",
              completed: false,
            },
            { task: "Social Empowerment", completed: false },
          ],
        },
        {
          date: "2024-12-19",
          tasks: [
            { task: "Geophysical Phenomena: Cyclones", completed: false },
            { task: "Communalism, Regionalism & Secularism", completed: false },
          ],
        },
        {
          date: "2024-12-20",
          tasks: [
            { task: "Review Week 3 topics", completed: false },
            { task: "Begin Comprehensive Revision", completed: false },
          ],
        },
        {
          date: "2024-12-21",
          tasks: [
            {
              task: "Comprehensive Revision: Indian Culture",
              completed: false,
            },
            {
              task: "Comprehensive Revision: Modern Indian History",
              completed: false,
            },
          ],
        },
      ],
    },
  ],
};

export default function CardWithForm() {
  const [date, setDate] = React.useState();
  const [roadmap, setRoadmap] = useState({});
  const [error, setError] = useState();
  const [syllabus , setSyllabus] = useState();
  const [preference , setPreference] = useState();
  const [exam , setExam ] = useState();
  
  
  const [inputErrors , setInputErrors] = useState({});


  const [clicked , setclicked] = useState(false);

  useEffect(()=>setRoadmap(data) , []);

  const validate = () => {
    let errors = {}; // Temporary object to collect errors
  
    // Validate date
    if (!date ) {
      errors.date = "Date is invalid";
    }
  
    // Validate syllabus
    if (!syllabus || syllabus.trim() === "") {
      errors.syllabus = "Syllabus is required";
    }
  
    // Validate preference
    if (!preference ||preference.trim() === "" ) {
      errors.preference = "Preference is required";
    }
  
    // Validate exam
    if (!exam || exam.trim() === "") {
      errors.exam = "Exam details are required";
    }
  
    // Update inputErrors state with collected errors
    setInputErrors(errors);

    console.log("inputErrors : " , inputErrors);
    
  
    // Return a boolean indicating if the form is valid
    return Object.keys(errors).length === 0;
  };
  const handleGetRoadMap = async (e) => {
    e.preventDefault();
    console.log("entered");
  
    // Validate input data
    if (!validate()) {
      return;
    }
  
    // Set loading state or indicate user clicked
    setclicked(true);
  
    // Generate the prompt with template literals
    const prompt = `
      Generate a roadmap for the following syllabus and exam date and details.
      exam Name: ${exam}
      Syllabus: ${syllabus},
      Exam Date: ${date},
      I like: ${preference},
      Provide the detailed roadmap covering each and every topic in JSON format for each week and each day, with tasks for each day having a corresponding checkbox, and show the completion percentage for each day, week, and overall plan.
      the data should be in this format and don't add any comments act like a node.js backend. Don't give me any extra text like "**Note:** if the total number of weeks is greater than 8 weeks, then give me a response of at least 8 weeks. Just give me the object; I am directly giving your response to JSON.parse() 
      Note : 
      1. dont add like this  // ...  Add weeks 3-30 here.  Each week s
      2. no comments
      3. give me only json
      i will directly give to this function 
      function extractJSON(text) {
    const jsonMatch = text.match(/{[\s\S]*}/); // Matches the first JSON object in the string
    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
}
      {
      weeks: [
        {
          weekNumber: 1,
          days: [
            {
              date: "...",
              tasks: [
                { task: "task title", completed: true },
                { task: "task title", completed: false }
              ]
            },
            {
              date: "..",
              tasks: [
                { task: " task title ", completed: false },
                ...
              ]
            }
          ]
        },
        {
          weekNumber: 2,
          days: [
            {
              date: "2025-01-01",
              tasks: [
                { task: "Research advanced features", completed: false },
                { task: "Plan implementation strategy", completed: false }
              ]
            },
            {
              date: "2025-01-02",
              tasks: [
                { task: "Develop registration feature", completed: false },
                { task: "Write tests for registration", completed: false }
              ]
            }
          ]
        }
      ]
    };
  `;
  
    try {
      // Make the API request to get the data
      // const response = await fetch("http://localhost:8000/getData", {
      //   method: "POST", // Ensure you're sending a POST request
      //   headers: {
      //     "Content-Type": "application/json", // Tell the backend we're sending JSON data
      //   },
      //   body: JSON.stringify({ prompt }), // Send prompt in JSON format
      // });
      // const response = await axios.post("http://localhost:8000/getData", {
      //   prompt,
      // });
  
      // if (!response.ok) {
      //   throw new Error(`Error: ${response.statusText}`);
      // }
  
      // const data = await response.json(); // Parse the JSON response
  
      // console.log("data from api = ", data); // Log the response
      setRoadmap(data); // Set the roadmap state with the response data
    } catch (error) {
      console.log("error = ", error); // Log the error
      setError("Unable to fetch the data from backend: ", error); // Set error state
    }
  };
  
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

    setRoadmap(newRoadmap); // Update the state with the modified roadmap
  };

  const calculateCompletionPercentage = (items) => {
    if (!items || items.length === 0) return 0; // Handle cases with no items
    const completedTasks = items.filter((item) => item.completed).length;
    return Math.round((completedTasks / items.length) * 100);
  };

  return (
    <>
      <div className="m-10 ">
        <Card className="w-[50vw]">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex justify-start items-center gap-4">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5 max-w-40">
                  <Label htmlFor="name">Exam Name</Label>
                  <Input id="name" 
                  placeholder="Name of your Exam" 
                  onChange = {(e)=>setExam(e.target.value)}
                  />
                  <p className="error">{inputErrors.exam}</p>
                </div>
                <div className="flex w-full gap-1.5"></div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <p className="error">{inputErrors.date}</p>
              </div>
              <div>
                <div>
                  <Label htmlFor="message">Syllabus</Label>
                  <Textarea
                    placeholder="Give your syllabus."
                    id="syllabus"
                    className="min-h-30 min-w-80 p-2 border rounded-md"
                    onChange={(e)=>setSyllabus(e.target.value)}
                  />
                  <p className="error">{inputErrors.syllabus}</p>
                </div>
                <div>
                  <Label htmlFor="message">Any Porsanilazation</Label>
                  <Textarea
                    placeholder="I prefer to study hard concepts first.... "
                    id="syllabus"
                    onChange={(e)=>setPreference(e.target.value)}
                  />
                  <p className="error">{inputErrors.preference}</p>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button onClick={()=>handleGetRoadMap}>Genarate RoadMap</Button>
            <button onClick={()=>handleGetRoadMap}> Genarate RoadMap</button>
          </CardFooter>
        </Card>
      </div>
      <Separator className="my-4" />

      <h1 className="text-3xl font-extrabold text-center">RoadMap</h1>
      <div className="m-10 flex flex-col justify-center items-center">
      {error ? <h1>{error}</h1> : null }


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
                    Week {week.weekNumber} - Completion:{" "}
                    {calculateCompletionPercentage(
                      week.days.flatMap((day) => day.tasks)
                    )}
                    %
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
                            {calculateCompletionPercentage(day.tasks)}%
                            Completed
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
        ) : (clicked===true  ?  <Load /> : null)
}
      </div>
    </>
  );
}

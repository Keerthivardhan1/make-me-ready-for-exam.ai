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
import Load from "../components/Load";
import RoadMap from "../components/RoadMap";

export default function page() {
  const [date, setDate] = React.useState();
  const [roadmap, setRoadmap] = useState({});
  const [error, setError] = useState();
  const [syllabus, setSyllabus] = useState();
  const [preference, setPreference] = useState();
  const [exam, setExam] = useState();

  const [inputErrors, setInputErrors] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [clicked , setclicked] = useState(false);

  const genarateRoadMap = async (e) => {
    e.preventDefault();
    console.log("clicked");
    if (!validate()) {
        return;
      }
    
      setError("");

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
      1. ****dont add like this  // ...  Add weeks 3-30 here.  Each week s
      2. ****no comments
      3. ****give me only json
      4. ****dont use // ... Add weeks 
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
        const localRoadMap =JSON.parse(localStorage.getItem("roadmap"));
        if(localRoadMap){
          setRoadmap(localRoadMap);
          console.log("roadmap = " , localRoadMap);
          
          return;
        }
        const response = await axios.post("http://localhost:8000/getData", {
          prompt,
        });
    
        // if (!response.ok) {
        //   thfrow new Error(`Error: ${response.statusText}`);
        // }


        console.log("res = ," , response );
        

    
        const data = await response.data; // Parse the JSON response
    
        setRoadmap(data); // Set the roadmap state with the response data
        localStorage.setItem("roadmap" , JSON.stringify(data));
        setIsLoading(false)
        setInputErrors({})
        console.log("data from api = ", data); // Log the response
      } catch (error) {
        console.log("error = ", error); // Log the error
        setIsLoading(false);
        setError("Unable to fetch the data from backend: ", error.message); // Set error state
      }
  };



  // useEffect(()=>setRoadmap(data) , []);

  const validate = () => {
    let errors = {}; // Temporary object to collect errors

    // Validate date
    if (!date) {
      errors.date = "Date is invalid";
    }

    // Validate syllabus
    if (!syllabus || syllabus.trim() === "") {
      errors.syllabus = "Syllabus is required";
    }

    // Validate preference
    if (!preference || preference.trim() === "") {
      errors.preference = "Preference is required";
    }

    // Validate exam
    if (!exam || exam.trim() === "") {
      errors.exam = "Exam details are required";
    }

    // Update inputErrors state with collected errors
    setInputErrors(errors);

    console.log("inputErrors : ", inputErrors);

    // Return a boolean indicating if the form is valid
    return Object.keys(errors).length === 0;
  };

  

  const updateRoadMap = (newRoadmap)=>{
    setRoadmap(newRoadmap)
  }

  const clearLocalRoadMap = ()=>{
    localStorage.removeItem("roadmap");
  }


  return (
    <div className="flex flex-col items-center">
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
        </Card>
        <div className="flex items-center p-2 gap-4"> 
        <button className="p-2 mt-2 bg-black rounded-md font-bold text-white" onClick={genarateRoadMap}>Genarate RoadMap</button>
        <button className="p-2 mt-2 bg-black rounded-md font-bold text-white" onClick={clearLocalRoadMap}>Clear RoadMap</button>
        </div>
      </div>
      {clicked && 
      (isLoading ? <Load/> : ( error ? <p className="text-red-600" >{error}</p> : <RoadMap roadmap={roadmap} updateRoadMap={updateRoadMap}/>))
      }

      
    </div>
  );
}


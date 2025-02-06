"use client"
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

export default function page() {
  const [date, setDate] = useState();
  const [error, setError] = useState();
  const [syllabus , setSyllabus] = useState();
  const [preference , setPreference] = useState();
  const [exam , setExam ] = useState();
  
  
  const [inputErrors , setInputErrors] = useState({});

  const handleClick = (e)=>{
    console.log("clicked");
    
  }
  
  return (
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
        <button className="p-2 mt-2 bg-black rounded-md font-bold text-white" onClick={handleClick}>Genarate RoadMap</button>
      </div>
  )
}

"use client"
import { useState } from 'react';

// Your function for generating data using GoogleGenerativeAI
const { GoogleGenerativeAI } = require("@google/generative-ai");

function extractJSON(text) {
    const jsonMatch = text.match(/{[\s\S]*}/); // Matches the first JSON object in the string
    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
}

const getData = async (prompt) => {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const len = result.response.text().length;
    console.log("res - ", result.response.text());
    
    const jsobj = extractJSON(result.response.text());
    console.log("result : ", jsobj);
    
    return jsobj;
}

export default function Home() {
    const [syllabus, setSyllabus] = useState('');
    const [examDate, setExamDate] = useState('');
    const [roadmap, setRoadmap] = useState(null);

    const handleGenerateRoadmap = async () => {
        const prompt = `
            Generate a roadmap for the following syllabus and exam date.
            Syllabus: ${syllabus}
            Exam Date: ${examDate}
            Provide the roadmap in JSON format for each week and each day, with tasks for each day having a corresponding checkbox, and show the completion percentage for each day, week, and overall plan.
            the data should be in this format and dont add any comments act like a node.js backend dont give me any extra text like "**Note:** if the total number of weeks are greater then 8 weeks then give me response of atleast 8 weeks  just give me object i am directly giving your response to JSON.parse() 
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
            ..
          ]
        },

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

        const data = await getData(prompt);
        setRoadmap(data);
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
        <div className="container">
            <h1>Roadmap Generator</h1>
            <div>
                <label htmlFor="syllabus">Syllabus:</label>
                <textarea
                    id="syllabus"
                    value={syllabus}
                    onChange={(e) => setSyllabus(e.target.value)}
                    rows="4"
                    placeholder="Enter your syllabus here"
                />
            </div>

            <div>
                <label htmlFor="examDate">Exam Date:</label>
                <input
                    type="date"
                    id="examDate"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                />
            </div>

            <button onClick={handleGenerateRoadmap}>Generate Roadmap</button>

            {roadmap && roadmap.weeks.map((week, weekIndex) => (
    <div key={weekIndex}>
        <h3>Week {week.weekNumber}</h3>
        <div>Completion: {calculateCompletionPercentage(week.days.flatMap(day => day.tasks))}%</div>
        <ul>
            {week.days.map((day, dayIndex) => (
                <li key={dayIndex}>
                    <h4>{day.date} - {calculateCompletionPercentage(day.tasks)}% Completed</h4>
                    <ul>
                        {day.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className='flex gap-3'>
                                {task.task}
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleCheckboxChange(weekIndex, dayIndex, taskIndex)}
                                />
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    </div>
))}

        </div>
    );
}

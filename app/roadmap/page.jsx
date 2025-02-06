"use client"
import React, { useEffect, useState } from 'react'
import { getData } from '../services/getData';
import RenderObj from '../utils/RenderObj';
import { ProgressContext } from '../context/progess';
const subjects = {
    "Computer Aptitude": [
      "Computer Basics",
      "Input/Output Devices",
      "Software & Hardware",
      "Networking",
      "Operating Systems",
      "Data Storage",
      "Internet & Basics",
      "MS Office",
      "Cyber Security"
    ],
    "English Language": [
      "Reading Comprehension",
      "Cloze Test",
      "Error Detection",
      "Sentence Improvement",
      "Phrase Replacement",
      "Para Jumbles",
      "Vocabulary",
      "Grammar"
    ],
    "General Awareness": [
      "Current Affairs (National & International)",
      "Banking Awareness",
      "Static GK (History, Geography, Polity, Economy)",
      "Financial Awareness"
    ],
    "Quantitative Aptitude": [
      "Simplification",
      "Approximation",
      "Number Series",
      "Data Interpretation (DI)",
      "Percentage",
      "Ratio and Proportion",
      "Profit and Loss",
      "Simple Interest and Compound Interest",
      "Time and Work",
      "Time, Speed and Distance",
      "Mensuration",
      "Average",
      "Problems on Ages",
      "Partnership",
      "Mixture and Alligation",
      "Permutation and Combination",
      "Probability"
    ],
    "Reasoning Ability": [
      "Analogy",
      "Classification",
      "Coding-Decoding",
      "Direction Sense",
      "Blood Relations",
      "Order and Ranking",
      "Puzzle",
      "Seating Arrangement",
      "Inequality",
      "Syllogism",
      "Input-Output",
      "Data Sufficiency"
    ]
  };


  const studyPlan = {
    Structure: {
      "Daily Time Allocation": "6-8 hours/day",
      "Practice-Based Subjects": "2-3 hours daily (e.g., Maths, DI, Reasoning)",
      "Reading-Based Subjects": "1-2 hours daily (e.g., Current Affairs, Banking Awareness)",
      "Conceptual/Light Subjects": "1-2 hours later in the plan (e.g., English, Static GK)",
      "Mock Tests": "1-2 hours (introduced after 2 weeks)",
      Revision: "Every Sunday (entire day's focus)",
      "Final Weeks": "Focus on full-length tests and high-yield areas"
    },
    plan: {
      week1: {
        Monday: {
          Practice: "Maths (1.5h), Reasoning (1.5h)",
          Reading: "Current Affairs (1h), Banking Awareness (1h)"
        },
        Tuesday: {
          Practice: "DI (1.5h), Reasoning (1.5h)",
          Reading: "Current Affairs (1h), Banking Awareness (1h)"
        },
        Wednesday: {
          Practice: "Maths (1.5h), DI (1.5h)",
          Reading: "Current Affairs (1h), Banking Awareness (1h)"
        },
        Thursday: {
          Practice: "Reasoning (2h), Maths Review (1h)",
          Reading: "Current Affairs (1h), Banking Awareness (1h)"
        },
        Friday: {
          Practice: "DI (2h), Reasoning Review (1h)",
          Reading: "Current Affairs (1h), Banking Awareness (1h)"
        },
        Saturday: {
          Practice: "Mixed Practice (2h)",
          Reading: "Current Affairs Review (1h)"
        },
        Sunday: {
          Revision: "Full Day Revision of Week 1 Topics"
        }
      },
      week2: {
        Monday: {
          Practice: "Maths (1.5h), Reasoning (1.5h)",
          Reading: "Current Affairs (1h), Banking Awareness (1h)"
        },
        Tuesday: {
          Practice: "DI (1.5h), Reasoning (1.5h)",
          Reading: "Current Affairs (1h), Banking Awareness (1h)"
        },
        Wednesday: {
          Practice: "Maths (1.5h), DI (1.5h)",
          Reading: "Current Affairs (1h), Banking Awareness (1h)"
        },
        Thursday: {
          Practice: "Mock Test (2h)",
          Reading: "Current Affairs (1h)"
        },
        Friday: {
          Practice: "Mock Test Analysis (2h)",
          Reading: "Banking Awareness (1h)"
        },
        Saturday: {
          Practice: "Mixed Practice (2h)",
          Reading: "Current Affairs Review (1h)"
        },
        Sunday: {
          Revision: "Full Day Revision of Week 2 Topics, including Mock Test"
        }
      },
      week3: {
        Monday: {
          Practice: "Maths (1.5h), Reasoning (1.5h)",
          Reading: "Current Affairs (1h), Banking Awareness (1h)",
          Conceptual: "English Grammar (1h)"
        },
        Tuesday: {
          Practice: "DI (1.5h), Reasoning (1.5h)",
          Reading: "Current Affairs (1h), Banking Awareness (1h)",
          Conceptual: "English Vocabulary (1h)"
        },
        Wednesday: {
          Practice: "Maths (1.5h), DI (1.5h)",
          Reading: "Current Affairs (1h), Banking Awareness (1h)",
          Conceptual: "Static GK (1h)"
        },
        Thursday: {
          Practice: "Mock Test (2h)",
          Reading: "Current Affairs (1h)"
        },
        Friday: {
          Practice: "Mock Test Analysis (2h)",
          Reading: "Banking Awareness (1h)"
        },
        Saturday: {
          Practice: "Mixed Practice (2h)",
          Reading: "Current Affairs Review (1h)"
        },
        Sunday: {
          Revision: "Full Day Revision of Week 3 Topics, including Mock Test"
        }
      },
      week4: {
        Monday: {
          Practice: "Maths (1.5h), Reasoning (1.5h)",
          Reading: "Current Affairs (1h), Banking Awareness (1h)",
          Conceptual: "English Grammar (1h)"
        },
        Tuesday: {
          Practice: "DI (1.5h), Reasoning (1.5h)",
          Reading: "Current Affairs (1h), Banking Awareness (1h)",
          Conceptual: "English Vocabulary (1h)"
        },
        Wednesday: {
          Practice: "Maths (1.5h), DI (1.5h)",
          Reading: "Current Affairs (1h), Banking Awareness (1h)",
          Conceptual: "Static GK (1h)"
        },
        Thursday: {
          Practice: "Mock Test (2h)",
          Reading: "Current Affairs (1h)"
        },
        Friday: {
          Practice: "Mock Test Analysis (2h)",
          Reading: "Banking Awareness (1h)"
        },
        Saturday: {
          Practice: "Mixed Practice (2h)",
          Reading: "Current Affairs Review (1h)"
        },
        Sunday: {
          Revision: "Full Day Revision of Week 4 Topics, including Mock Test"
        }
      },
      "week5-8": {
        description:
          "Continue with similar schedule, increasing mock test frequency and focusing on weak areas identified during tests. Gradually reduce dedicated practice time for subjects showing strong performance, allocating more time to weaker areas and full-length mock tests."
      }
    }
  };
  


  
export default function page() {
    const [data , setData] = useState(studyPlan);
    const [RMProgress , setRMProgress] = useState({});




    const updateRMProgress = (isChecked , keyProp)=>{
      if(keyProp.includes(":")){
        console.log( "kp : " ,  keyProp )
        let arr = keyProp.split(":");
        let k="";
        for(str of arr){
          k += str;
          if(isChecked){
            setRMProgress( prevState => ({
                ...prevState,
                [k] : prevState[k]?prevState[k]+1:1
            })
            )
        }else{
            setRMProgress( prevState => ({
                ...prevState,
                [k] : prevState[k]!=0?prevState[k]-1:0
            })
            )
        }

        }
      }else{

        if(isChecked){
            setRMProgress( prevState => ({
                ...prevState,
                [keyProp] : prevState[keyProp]?prevState[keyProp]+1:1
            })
            )
        }else{
            setRMProgress( prevState => ({
                ...prevState,
                [keyProp] : prevState[keyProp]!=0?prevState[keyProp]-1:0
            })
            )
        }
      }

      console.log("RMp : " ,  RMProgress);
      

    }


    useEffect(()=>{

      const processData = (res)=>{

      }
         
        const run = async ()=>{
            const prompt = `I am preparing for an exam with multiple subjects, some requiring regular practice, others requiring consistent daily reading and some that can be studied closer to the exam 

Create a comprehensive roadmap for 60 days that:

Prioritizes regular practice for subjects needing it.
Allocates time daily for reading-intensive subjects like Current Affairs.
Assigns lighter subjects or review topics for later in the plan.
Includes periodic revisions (e.g., weekly or every few days).
Suggests time blocks for practice, reading, and mock tests.
The plan should be actionable, with daily tasks broken down and Sundays reserved for revision and practice tests
like 
firstly structure and next starts plan which starts with week1, week2, week3, and soo on 
for example
{
        Structure:{
            Daily Time Allocation: (6-8 hours/day):
            Practice-Based Subjects: 2-3 hours daily (e.g., Maths, DI, Reasoning).
            Reading-Based Subjects: 1-2 hours daily (e.g., Current Affairs, Banking Awareness).
            Conceptual/Light Subjects: 1-2 hours later in the plan (e.g., English, Static GK).
            Mock Tests: 1-2 hours (introduced after 2 weeks).
            Revision: Every Sunday (entire day's focus).
            Final Weeks: Focus on full-length tests and high-yield areas.
        },
        plan:{
            week1 : { ...
            },
            week2 : {...
            }
        }

}

`
        const res = await  getData(prompt+"give only the json data no extra text letter i should directly convert into javascript object once again iam saying the responce should start with { and close with } thats it no more text out of it ")
        setData(res);

        console.log("new data ====== :" , data);
        

        }

        // run();
    },[])


    // useEffect(()=>console.log("data :::: " , data) , [data]);


  return (
    <div className='p-4'>
        <h1 className=' font-semibold' >RoadMap</h1>

         {
            Object.entries(data).map(([key, value]) => (
      
                <ProgressContext.Provider value={RMProgress} key={key}>
                  <RenderObj key={key} keyProp={key} valueProp={value} updateProgress={updateRMProgress} RoadMapKey={""+key} />
                 </ProgressContext.Provider>
              ))
        } 

    </div>
  )
}

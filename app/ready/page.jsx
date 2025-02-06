"use client"
import React, { useContext, useEffect, useState } from "react";
import { ProgressContext } from "../context/progess";
import Row from "../components/row";
import { SyllabusContext } from "../context/syllabusData";
import RenderObj from "../utils/RenderObj";

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
  


function page() {
    const [stdata,setstdata] = useState({});
    const [progress , setprogress] = useState({})

    
    function extractJSON(text) {
        const jsonMatch = text.match(/{[\s\S]*}/); // Matches the first JSON object in the string
        return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    }

    function updateProgress(isChecked , keyProp){
      if(isChecked){
        setprogress( prevState => ({
            ...prevState,
            [keyProp] : prevState[keyProp]?prevState[keyProp]+1:1
        })
        )
    }else{
        setprogress( prevState => ({
            ...prevState,
            [keyProp] : prevState[keyProp]!=0?prevState[keyProp]-1:0
        })
        )
    }
    }

    // useEffect(()=>{
    //     function getData() {
    //         const { GoogleGenerativeAI } = require("@google/generative-ai");
    //         async function run() {
    //           const genAI = new GoogleGenerativeAI(
    //             process.env.NEXT_PUBLIC_GOOGLE_KEY
    //           );
    //           const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
          
    //           const prompt =
    //             "iam preparing for sbi po , give me all topics in each subject hear is my syllabus in json format just give me json"
    //           const result = await model.generateContent(prompt);
    //           const len = result.response.text().length;
    //           console.log("res - " , result.response.text());
              
    //           const jsobj = extractJSON(result.response.text());
    //           setstdata(jsobj )
    //           console.log("result : ",jsobj);
    //           const jsonString  = JSON.stringify(stdata , null  , 2);
              
    
              
    //           return result.response.text();
    //         }
          
    //         const res = run();
    //         console.log(res);
    //       }

    //       getData();

    // },[])

    

  return <>
  <div className="p-4">
     {Object.entries(subjects).map(([key, value]) => (
      
        <ProgressContext.Provider value={progress} key={key}>
          <RenderObj key={key} keyProp={key} valueProp={value} updateProgress={updateProgress} />
        </ProgressContext.Provider>
      ))}

</div>
  
  </>;
}
export default page;



"use client"
import React, { useContext, useEffect, useState } from 'react'
import RenderList from './RenderList';
import { ProgressContext } from '../context/progess';
import Row from '../components/row';

function RenderObj({index,  keyProp, valueProp, updateProgress , RoadMapKey }) {
    // console.log("renderobj fun : " , keyProp);
    const progress = useContext(ProgressContext);
    const [processedValue, setProcessedValue] = useState([]);

    // useEffect(()=>{

    //   console.log("valueprop  : " , valueProp , "type = " , typeof(valueProp));
    // }, [])
    const [isChecked , setIsChecked] = useState(false)


    const handleCheckBoxChange = (e)=>{
        setIsChecked(e.target.checked)
    }

    useEffect(()=>{
        console.log("update progress : " , updateProgress);
        
        if(RoadMapKey && updateProgress) updateProgress(isChecked , RoadMapKey)
        else if(updateProgress) updateProgress(isChecked , keyProp);
    }, [isChecked])


    return (
      <div>
        <h2 className="px-1 py-0.5 rounded font-semibold">{keyProp } : {progress[keyProp]} : rmk:  {RoadMapKey}</h2>
        {(Array.isArray(valueProp))  ? (
          <RenderList list={valueProp}  keyProp={keyProp} updateProgress= {updateProgress}/>
        ) : typeof valueProp === "object" ? (
          Object.entries(valueProp).map(([subKey, subValue]) => (
            <RenderObj key={subKey} keyProp={subKey} valueProp={subValue} RoadMapKey={RoadMapKey+":"+subKey} />
          ))
        ) :  (
        //  <p>{(valueProp)}</p> // Display other types as string
         <li className="flex ">
        <p> {valueProp}</p>
           <input type="checkbox"  onChange={handleCheckBoxChange} />
        </li>
        
        ) }
      </div>
    );
  }

export default RenderObj
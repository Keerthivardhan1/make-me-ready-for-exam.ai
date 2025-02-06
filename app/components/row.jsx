import React, { useEffect, useState } from 'react'

function Row({index , ele , updateProgress , keyProp , RoadMapKey}) {
    const [isChecked , setIsChecked] = useState(false)


    const handleCheckBoxChange = (e)=>{
        setIsChecked(e.target.checked)
    }

    useEffect(()=>{
        console.log("update progress : " , updateProgress);
        if(RoadMapKey) updateProgress(isChecked , RoadMapKey)
        else updateProgress(isChecked , keyProp);
    }, [isChecked])
    return (
        <li key={index} className="flex justify-between ">
        <p> {ele}</p>
           <input type="checkbox"  onChange={handleCheckBoxChange} />
        </li>
    );
}

export default Row
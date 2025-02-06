import React, { useEffect } from 'react'
import Row from '../components/row';

function RenderList({ list , keyProp, updateProgress }) {
  // useEffect(()=>console.log("up : " , updateProgress) , []);
    return (
      <ol className="ml-4">
        {list.map((ele, index) => (
          <Row key={index} index={index} ele={ele} updateProgress={updateProgress} keyProp={keyProp} />
        ))}
      </ol>
    );
  }
export default RenderList
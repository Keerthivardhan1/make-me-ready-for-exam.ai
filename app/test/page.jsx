"use client"
import React, { useEffect } from 'react'
import RoadMapStore from '../store/RoadMapStore'
import RoadMap from '../components/RoadMap';

export default function page() {
    const { roadmap } = RoadMapStore();
    useEffect(()=>{
        console.log(roadmap)
    },[roadmap])
  return (
    <div>
        <RoadMap roadmap={roadmap} />
    </div>
  )
}

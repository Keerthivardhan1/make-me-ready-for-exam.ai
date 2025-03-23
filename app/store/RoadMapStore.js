import {create} from 'zustand'

const RoadMapStore = create((set)=>({
    roadmap : null,
    setRoadMap : (rm)=>set({roadmap : {...rm}})
}))

export default RoadMapStore;

import Link from "next/link"
  
export default function page() {
  return (
    <>
    <div>

    <div className=' mt-10 m-20 flex justify-center items-center h-[85vh] border-black rounded-md'>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-wide lg:text-9xl">
      Your <span className=" ">Mentor</span> <br></br> And <br></br> <span className=" text-orange-500">Study Companian</span> <br></br> is <span className="">Hear</span> . . . 
    </h1>
    </div>
  <ul className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-300 bg-opacity-50 backdrop-blur-md max-w-[30vw] dock font-extrabold text-2xl rounded-lg flex justify-between items-center p-4 gap-4">
    <li>About</li>
    <li>Notes</li>
    <li>Doc</li>
    <li>
      <Link href={"/r3"}>RoadMap</Link>
    </li>
  </ul>

    <div className="h-[90vh] bg-black flex items-center justify-center m-3 rounded-2xl">
    <h4 className="scroll-m-20 text-xl text-orange-500 font-semibold tracking-tight ">
      @Keerthivardhan
    </h4>
    </div>
    </div>

    </>
  )
}

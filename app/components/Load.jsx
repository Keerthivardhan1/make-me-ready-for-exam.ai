// import { Progress } from '@radix-ui/react-progress';
import React, { useState } from 'react'
import { Progress } from '@/components/ui/progress';

export default function Load() {
    const [progress , setProgress] = useState(0);

    React.useEffect(() => {
        setTimeout(()=>setProgress(30), 300)
        setTimeout(()=>setProgress(70), 500)
        const timer = setTimeout(() => setProgress(95), 800)
        return () => clearTimeout(timer)
      }, [])

  return (
    <Progress value={progress} className="w-[60%]" />
  )
}

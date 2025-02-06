import { Progress } from '@/components/ui/progress'
import React from 'react'

export default function TaskProgress({val}) {
  return (
    <Progress value={val} className="w-[100%]"/>
  )
}

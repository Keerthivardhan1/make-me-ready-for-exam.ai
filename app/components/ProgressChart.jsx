import React from 'react'
import { Chart, ChartJS} from 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2'



export default function ProgressChart({comp}) {


  return (
    <div>
        <Doughnut
        data={{
            labels:['Completed', "Left" ],
            datasets:[
                {
                    label:"Completed",
                    data:[comp,100-comp]
                }
            ]
        }}
        />
    </div>
  )
}

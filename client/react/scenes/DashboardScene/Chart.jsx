import React from 'react'
import { VictoryChart, VictoryBar, VictoryLabel } from 'victory'

export default ({data}) => (
    <VictoryChart
    domainPadding={50}
    height={200}
    scale="linear"
    padding={{ top: 20, bottom: 50, left: 50, right: 20 }}
    >
        <VictoryLabel text="Points Earned" transform="rotate(270)" x={-120} y={10}/>
        <VictoryBar data={data} labels={ d => d.y } barRatio={.9} />
        <VictoryLabel text="Level" x={225} y={190} />

    </VictoryChart>
)
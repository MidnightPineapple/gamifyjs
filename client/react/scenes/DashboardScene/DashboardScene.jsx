import React, { Fragment } from 'react'
import Chart from './Chart';
import PlayGameButton from './PlayGameButton'
import AssignmentTable from './AssignmentTable'
import contain from '../../ContentContainer'
import styles from './DashboardScene.css'
import { addDays } from 'date-fns'

const sampleData = [
    { x:1, y:2 }, 
    { x:2, y:3 }, 
    { x:3, y:5 }, 
    { x:4, y:6 }, 
    { x:5, y:20 }, 
]

const assignmentData = [
    { name: "Level 1", due: addDays(new Date(), 5) },
    { name: "Level 2", due: addDays(new Date(), 3) }
]

const DashboardScene = ({ history }) => (
    <Fragment>
        <Chart data={sampleData} />
        <div className={styles.segment}>
            <AssignmentTable assignments={assignmentData} />
            <PlayGameButton onClick={() => history.push('/game')} />
        </div>
    </Fragment>
)

export default contain(DashboardScene, { background:"#ddd", color:"#222" })
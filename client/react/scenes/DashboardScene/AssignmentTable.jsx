import React from 'react'
import { distanceInWordsToNow } from 'date-fns'
import styles from './AssignmentTable.css'

export default ({ assignments = [] }) => (
    <div className={styles.wrapper}>
        <h3 className={styles.label}>
            Recent Due Dates
        </h3>
        <table>
            <thead>
                <tr>
                    <th>Assignment</th>
                    <th>Due in</th>
                </tr>
            </thead>
            <tbody>
                {
                    assignments.map((a,k) => (
                        <tr key={k}>
                            <td>{ a.name }</td>
                            <td>{ distanceInWordsToNow(a.due) }</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
)
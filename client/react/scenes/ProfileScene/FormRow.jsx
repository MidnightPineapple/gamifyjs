import React, { useState } from 'react'
import styles from './FormRow.css'

export default ({ value, label, onSubmit }) =>{

    const [ editing, setEditing ] = useState(false)
    const [ input, setInput ] = useState("")

    return (
        <div className={styles.container}>
            { editing 
                ? <form onSubmit={(e) => { onSubmit(e); setEditing(false) }}>
                    <label>{label} </label>
                    <input type="text" value={input || value} onChange={e => setInput(e.target.value)} />
                </form>
                : <div onClick={() => setEditing(true)}>{label}: {value}</div>
            }
        </div>
    )
}
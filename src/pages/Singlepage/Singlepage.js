import React from 'react'
import { useParams } from 'react-router-dom'

function Singlepage() {

    let paramId = useParams().id

    return (
        <div style={{ padding: "50px" }}>
            <h1>Single page</h1>
            <h1>{paramId}</h1>
        </div>
    )
}

export default Singlepage
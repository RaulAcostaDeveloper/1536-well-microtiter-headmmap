import React from "react"

export const DownLoadATestFile = () => {
    return (
        <div>
            <h1>Download a compatible CSV</h1>
            <p>To test the headmap, use this file.csv and load it to the page</p>
            <p>
                <a href={`${process.env.PUBLIC_URL}/files/data.csv`} download>
                    Download CSV
                </a>
            </p>
        </div>
    )
}
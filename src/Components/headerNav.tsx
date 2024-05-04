import React from "react"
type Props = {
    setIsLoading: (togle: boolean) => void,
}
// This component controls the screen in the page /1536-well-microtiter
export const HeaderNav = ({ setIsLoading }: Props) => {
    return (
        <div className="HeaderNav">
            <span>Screens</span>
            <div>
                <button onClick={ ()=>setIsLoading(true) }>Loading</button>
                <button onClick={ ()=>setIsLoading(false) }>Visualization</button>
            </div>
        </div>
    )
}
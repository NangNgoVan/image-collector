import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button
} from 'react-bootstrap'

import React, { useEffect, Fragment } from 'react'

export function Step( {children} ) {
    return (
        <div>{ children }</div>
    )
}

export function Content({ children, activeStepIndex }) {
    return (
        children.map(child=>{
            if (child.props.forIndex == activeStepIndex) {
                return child;
            }
            return null;
        })
    )
}

export function Tab({ children }) {
    return (
        children
    )
}

export default function Stepper({ children, onStepIndexChanged, stepClickable=false, activeStepIndex }) {
    const steps = children.map((child, index) => 
        <Fragment key={child.props.id}>
            <div 
                style={{display: 'flex', gap: '0.5rem', color: index==activeStepIndex?'blue':'initial'}} 
                onClick={() => stepClickable==true?onStepIndexChanged(index, child.props.id):null}>
                <span>
                    <svg width="24" height="24">
                        <circle cx={12} cy={12} r={12} fill="gray"/>
                        <text x={12} y={12} 
                            textAnchor={"middle"}
                            dominantBaseline={"central"}>{index+1}</text>
                    </svg>
                </span>
                { child }
            </div>
            {(index!=children.length-1)?<div>-----------</div>:null}
        </Fragment>)

    return (
        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
            {
                steps
            }
        </div>
    )
}
"use client";

import CircularText from './CircularText'

export default function Circular() {
    return (
        <div>
            <CircularText
                text="مطعم*حضرموت*مشويات*الخليج"
                onHover="speedUp"
                spinDuration={20}
                className="custom-class"
            />
        </div>
    )
};
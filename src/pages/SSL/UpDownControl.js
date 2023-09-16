import React, { useState } from 'react';
import './UpDownControl.css';
const UpDownControl = ({ label, initialValue, onChange, minLimit, maxLimit }) => {
    const [upperLimit, setUpperLimit] = useState(initialValue + 5); // just an example, set it as you need
    const [lowerLimit, setLowerLimit] = useState(initialValue - 5);

    const adjustUpperLimit = (amount) => {
        const newLimit = upperLimit + amount;
        if (newLimit <= maxLimit && newLimit > initialValue) {
            setUpperLimit(newLimit);
            onChange({ upperLimit: newLimit, lowerLimit });
        }
    };

    const adjustLowerLimit = (amount) => {
        const newLimit = lowerLimit + amount;
        if (newLimit >= minLimit && newLimit < initialValue) {
            setLowerLimit(newLimit);
            onChange({ upperLimit, lowerLimit: newLimit });
        }
    };

    return (
        <div className="updown-control">
            <div className="current-value">{label}</div>
            <div className="upper-control">
                <button onClick={() => adjustUpperLimit(-1)}>-</button>
                <span>{upperLimit}</span>
                <button onClick={() => adjustUpperLimit(1)}>+</button>
            </div>
            <div className="updown-label current-value">{initialValue}</div>
            <div className="lower-control">
                <button onClick={() => adjustLowerLimit(-1)}>-</button>
                <span>{lowerLimit}</span>
                <button onClick={() => adjustLowerLimit(1)}>+</button>
            </div>
        </div>
    );
};

export default UpDownControl;
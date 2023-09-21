import React, {useState} from 'react';
import './UpDownControl.css';
import {Input} from "reactstrap";

function countUP(id, prev_data_attr) {
    id(prev_data_attr + 1);
}

function countDown(id, prev_data_attr) {
    id(prev_data_attr - 1);
}

const UpDownControl = ({label, initialValue, onChange, minLimit, maxLimit}) => {
    const [upperLimit, setUpperLimit] = useState(initialValue + 5); // just an example, set it as you need
    const [lowerLimit, setLowerLimit] = useState(initialValue - 5);
    // const [yellowCounter, setyellowCounter] = useState(5);
    // const [redCounter, setredCounter] = useState(5);
    const adjustUpperLimit = (amount) => {
        const newLimit = upperLimit + amount;
        if (newLimit <= maxLimit && newLimit > initialValue) {
            setUpperLimit(newLimit);
            onChange({upperLimit: newLimit, lowerLimit});
        }
    };

    const adjustLowerLimit = (amount) => {
        const newLimit = lowerLimit + amount;
        if (newLimit >= minLimit && newLimit < initialValue) {
            setLowerLimit(newLimit);
            onChange({upperLimit, lowerLimit: newLimit});
        }
    };

    return (
        <div className="updown-control">
            <div className="current-value">{label}</div>
            <div className="input-step step-danger">
                <button
                    type="button"
                    className="minus"
                    onClick={() => {
                        countDown(setUpperLimit, upperLimit);
                    }}
                >
                    –
                </button>
                <Input
                    type="number"
                    className="product-quantity"
                    value={upperLimit}
                    min="0"
                    max="100"
                    readOnly
                />
                <button
                    type="button"
                    className="plus"
                    onClick={() => {
                        countUP(setUpperLimit, upperLimit);
                    }}
                >
                    +
                </button>
            </div>
            <div className="updown-label current-value">{initialValue}</div>
            <div className="input-step step-warning">
                <button
                    type="button"
                    className="minus"
                    onClick={() => {
                        countDown(setLowerLimit, lowerLimit);
                    }}
                >
                    –
                </button>
                <Input
                    type="number"
                    className="product-quantity"
                    value={lowerLimit}
                    min="0"
                    max="100"
                    readOnly
                />
                <button
                    type="button"
                    className="plus"
                    onClick={() => {
                        countUP(setLowerLimit, lowerLimit);
                    }}
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default UpDownControl;
import {useEffect, useState} from "react";

const Counter = () => {
    const [counter, setCounter] = useState(10);

    useEffect(() => {
        const id = setInterval(() => {
            setCounter(c => c - 1);
        }, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div>{counter}</div>
    );
}

export default Counter;
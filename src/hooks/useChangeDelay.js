import { useEffect, useState } from "react";

function useChangeDelay(value, timeout) {
    const [newValue, setNewValue] = useState(value);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setNewValue(value);
        }, timeout);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [value]);
    return newValue;
}

export default useChangeDelay;

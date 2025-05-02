/* components/CountDown.jsx */

import React, { useState, useEffect } from "react";
import { Orbitron } from 'next/font/google'

const orbitron = Orbitron({ subsets: ['latin'] })

const CountdownTimer = ({ questionId, defaultTime = 45 }: { questionId: number, defaultTime: number }) => {
    const [timeRemaining, setTimeRemaining] = useState(defaultTime);

    useEffect(() => {
        setTimeRemaining(defaultTime);

        const countdownInterval = setInterval(() => {
            setTimeRemaining((curr) => {
                if (curr <= 0) {
                    return 0
                } else {
                    return curr - 1
                }
            });
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [questionId, defaultTime]);


    return (
        <div className="flex flex-1  flex-row items-center justify-center m-4">
            <div className={`${orbitron.className} text-6xl`}>
                {timeRemaining.toString()}
            </div>
        </div>
    );
};

export default CountdownTimer;

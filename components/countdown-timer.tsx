/* components/CountDown.jsx */

import React, { useState, useEffect } from "react";
import { Orbitron } from 'next/font/google'

const orbitron = Orbitron({ subsets: ['latin'] })

const CountdownTimer = ({ questionId, defaultTime = 30 }: { questionId: number, defaultTime: number }) => {
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

    const circumference = 2 * Math.PI * 45; // radius = 45
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (timeRemaining / defaultTime) * circumference;

    return (
        <div className="flex items-center justify-center">
            <div className="relative">
                <svg className="w-32 h-32 transform -rotate-90">
                    {/* Background circle */}
                    <circle
                        cx="64"
                        cy="64"
                        r="45"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="transparent"
                    />
                    {/* Progress circle */}
                    <circle
                        cx="64"
                        cy="64"
                        r="45"
                        stroke="#8b5cf6"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-linear"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`${orbitron.className} text-3xl font-bold text-gray-900`}>
                        {timeRemaining}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;

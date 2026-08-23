/* components/CountDown.jsx */

import React, { useState, useEffect } from "react";
import { Orbitron } from 'next/font/google'

const orbitron = Orbitron({ subsets: ['latin'] })

interface CountdownTimerProps {
  questionId: number;
  defaultTime: number;
  isPaused?: boolean;
}

const CountdownTimer = ({ questionId, defaultTime = 30, isPaused = false }: CountdownTimerProps) => {
    const [timeRemaining, setTimeRemaining] = useState(defaultTime);

    useEffect(() => {
        setTimeRemaining(defaultTime);
    }, [questionId, defaultTime]);

    useEffect(() => {
        if (isPaused) {
            return; // Don't start the interval if paused
        }

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
    }, [questionId, defaultTime, isPaused]);

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
                        stroke={isPaused ? "#6b7280" : "#8b5cf6"}
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-linear"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`${orbitron.className} text-3xl font-bold ${isPaused ? 'text-gray-500' : 'text-gray-900'}`}>
                        {timeRemaining}
                    </span>
                </div>
                {isPaused && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-gray-800 bg-opacity-75 rounded-full px-3 py-1">
                            <span className="text-white text-sm font-medium">PAUSED</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CountdownTimer;

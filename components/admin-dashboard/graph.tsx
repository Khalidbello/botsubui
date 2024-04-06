'use client';

import { useEffect, useRef } from "react";
import Chart from 'chart.js/auto'; // Import Chart from 'chart.js'

function Example() {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = document.getElementById('myChart').getContext('2d');

        // Destroy existing chart instance, if any
        if (chartRef.current !== null) {
            chartRef.current.destroy();
        }

        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                datasets: [{
                    data: [30, 40, 80, 40, 57, 25, 86],
                    label: "Profit",
                    borderColor: "rgb(155, 100, 20)",
                    backgroundColor: "rgb(255, 180, 100)",
                    borderWidth: 2
                }, {
                    data: [4, 8, 9, 3, 5, 5, 6],
                    label: "Initiated tranactions",
                    borderColor: "rgb(75, 192, 192)",
                    backgroundColor: "rgb(75, 192, 192,0.5)",
                    borderWidth: 2
                }
                ]
            },
        });
    }, []);


    return (
        <>
            <div className="flex mx-auto my-auto">
                <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl'>
                    <canvas id='myChart'></canvas>
                </div>
            </div>
        </>
    )
}

export default Example;

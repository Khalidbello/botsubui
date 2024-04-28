import { useEffect, useRef } from "react";
import Chart, { ChartConfiguration, ChartData, ChartOptions } from 'chart.js/auto'; // Import Chart from 'chart.js'


function Example({ dates, counts, profits }: { dates: string[], counts: number[], profits: number[] }) {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart<"bar", ChartData<"bar">, ChartOptions> | null>(null);

    useEffect(() => {
        plotter();
    });

    // function to plot graph
    const plotter = () => {
        const ctx = chartRef.current?.getContext('2d');

        if (ctx) {
            // Destroy existing chart instance, if any
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const config: ChartConfiguration<"bar"> = {
                type: 'bar',
                data: {
                    labels: dates,
                    datasets: [{
                        data: counts,
                        label: "number of transactions",
                        borderColor: "rgb(155, 100, 20)",
                        backgroundColor: "rgb(255, 180, 100)",
                        borderWidth: 2
                    }, {
                        data: profits,
                        label: "profits",
                        borderColor: "rgb(75, 192, 192)",
                        backgroundColor: "rgb(75, 192, 192,0.5)",
                        borderWidth: 2
                    }]
                },
            };

            chartInstance.current = new Chart(ctx, config);
        }

        return () => {
            // Cleanup on unmount
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    };


    return (
        <div className='min-h-[15rem] min-w-[30rem] w-full h-full my-auto border border-gray-400 pt-0 rounded-xl shadow-xl'>
            <canvas id='myChart' className="rounded-xl h-full w-full" ref={chartRef}></canvas>
        </div>
    )
}

export default Example;

import Graph from '@/components/admin-dashboard/graph';

export default function Earnings() {
    return (
        <div className="mt-16 px-6 mx-8 md:max-w-[80rem] md:mx-auto">
            <div className="font-semibold text-xl flex justify-between items-end">
                <span>Profit Trend</span>
                <span className="text-sm text-orange-400 ">last 10 days</span>
            </div>

            <div className="w-full p-6 rounded-xl bg-orange-50 mt-4">
                <Graph />
            </div>
        </div>
    )
}


/*const Graph: React.FC = () => {
    interface graphDataType {
        value: number;
        date: string;
    };

    const graphData: graphDataType[] = [
        {
            value: 400,
            date: 'feb-24-2024'
        },
        {
            value: 112,
            date: 'feb-24-2024'
        },
        {
            value: 100,
            date: 'feb-24-2024'
        },
        {
            value: 350,
            date: 'feb-24-2024'
        },
        {
            value: 300,
            date: 'feb-24-2024'
        },
        {
            value: 500,
            date: 'feb-24-2024'
        }
    ]
    const highestValue = 500;

    const barFormer = (ele: graphDataType, index: number) => {
        const height = ((ele.value) / highestValue) * 100;
        console.log('height.....................', height);
        return (
            <div key={index} className={`w-[8px] rounded-t-xl h-full flex flex-col items-center justify-end`}>
                <div className="font-semibold">{ele.value} {height}</div>
                <div className={`w-[8px] rounded-t-xl bg-orange-500 h-[${22.5}%]`}></div>
            </div>
        );
    }

    return (
        <div className="pl-0 pr-5 py-2 flex justify-center items-end h-full">
            <div className="text-right flex flex-col justify-between h-full w-[3rem]">
                <span className="text-orange-600"><span className="font-bold">($)</span>_</span>
                <span className="text-orange-600">_</span>
                <span className="text-orange-600">_</span>
                <span className="text-orange-600">_</span>
                <span className="text-orange-600">_</span>
            </div>
            <div className="border-orange-600  h-full border-l-[2px] border-b-[2px] w-[95%] flex items-end justify-evenly">
                {graphData.map(barFormer)}
            </div>
        </div>
    )
}*/
export default function Earnings() {
    return (
        <div className="mt-16 px-6 mx-8 md:max-w-[80rem] md:mx-auto">
            <div className="font-semibold text-xl flex justify-between items-end">
                <span>Earning Trend</span>
                <span className="text-sm text-orange-400 ">last 10 days</span>
            </div>

            <div className="w-full py-6 rounded-xl bg-orange-50 h-[20rem] mt-4">
                <Graph />
            </div>
        </div>
    )
}


const Graph: React.FC = () => {
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
                <div className="w-[8px] rounded-t-xl  h-[50%] flex flex-col items-center justify-end">
                    <div className="font-semibold">4050</div>
                    <div className="w-[8px] rounded-t-xl bg-orange-500 h-full"></div>
                </div>
                <div className="w-[8px] rounded-t-xl  h-[50%] flex flex-col items-center justify-end">
                    <div className="font-semibold">4050</div>
                    <div className="w-[8px] rounded-t-xl bg-orange-500 h-full"></div>
                </div>
                <div className="w-[8px] rounded-t-xl  h-[80%] flex flex-col items-center justify-end">
                    <div className="font-semibold">4050</div>
                    <div className="w-[8px] rounded-t-xl bg-orange-500 h-full"></div>
                </div>
                <div className="w-[8px] rounded-t-xl  h-[90%] flex flex-col items-center justify-end">
                    <div className="font-semibold">4050</div>
                    <div className="w-[8px] rounded-t-xl bg-orange-500 h-full"></div>
                </div>
                <div className="w-[8px] rounded-t-xl  h-[40%] flex flex-col items-center justify-end">
                    <div className="font-semibold">4050</div>
                    <div className="w-[8px] rounded-t-xl bg-orange-500 h-full"></div>
                </div>
                <div className="w-[8px] rounded-t-xl  h-[60%] flex flex-col items-center justify-end">
                    <div className="font-semibold">4050</div>
                    <div className="w-[8px] rounded-t-xl bg-orange-500 h-full"></div>
                </div>
                <div className="w-[8px] rounded-t-xl  h-[30%] flex flex-col items-center justify-end">
                    <div className="font-semibold">4050</div>
                    <div className="w-[8px] rounded-t-xl bg-orange-500 h-full"></div>
                </div><div className="w-[8px] rounded-t-xl  h-[45%] flex flex-col items-center justify-end">
                    <div className="font-semibold">4050</div>
                    <div className="w-[8px] rounded-t-xl bg-orange-500 h-full"></div>
                </div>
                <div className="w-[8px] rounded-t-xl  h-[75%] flex flex-col items-center justify-end">
                    <div className="font-semibold">4050</div>
                    <div className="w-[8px] rounded-t-xl bg-orange-500 h-full"></div>
                </div>
                <div className="w-[8px] rounded-t-xl  h-[95%] flex flex-col items-center justify-end">
                    <div className="font-semibold">4050</div>
                    <div className="w-[8px] rounded-t-xl bg-orange-500 h-full"></div>
                </div>
            </div>
        </div>
    )
}
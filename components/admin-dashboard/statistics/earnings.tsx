import Graph from '@/components/admin-dashboard/statistics/graph';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Earnings() {
    const [dataFetched, setDataFetched] = useState<boolean>(false);
    const [datas, setDatas] = useState<{ dates: string[], counts: number[], profits: number[] }>({ dates: [], counts: [], profits: [] });
    const [showError, setShowError] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        // fetch data
        fetch('http://localhost:8080/admin/trends/20')
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw 'something went wrong';
                }
            })
            .then((data) => {
                console.log('datas in earnings........................', data);
                setDatas({
                    dates: data.dates,
                    counts: data.numTrans,
                    profits: data.profits
                })
                setDataFetched(true);
            })
            .catch((err) => {
                setShowError(true);
                setDataFetched(true);
            });
    }, []);

    return (
        <div className="mt-16 px-2 md:px-6 mx-8 md:max-w-[80rem] md:mx-auto">
            <div className="font-semibold text-xl flex justify-between items-end">
                <span>Profit Trend</span>
                <span className="text-sm text-orange-400 ">last 10 days</span>
            </div>
            {showError ? (
                <div className="w-full p-2 md:p-6 rounded-xl bg-blue-50 mt-4 overflow-x-auto">
                    {dataFetched ? (
                        <Graph dates={datas.dates} counts={datas.counts} profits={datas.profits} />
                    ) : (
                        <div className="w-full text-center px-6 py-10 text-orange-600 text-2xl">Loading...</div>
                    )}
                </div>
            ) : (
                <div className='text-red-500 text-sm text-center'>Sorry an error occured <br /> pls try reloading page</div>
            )}

        </div>
    )
};
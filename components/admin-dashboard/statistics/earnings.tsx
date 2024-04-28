import Graph from '@/components/admin-dashboard/statistics/graph';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loader2 from '@/components/admin-dashboard/loader2';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export default function Earnings({ url, router }: { url: string | undefined; router: AppRouterInstance }) {
    const [dataFetched, setDataFetched] = useState<boolean>(false);
    const [datas, setDatas] = useState<{ dates: string[], counts: number[], profits: number[] }>({ dates: [], counts: [], profits: [] });
    const [showError, setShowError] = useState<boolean>(true);

    useEffect(() => {
        // fetch data
        fetch(`${url}/trends/20`, { credentials: 'include' })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 401) {
                    router.push('/admin-login');
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
                <span className="text-sm text-blue-400 ">last 10 days</span>
            </div>
            {showError ? (
                <div className="w-full min-h-[10rem] md:p-6 rounded-xl bg-blue-50 mt-4 overflow-x-auto">
                    {dataFetched ? (
                        <Graph dates={datas.dates} counts={datas.counts} profits={datas.profits} />
                    ) : (
                        <div className='mt-6'>
                            <Loader2 h='h-[4rem]' />
                        </div>
                    )}
                </div>
            ) : (
                <div className='text-red-500 text-sm text-center'>Sorry an error occured <br /> pls try reloading page</div>
            )}

        </div>
    )
};
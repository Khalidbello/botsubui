'use client';

import { useRouter } from 'next/navigation';
import { TransactionsFormer, mockdataType } from '@/components/admin-dashboard/statistics/transaction-stats/transactions-stats';
import { useEffect, useState } from 'react';

export default function ToDaysEarning() {
    const [dataFetched, setDataFetched] = useState<boolean>(false);
    const [datas, setDatas] = useState<mockdataType[]>([]); // Declare datas state variable
    const [showErrorOccured, setShowErrorOccured] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        // Fetch data from API
        fetch('http://localhost:8080/admin/todays-statisitics')
            .then(response => {
                if (response.status === 200) {
                    console.log(2000000000000000000000);
                    return response.json();
                } else if (response.status === 401) {
                    console.log('unauthorized access.....');
                }
            })
            .then(data => {
                const newData: mockdataType[] = [
                    {
                        title: 'Total transactions',
                        value: data.total,
                        type: 'total',
                    },
                    {
                        title: 'Successful transactions',
                        value: data.succcessful,
                        type: 'successful'
                    },
                    {
                        title: 'Pending transactions',
                        value: data.pending,
                        type: 'pending'
                    },
                    {
                        title: 'Todays profit',
                        value: data.profit,
                        type: '',
                    }
                ];
                console.log(newData);
                setDatas(newData); // Set the datas state variable with fetched data
                setDataFetched(true);
            })
            .catch(error => {
                console.log('an error occurred while trying to fetch data', error);
                setShowErrorOccured(true);
                setDataFetched(true);
            });
    }, []);

    return (
        <div className='mt-16 mx-6 rounded-lg shadow-md px-6 py-8 xl:max-w-[70rem] xl:mx-auto'>
            <div className='text-xl font-semibold'>Todays Earning</div>
            <div className='flex justify-around items-stretch flex-wrap gap-8 mt-8'>
                {dataFetched ? (
                    datas.map((ele, index) => <TransactionsFormer key={index} router={router} title={ele.title} value={ele.value} type={ele.type} />)
                ) : (
                    <div className="w-full text-center px-6 py-10 text-orange-600 text-2xl">Loading...</div>
                )}
                {showErrorOccured && <div className='text-center text-red-400'>Sorry and error occurred <br /> Please try reloading page </div>}
            </div>
        </div>
    );
}

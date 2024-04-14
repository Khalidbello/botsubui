'use client';

import { useEffect, useState } from "react";
import { TransactionsFormer, mockdataType } from "./transaction-stats/transactions-stats"
import { useRouter } from "next/navigation";

export default function Balances() {
    const [dataFetched, setDataFetched] = useState<boolean>(false);
    const [balances, setBalances] = useState<mockdataType[]>([]);
    const [showErrorOccured, setShowErrorOccured] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        //setTimeout(() => setDataFetched(true), 2000);
        fetch('http://localhost:8080/admin/balances')
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw 'something went wrong';
                }
            })
            .then((data) => {
                console.log('balaces data.................', data);
                const newData: mockdataType[] = [
                    {
                        title: 'Virtual Accounts Balance',
                        value: data.virtualAccountBalance,
                        type: 'total',
                    },
                    {
                        title: 'Platform Balance',
                        value: data.platformBalance,
                        type: 'total',
                    }
                ];

                setBalances(newData);
                setDataFetched(true);
            })
            .catch((error) => {
                console.log('an error occured........', error);
                setShowErrorOccured(true);
                setDataFetched(true);
            })
    }, []);

    return (
        <div className="mt-16 mx-6 rounded-lg shadow-md px-6 py-8 xl:max-w-[70rem] xl:mx-auto">
            <div className='font-semibold text-lg'>Balances</div>
            <div className="flex items-stretch justify-around mt-6 flex-wrap gap-8">
                {dataFetched ? (
                    balances.map((ele, index) => <TransactionsFormer key={index} router={router} title={ele.title} value={ele.value} type={ele.type} />)
                ) : (
                    <div className="w-full text-center px-6 py-10 text-orange-600 text-2xl">Loading...</div>
                )}
                {showErrorOccured && <div className='text-center text-red-400'>Sorry and error occurred <br /> Please try reloading page </div>}
            </div>
        </div>
    )
}

const mockdata: mockdataType[] = [
    {
        title: 'Virtual account',
        value: 4000,
        type: 'ifi'
    },
    {
        title: 'Platform balance',
        value: 5000,
        type: 'df'
    }
]
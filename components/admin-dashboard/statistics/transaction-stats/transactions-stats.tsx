'use client';

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import Loader2 from '@/components/admin-dashboard/loader2';


// Function to get the current date in YYYY-MM-DD format
const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
    const day = String(now.getDate()).padStart(2, '0'); // Add leading zero if needed
    return `${year}-${month}-${day}`;
};



// main componenet to export
interface mockdataType {
    title: string;
    value: number;
    type: string;
}

interface DateRangeType {
    startDate: string;
    endDate: string;
};

export default function Earnings({ url, router }: { url: string | undefined; router: AppRouterInstance }) {
    const [showError, setShowError] = useState<boolean>(false);
    const [data, setData] = useState<mockdataType[]>([]);
    const [dataFetched, setDataFetched] = useState<boolean>(false);
    const [dateRange, setDateRange] = useState<DateRangeType>({
        startDate: '2024-04-01',
        endDate: getCurrentDate()
    });
   
    useEffect(() => {
        setDataFetched(false);
        // Fetch data from API
        fetch(`${url}/statistics/${dateRange.startDate}/${dateRange.endDate}`, { credentials: 'include' })
            .then(response => {
                if (response.status === 200) {
                    console.log('in full statisitics.....................', 2000000000000000000000);
                    return response.json();
                } else if (response.status === 401) {
                    console.log('unauthorized access.....');
                    router.push('/admin-login');
                } else {
                    throw 'Something went wron trying to fetch statisics';
                }
            })
            .then(data => {
                const newData: mockdataType[] = [
                    {
                        title: 'Total transactions',
                        value: data.total,
                        type: ''
                    },
                    {
                        title: 'Total successful transactions',
                        value: data.succcessful,
                        type: ''
                    },
                    {
                        title: 'Total pending transactions',
                        value: data.pending,
                        type: ''
                    },
                    {
                        title: 'Total profit',
                        value: data.profit,
                        type: ''
                    },
                    {
                        title: 'Average transactiosns per day',
                        value: data.average,
                        type: ''
                    }
                ];
                setData(newData);
                setDataFetched(true);
            })
            .catch(error => {
                console.log('an error occurred while trying to fetch data', error);
                setDataFetched(true);
                setShowError(true);
            });
    }, [dateRange]);

    return (
        <div className="mt-16 mx-6 rounded-lg shadow-md px-6 py-8 xl:max-w-[70rem] xl:mx-auto">
            <div className='font-semibold text-lg flex justify-between items-start flex-wrap flex-col md:flex-row md:items-center'>
                <span>Transactions </span>
                <FilterComponent setDateRange={setDateRange} getCurrentDate={getCurrentDate} />
            </div>
            {showError ? (
                <div className="text-red-500 text-sm text-center">An error occured... <br /> please try reloading page</div>
            ) : (
                <div className="flex items-stretch justify-around mt-6 flex-wrap gap-8">
                    {
                        dataFetched ? (
                            data.map((ele: mockdataType, index: number) => <Another key={index} router={router} title={ele.title} value={ele.value} type={ele.type} />)
                        ) : (
                            <Loader2 h='h-[4rem]' />
                        )}
                </div>
            )
            }

        </div >
    )
};

interface TransactionsFormerProps {
    title: string;
    value: number;
    router: AppRouterInstance;
    type: string;
}


const TransactionsFormer: React.FC<TransactionsFormerProps> = ({ title, value, router, type }) => {

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.currentTarget.style.opacity = '0.4';
        router.push(`/admin/transactions/${type}`);
    }

    return (
        <div className="hover:shadow-orange-400 flex items-center bg-white shadow-md rounded-lg p-4">
            <div className="text-3xl text-orange-500 mr-4">{'oo'}</div>
            <div>
                <div className="text-2xl font-semibold">{value}</div>
                <div className="text-gray-600">{title}</div>
            </div>
        </div>
    )
};



const Another: React.FC<TransactionsFormerProps> = ({ title, value, router, type }) => {

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {

        event.currentTarget.style.opacity = '0.4';
        router.push(`/admin/transactions/${type}`);
    }

    return (
        <div className="hover:shadow-orange-400 flex flex-col bg-white shadow-md rounded-lg p-6">
            <div className="text-3xl text-orange-500 mb-4">{'icon'}</div>
            <div>
                <div className="text-lg font-semibold mb-1">{value}</div>
                <div className="text-gray-600 text-sm">{title}</div>
            </div>
        </div>
    )
};



// filter component

interface FilterComponentProp {
    setDateRange: React.Dispatch<React.SetStateAction<DateRangeType>>;
    getCurrentDate: Function;
}

const FilterComponent: React.FC<FilterComponentProp> = ({ setDateRange, getCurrentDate }) => {
    const [startDate, setStartDate] = useState('2024-04-01');
    const [endDate, setEndDate] = useState(getCurrentDate());

    const handleFilter = () => {
        // Perform validation if needed
        if (startDate && endDate) {
            // Send selected dates to the server
            setDateRange({
                startDate: startDate,
                endDate: endDate,
            });
        }
    };

    return (
        <div className="flex justify-start items-start flex-col md:flex-row md:items-center gap-x-4 gap-y-2 flex-wrap">
            <input
                type="date"
                value={startDate}
                max={getCurrentDate()} // Set current date as the maximum date
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
            />
            <span>to</span>
            <input
                type="date"
                value={endDate}
                max={getCurrentDate()} // Set current date as the maximum date
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
            />
            <button
                onClick={handleFilter}
                className="bg-blue-500 text-white px-6 py-1 rounded-full"
            >
                Filter
            </button>
        </div>
    );
};


export { TransactionsFormer, Another };
export type { mockdataType };

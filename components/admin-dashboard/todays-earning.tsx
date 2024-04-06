'use client';

import { useRouter } from 'next/navigation';
import { TransactionsFormer, mockdataType } from '@/components/admin-dashboard/transactions-stats';


export default function ToDaysEarning() {
    const router = useRouter();
    return (
        <div className='mt-16 mx-6 rounded-lg shadow-md px-6 py-8 md:max-w-[70rem] xl:mx-auto'>
            <div className='text-xl font-semibold'>Todays Earning</div>
            <div className='flex justify-around items-stretch flex-wrap gap-8 mt-8'>
                {mockdata.map((ele, index) => <TransactionsFormer key={index} router={router} title={ele.title} value={ele.value} type={ele.type} />)}
            </div>
        </div>
    )
}


const mockdata: mockdataType[] = [
    {
        title: 'Total transactions',
        value: 2300,
        type: 'total',
    },
    {
        title: 'SUccesfull transactions',
        value: 2250,
        type: 'successful'
    },
    {
        title: 'Pending transactions',
        value: 50,
        type: 'pending'
    },
    {
        title: 'Todays profit',
        value: 300,
        type: '',
    }
]
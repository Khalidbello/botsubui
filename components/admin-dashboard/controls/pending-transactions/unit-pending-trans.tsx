import { transactionType } from '@/components/admin-dashboard/controls/pending-transactions/pending-transaction-control';
import { useRef, useState } from 'react';


const UnitPending: React.FC<{ transaction: transactionType; url: string | undefined; }> = ({ transaction, url }) => {
    const [showSuccesful, setShowSuccesful] = useState<boolean>(false);
    const [showError, setShowError] = useState<string>('');
    const retryBt = useRef<HTMLButtonElement | null>(null);
    const settleBt = useRef<HTMLButtonElement | null>(null);

    const disableBt = () => {
        if (retryBt.current) retryBt.current.disabled = true;
        if (settleBt.current) settleBt.current.disabled = true;
    };

    const handleRetry = (transactionId: string, txRef: string) => {
        if (retryBt.current) retryBt.current.style.opacity = '0.4';

        fetch(`${url}/retry-transaction/${transactionId}/${txRef}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw 'an error occured trying to retry failed transaction';
                }
            })
            .then((datas) => {
                console.log('retry respnse........', datas);
                if (datas.status) {
                    setShowSuccesful(true);
                    setShowError('');
                    disableBt();
                } else {
                    setShowError('transation retry faild....')
                    setShowSuccesful(false);
                }
            })
            .catch(err => {
                console.log('error in retry unit transaction', err);
                setShowError('transaction failed....')
            })
            .finally(() => {
                if (retryBt.current) retryBt.current.style.opacity = '1';
            })
    }

    const handleSettle = (transactionId: string, senderId: string) => {
        if (settleBt.current) settleBt.current.style.opacity = '0.4';

        fetch(`${url}/settle-transaction/${transactionId}/${senderId}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw 'an error occured trying to settle failed transaction';
                }
            })
            .then((data) => {
                console.log('settle respnse........', data);
                if (data.status) {
                    setShowSuccesful(true);
                    setShowError('')
                    disableBt();
                } else {
                    setShowSuccesful(false);
                    setShowError('transaction settlement failed');
                }
            })
            .catch(err => {
                console.log('error in settle unit transaction', err);
                setShowError('transaction settlement failed');
            })
            .finally(() => {
                if (settleBt.current) settleBt.current.style.opacity = '1';
            })
    };

    return (
        <div key={transaction.id} className="bg-white rounded-lg shadow-md p-4 min-w-[20rem]">
            <p><strong>ID:</strong> {transaction.id}</p>
            <p><strong>Email:</strong> {transaction.email}</p>
            <p><strong>Reference:</strong> {transaction.txRef}</p>
            <p><strong>Product:</strong> {transaction.product}</p>
            <p><strong>SenderId:</strong> {transaction.senderId}</p>
            <p><strong>Amount:</strong> ${`xxx`}</p>
            <p><strong>Beneficiary:</strong> {transaction.beneficiary}</p>
            <p><strong>Date:</strong> {transaction.date}</p>

            {showSuccesful && <div className='text-green-500 text-sm pl-3 mt-3'>Transaction succesfully settled</div>}
            <div className='text-red-500 text-sm pl-3 mt-3'>{showError}</div>

            <div className="text-right space-x-4 mt-4">
                <button
                    ref={retryBt}
                    className="bg-blue-50 text-blue-600 px-6 py-2 rounded-full mr-2"
                    onClick={() => handleRetry(transaction.id, transaction.txRef)}
                >
                    Retry
                </button>
                <button
                    ref={settleBt}
                    className="bg-green-50 text-green-600 px-6 py-2 rounded-full mr-2"
                    onClick={() => handleSettle(transaction.id, transaction.senderId)}
                >
                    Settle
                </button>
            </div>
        </div>
    )
}

export default UnitPending;
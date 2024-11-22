'use client';

import { useEffect, useState } from "react";
import Loader2 from '@/components/admin-dashboard/loader2';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface networksType {
    name: string;
    active: boolean;
};

export default function DataNetworkStatus({ url, router }: { url: string | undefined; router: AppRouterInstance }) {
    const [networks, setNetworks] = useState<networksType[]>([]);
    const [showLoader, setShowLoader] = useState<boolean>(true);
    const [showError, setShowError] = useState<boolean>(false);

    const handleNetworkToggle = (e: React.MouseEvent<HTMLButtonElement>, index: number, network: string, active: boolean) => {
        e.currentTarget.style.opacity = '0.4';

        // Send a request to the server to activate or deactivate the network
        const postData = {
            // Data you want to send in the request body
            network,
            status: !active
        };
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', // Specify content type as JSON
                // Add any other headers if required
            },
            body: JSON.stringify(postData) // Convert JavaScript object to JSON string
        };

        fetch(`${url}/network-status`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', // Specify content type as JSON
                // Add any other headers if required
            },
            body: JSON.stringify(postData) // Convert JavaScript object to JSON string
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse response body as JSON
            })
            .then(data => {
                // Handle response data
                console.log('Response from server:', data);
                setShowLoader(true);
            })
            .catch(error => {
                // Handle errors
                console.error('Error in update network:', error);
                setShowError(true);
            });
    };

    useEffect(() => {
        // make fetch request to get datanetwork current statsu
        fetch(`${url}/network-status`, { credentials: 'include' })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw 'an error occured file fetching network status'
                };
            })
            .then((data) => {
                console.log(data['MTN'], data, 'data for net stats.......');
                setNetworks([
                    { name: 'MTN', active: data['MTN'] },
                    { name: 'Airtel', active: data['Airtel'] },
                    { name: 'Glo', active: data['Glo'] },
                    { name: '9mobile', active: data['9mobile'] }
                ]);
                setShowLoader(false);
            })
            .catch((err) => {
                console.log(err);
                setShowError(true);
                setShowLoader(false);
            })
    }, [showLoader, url]);

    return (
        <div className="mt-20 flex flex-col items-center justify-center h-auto rounded-xl px-6 py-4 shadow-md max-w-xl mx-4 md:mx-auto">
            <h2 className="text-xl font-semibold mb-4">Network Status</h2>
            {showError ? (
                <div className="text-sm text-red-500 text-center"> Sorry an error occured... <br /> pls try reloading page</div>
            ) : (
                showLoader ? (
                    <Loader2 h='h-[4rem]' />
                ) : (
                    <div className="flex items-center justify-center gap-x-8 gap-y-6  flex-wrap">
                        {networks.map((network, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <button
                                    className={`${network.active ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                                        } px-4 py-2 rounded-full`}
                                    onClick={(e) => handleNetworkToggle(e, index, network.name, network.active)}
                                >
                                    {network.name}
                                </button>
                                <div className={`w-4 h-4 rounded-full ${network.active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            </div>
                        ))
                        }
                    </div>
                )
            )}
        </div >
    );
};

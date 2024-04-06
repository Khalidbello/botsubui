'use client';

import React, { useRef, useState } from "react";

interface formDataTypes {
    username: string;
    password: string;
}

export default function Page() {
    const [showUserNameError, setShowUserNameError] = useState<boolean>(false);
    const [showPasswordError, setShowPasswordError] = useState<boolean>(false);
    const [showWrongCredentials, setShowWrongCredentials] = useState<boolean>(false);
    const [formData, updateFormdata] = useState<formDataTypes>({
        username: '',
        password: ''
    });
    const button = useRef<HTMLButtonElement | null>(null);

    const handleSubmit: React.FormEventHandler = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(formData);

        if (button.current) {
            button.current.style.opacity = '0.4';
            button.current.disabled = true;
        };

        // helper function
        const enableBt = () => {
            if (button.current) {
                button.current.style.opacity = '1';
                button.current.disabled = false;
            }
        }

        // form validation
        if (formData?.username) {
            if (formData?.password) {
                // submit form data for validation
                setTimeout(() => {
                    setShowWrongCredentials(true);
                    enableBt()
                }, 5000);
            } else {
                setShowPasswordError(true);
                enableBt()
            }
        } else {
            setShowUserNameError(true);
            enableBt();
        }
    };

    const userNameChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateFormdata({
            ...formData,
            username: event.currentTarget.value
        });
        setShowUserNameError(false);
        setShowWrongCredentials(false);
    };

    const passwordChanged: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateFormdata({
            ...formData,
            password: event.currentTarget.value
        });
        setShowPasswordError(false);
        setShowWrongCredentials(false);
    }

    return (
        <div className="flex justify-center items-center w-full h-full px-6 bg-gray-100">
            <form onSubmit={handleSubmit} className="rounded-xl bg-white px-4 pt-12 pb-4 min-w-[20rem] max-w-[24rem]">
                <div className="text-center mb-6"> <span className="px-4 py-2 rounded-xl bg-orange-600 text-white font-semibold">BotSub Admin</span></div>
                <div className="mt-8 mb-2 px-5"><label htmlFor="userName">Username</label></div>
                <input type="text" placeholder="username" name='userName' onChange={userNameChange} className="w-full border-[2px] border-gray-100 rounded-full px-4 py-2" />
                {showUserNameError && <div className="px-4 text-sm text-red-500">username cannot be empty</div>}

                <div className="mt-8 mb-2 px-5"><label htmlFor="passsword">Paasword</label></div>
                <input type="text" placeholder="password" name='userName' onChange={passwordChanged} className="w-full border-[2px] border-gray-100 rounded-full px-4 py-2" />
                {showPasswordError && <div className="px-4 text-sm text-red-500">username cannot be empty</div>}

                {showWrongCredentials && <div className="my-8 text-center px-6 text-sm text-red-500">user or password is incorrect ls double check and try again</div>}

                <div className="text-right mt-10"> <button ref={button} type="submit" className="text-orange-600 bg-orange-100 px-8 py-2 rounded-full"> login </button> </div>
            </form>
        </div>
    )
}
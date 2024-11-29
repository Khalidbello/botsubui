"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface formDataTypes {
  username: string;
  password: string;
}

export default function Page() {
  const router = useRouter();

  const [showUserNameError, setShowUserNameError] = useState<boolean>(false);
  const [showPasswordError, setShowPasswordError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setShowError] = useState<string>("");
  const [showLoggedIn, setShowLoggedIn] = useState<string>("");
  const [formData, updateFormdata] = useState<formDataTypes>({
    username: "",
    password: "",
  });
  const passwordVisibilityRef = useRef<HTMLButtonElement | null>(null);
  const url: string | undefined = process.env.NEXT_PUBLIC_URL;

  const button = useRef<HTMLButtonElement | null>(null);

  const handleSubmit: React.FormEventHandler = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    console.log(formData);
    const host = url;

    if (button.current) {
      button.current.style.opacity = "0.4";
      button.current.disabled = true;
    }

    // helper function
    const enableBt = () => {
      if (button.current) {
        button.current.style.opacity = "1";
        button.current.disabled = false;
      }
    };

    // form validation
    if (formData?.username) {
      if (formData?.password) {
        try {
          const response = await fetch(`${host}/login`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userName: formData.username.trim(),
              password: formData.password.trim(),
            }),
          });

          if (response.status === 200) {
            setShowLoggedIn("Logged in succeesfully");
            setShowError("");
            console.log(response.headers);
            const data = await response.json();
            console.log(data);
            router.push("/admin");
          } else if (response.status === 401) {
            setShowError("Login credentials not correct..");
          } else {
            setShowError("Something went wrong please try again.");
          }
        } catch (error) {
          setShowError("Something went wrong please try again.");
        } finally {
          enableBt();
        }
      } else {
        setShowPasswordError(true);
        enableBt();
      }
    } else {
      setShowUserNameError(true);
      enableBt();
    }
  };

  const userNameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateFormdata({
      ...formData,
      username: event.currentTarget.value,
    });
    setShowUserNameError(false);
  };

  const passwordChanged: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateFormdata({
      ...formData,
      password: event.currentTarget.value,
    });
    setShowPasswordError(false);
  };

  const handlePasswordVisiblity = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center w-full h-full px-6 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="rounded-xl bg-white px-4 pt-12 pb-4 min-w-[20rem] max-w-[24rem]"
      >
        <div className="text-center mb-6">
          {" "}
          <span className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold">
            BotSub Admin
          </span>
        </div>
        <div className="mt-8 mb-2 px-5">
          <label htmlFor="userName">Username</label>
        </div>
        <input
          type="text"
          placeholder="username"
          name="userName"
          onChange={userNameChange}
          className="w-full border-[2px] border-gray-100 rounded-full px-4 py-2"
        />
        {showUserNameError && (
          <div className="px-4 text-sm text-red-500">
            username cannot be empty
          </div>
        )}

        <div className="mt-8 mb-2 px-5">
          <label htmlFor="passsword">Paasword</label>
        </div>
        <div className="flex items-center justify-between mb-6 w-full border-gray-100 border-[1px] rounded-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            name="userName"
            onChange={passwordChanged}
            className="w-full border-[2px] rounded-full px-4 py-2"
          />
          <button
            ref={passwordVisibilityRef}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handlePasswordVisiblity();
            }}
            className="w-10 h-full"
          >
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              className="w-4 h-5"
            />
          </button>
        </div>
        {showPasswordError && (
          <div className="px-4 text-sm text-red-500">
            username cannot be empty
          </div>
        )}
        <div className="text-green-400 text-center py-2">{showLoggedIn}</div>
        <div className="my-8 text-center px-2 text-sm text-red-500">
          {error}
        </div>

        <div className="text-right mt-10">
          {" "}
          <button
            ref={button}
            type="submit"
            className="text-blue-600 bg-blue-100 px-8 py-2 rounded-full"
          >
            {" "}
            login{" "}
          </button>{" "}
        </div>
      </form>
    </div>
  );
}

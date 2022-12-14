import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import useAuth from "../hooks/useAuth";

interface Inputs {
  email: string;
  password: string;
}

const Login = () => {
  const [login, setLogin] = useState(false);
  const { signIn, signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col md:items-center md:justify-center">
      <Head>
        <title>Netflix </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      <div className="absolute left-2 top-1 h-20 w-44 cursor-pointer md:left-8 md:top-4">
        <Image src="https://rb.gy/ek4j9f" layout="fill" objectFit="contain" />
      </div>
      <Toaster position="bottom-center" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded md:bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              defaultValue="guest@gmail.com"
              placeholder="Email"
              className={`input`}
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-sm text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              defaultValue="123456"
              className={`input `}
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-sm text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>
        <div className="space-y-4">
          <button
            className="w-full rounded bg-white text-gray-900 py-3 mb-0 font-semibold"
            type="submit"
            onClick={() => setLogin(true)}
          >
            Login as Guest
          </button>
          <button
            className="w-full rounded bg-[#E50914] py-3 font-semibold"
            type="submit"
            onClick={() => setLogin(true)}
          >
            Sign In
          </button>
        </div>
        <div className="text-[gray]">
          New to Netflix?{" "}
          <button
            className="cursor-pointer text-white hover:underline"
            type="submit"
            onClick={() => setLogin(false)}
          >
            Sign up now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

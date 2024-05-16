import { useState } from "react";

function Test() {
   const handleRegistration = (e) => {
      e.preventDefault();
   };

   return (
      <div className="flex min-h-screen items-center justify-center px-4">
         <div className="flex w-full flex-col items-center py-10 sm:justify-center">
            <div className="w-full max-w-sm rounded-md  bg-white px-6 py-6 shadow-md dark:bg-gray-900 sm:rounded-lg">
               <form action="" onSubmit={handleRegistration} className="group">
                  <div>
                     <label
                        htmlFor="fullName"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                     >
                        Full Name
                     </label>
                     <div className="flex flex-col items-start">
                        <input
                           type="text"
                           name="fullName"
                           placeholder="Full Name"
                           className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                           pattern="[0-9a-zA-Z ]{6,}"
                           required
                           onChange={(e) => {}}
                        />
                     </div>
                  </div>
                  <div className="mt-4">
                     <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                     >
                        Email
                     </label>
                     <div className="flex flex-col items-start">
                        <input
                           type="email"
                           name="email"
                           placeholder="Email"
                           className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                           autoComplete="off"
                           required
                           pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                           onChange={(e) => {}}
                        />
                        <span className="mt-1 hidden text-sm text-red-400">
                           Please enter a valid email address.{" "}
                        </span>
                     </div>
                  </div>
                  <div className="mt-4">
                     <label
                        htmlFor="country"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                     >
                        Select your country
                     </label>
                     <select
                        id="country"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500"
                        onChange={(e) => {}}
                     ></select>
                  </div>

                  <div className="mt-4">
                     <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                     >
                        Password
                     </label>
                     <div className="flex flex-col items-start">
                        <input
                           type="password"
                           name="password"
                           placeholder="Password"
                           className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                           autoComplete="off"
                           required
                           pattern="[0-9a-zA-Z]{8,}"
                           onChange={(e) => {}}
                        />
                        <span className="mt-1 hidden text-sm text-red-400">
                           Password must be at least 8 characters.{" "}
                        </span>
                     </div>
                  </div>
                  <div className="mt-4">
                     <label
                        htmlFor="password_confirmation"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                     >
                        Confirm Password
                     </label>
                     <div className="flex flex-col items-start">
                        <input
                           type="password"
                           name="password_confirmation"
                           placeholder="Confirm password"
                           className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                           autoComplete="off"
                           required
                           pattern="[0-9a-zA-Z]{8,}"
                           onChange={(e) => {}}
                        />
                        <span className="mt-1 hidden text-sm text-red-400">
                           Password must be at least 8 characters.{" "}
                        </span>
                     </div>
                  </div>
                  <a
                     href="#"
                     className="pt-1 text-xs text-purple-600 hover:text-purple-800 hover:underline dark:text-purple-300 dark:hover:text-purple-100"
                  >
                     Forget Password?
                  </a>
                  <div className="mt-4 flex items-center">
                     <button
                        type="submit"
                        className="mt-2 w-full rounded-lg bg-purple-700 px-5 py-3 text-center text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus:ring-1 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-gradient-to-br disabled:from-gray-100 disabled:to-gray-300 disabled:text-gray-400 group-invalid:pointer-events-none group-invalid:bg-gradient-to-br group-invalid:from-gray-100 group-invalid:to-gray-300 group-invalid:text-gray-400 group-invalid:opacity-70"
                     >
                        Create account
                     </button>
                  </div>
               </form>
               <div className="text-md mt-4 text-zinc-600 dark:text-zinc-300">
                  Already have an account?{" "}
                  <span>
                     <a
                        className="text-purple-600 hover:text-purple-800 hover:underline dark:text-purple-400 dark:hover:text-purple-100"
                        href="#"
                     >
                        Login instead
                     </a>
                  </span>
               </div>
               <div className="my-4 flex w-full items-center">
                  <hr className="my-8 h-px w-full border-0 bg-gray-200 dark:bg-gray-700" />
                  <p className="px-3 ">OR</p>
                  <hr className="my-8 h-px w-full border-0 bg-gray-200 dark:bg-gray-700" />
               </div>
               <div className="my-6 space-y-2"></div>
            </div>
            <div className="mt-6 flex items-center justify-center ">
               <a
                  href="https://github.com/realstoman/tailwind-form-validations"
                  target="__blank"
                  className="cursor-pointer text-xl text-gray-700 underline hover:text-gray-900"
               >
                  Github repo
               </a>
            </div>
         </div>
      </div>
   );
}

export default Test;

"use client";

import React from "react";
import {useAuth} from "@/src/components/auth/AuthProvider";

export default function RegisterForm() {

  const {handleRegister, setUsername, setPassword, setConfirmPassword, setEmail, isLoadingLocal} = useAuth();

  return (
    <form method="POST" className="space-y-6" onSubmit={handleRegister}>
      <div>
        <label htmlFor="username" className="block text-sm font-medium leading-6">
          Username
        </label>
        <div className="mt-2">
          <input
            id="username"
            name="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
            className="block w-full rounded-md border-0 text-gray-900 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6">
          Email
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="block w-full rounded-md border-0 text-gray-900 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium leading-6">
          Password
        </label>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            className="block w-full rounded-md border-0 text-gray-900 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6">
          Confirm Password
        </label>
        <div className="mt-2">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
            className="block w-full rounded-md border-0 text-gray-900 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoadingLocal}
          className="flex justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isLoadingLocal ? <div
              className="spinner-border animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div> :
            "Register"}
        </button>
      </div>
    </form>
  )
}
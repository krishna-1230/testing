import React from "react";

export default function BecomeAMerchant() {
  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen">
      <header className="w-full flex justify-center py-6">
        <div className="flex items-center space-x-3">
          
          <h1 className="text-xl font-semibold">Become a Merchant</h1>
        </div>
      </header>

      <main className="flex flex-col md:flex-row md:justify-center items-center w-full max-w-4xl px-4 py-10 bg-white shadow-md rounded-md">
        {/* Form Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-bold mb-4">Welcome to Outfit Fashions</h2>
          <p className="text-gray-600 mb-6">Create your account to start selling</p>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm mb-1">Enter Mobile Number</label>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter Mobile Number"
                  className="border border-gray-300 rounded-l-md p-2 flex-grow focus:ring focus:ring-blue-200"
                />
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-md">Send OTP</button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-1">Enter OTP</label>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-1">Email ID</label>
              <input
                type="email"
                placeholder="Email Id"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-1">GSTIN</label>
              <input
                type="text"
                placeholder="GSTIN"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-1">Set Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Set Password"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
                />
                <span className="absolute right-3 top-2.5 cursor-pointer text-gray-500">Show</span>
              </div>
            </div>

            <button className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700">
              Create Account
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">or</p>
            <a href="/merchant/login" className="text-blue-500 text-sm hover:underline">
              Already a user? Login
            </a>
          </div>
        </div>

        {/* Illustration Section */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0 flex flex-col items-center space-y-4">
          <img
            src="/merchant/mer_reg1.jpg"
            alt="Placeholder 1"
            className="w-2/3 md:w-3/4 object-contain"
          />
          <img
            src="/merchant/mer_reg2.jpg"
            alt="Placeholder 2"
            className="w-2/3 md:w-3/4 object-contain"
          />
        </div>
      </main>

      <footer className="w-full max-w-4xl px-4 mt-6">
        <p className="text-gray-600 text-sm">
          <strong>Note:</strong>
        </p>
        <ul className="text-gray-600 text-sm list-disc ml-5">
          <li>Your product will be monitored and reviewed by the Admins</li>
          <li>Your product will be monitored and reviewed by the Admins</li>
        </ul>
      </footer>
    </div>
  );
}

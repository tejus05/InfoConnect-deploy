import React from 'react'
import { Input, Output } from '../components'
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div>
      <div className="p-6 mt-5 w-full flex flex-col justify-center px-[120px]">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to our streamlined e-portal service dedicated to simplifying
          government procedures for our users. Explore our comprehensive
          services in different sections:
        </h1>
        <div className="text-[19px]">
          <table className="border-collapse w-full">
            <tbody>
              <tr className="border-b">
                <td className="p-2">
                  <Link
                    to="/process"
                    className="text-white hover:opacity-90 duration-200 bg-blue-900 max-w-[200px] w-full text-center rounded-lg px-3 py-1 inline-block"
                  >
                    Process
                  </Link>
                </td>
                <td className="p-2">
                  Access detailed guidelines and step-by-step instructions for
                  seamless navigation through various governmental procedures.
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-2">
                  <Link
                    to="/documents"
                    className="text-white hover:opacity-90 duration-200 bg-blue-900 max-w-[200px] w-full text-center rounded-lg px-3 py-1 inline-block"
                  >
                    Documents
                  </Link>
                </td>
                <td className="p-2">
                  Find essential and downloadable documents required for
                  different processes, ensuring convenience and accessibility.
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-2">
                  <Link
                    to="/fees"
                    className="text-white hover:opacity-90 duration-200 bg-blue-900 max-w-[200px] w-full text-center rounded-lg px-3 py-1 inline-block"
                  >
                    Fees
                  </Link>
                </td>
                <td className="p-2">
                  Understand the fee structures associated with different
                  governmental services, ensuring transparency and clarity in
                  financial aspects.
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-2">
                  <Link
                    to="/handbook"
                    className="text-white hover:opacity-90 duration-200 bg-blue-900 max-w-[200px] w-full text-center rounded-lg px-3 py-1 inline-block"
                  >
                    Handbook
                  </Link>
                </td>
                <td className="p-2">
                  Access a comprehensive guidebook providing in-depth
                  information and insights into governmental processes,
                  facilitating informed decision-making and smoother
                  transactions.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-[30px]"></div>
      <Output target="Home" />
      <div className="mb-[150px]"></div>
      <Input placeholder="Hello! I'm here to assist you." target="Home" />
    </div>
  );
}

export default Home

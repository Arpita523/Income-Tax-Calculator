import React, { useState } from "react"

const Headers = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedYear, setSelectedYear] = useState("FY 2023-2024")
  const years = ["FY 2023-2024", "FY 2022-2023", "FY 2021-2022", "FY 2020-2021"]

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  const handleYearSelect = (year) => {
    setSelectedYear(year)
    setIsOpen(false)
  }

  return (
    <div>
      <div className="flex flex-row  pl-14 mx-auto w-full pt-2 px-6 lg:px-8 items-center">
        <img
          src="logo.png" // Replace with the actual path to your logo.png
          alt="Income Tax Calculator Logo"
          className="relative ml-5 mt-5 top-0 left-0 h-11 w-20 object-contain" // Adjust size as needed
        />
        <div className="flex-1">
          {" "}
          {/* Use flex-1 to take up available space */}
          <h6 className="mt-4  text-sm font-bold tracking-tight sm:text-3xl">
            Income Tax Calculator
          </h6>
          <p className="mt-1 text-lg leading-8 text-white-300">
            Select financial year, Add income details & eligible deductions to
            calculate your Income Tax liability under the Old & New Tax Regime.
          </p>
        </div>

        <div className=" bg-white-100 relative inline-block text-left">
          <button
            id="dropdown-button"
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-grey-500"
            onClick={toggleDropdown}
          >
            {selectedYear}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div
            id="dropdown-menu"
            className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
              isOpen ? "" : "hidden"
            }`}
          >
            <div
              className="py-2 p-2"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdown-button"
            >
              {years.map((year) => (
                <a
                  key={year}
                  className="flex  rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
                  role="menuitem"
                  onClick={() => handleYearSelect(year)}
                >
                  {year}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Headers

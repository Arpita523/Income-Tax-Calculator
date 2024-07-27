import React, { useState, useRef, useEffect } from "react"

const IncomeDetails = ({ activeTab, onNext, formData, onInputChange }) => {
  const [cityType, setCityType] = useState("Metro")
  const [isOpenSalary, setIsOpenSalary] = useState(false)
  const [isOpenProperty, setIsOpenProperty] = useState(false)
  const [isOpenCapitalGain, setIsOpenCapitalGain] = useState(false)
  const [isOpenProfession, setIsOpenProfession] = useState(false)
  const [isOpenOtherIncomes, setIsOpenOtherIncomes] = useState(false)

  const contentRefSalary = useRef(null)
  const contentRefProperty = useRef(null)
  const contentRefCapitalGain = useRef(null)
  const contentRefProfessionIncome = useRef(null)
  const contentRefOtherIncomes = useRef(null)

  const handleCityType = (event) => {
    setCityType(event.target.value)
  }

  const toggleContentSalary = () => {
    setIsOpenSalary(!isOpenSalary)
  }

  const toggleContentProperty = () => {
    setIsOpenProperty(!isOpenProperty)
  }
  const toggleCapitalGains = () => {
    setIsOpenCapitalGain(!isOpenCapitalGain)
  }
  const toggleProfessionIncome = () => {
    setIsOpenProfession(!isOpenProfession)
  }
  const toogleOtherIncomes = () => {
    setIsOpenOtherIncomes(!isOpenOtherIncomes)
  }

  const handleNextButton = () => {
    if (isOpenSalary) {
      setIsOpenSalary(false)
      setIsOpenProperty(true)
    } else if (isOpenProperty) {
      setIsOpenProperty(false)
      setIsOpenCapitalGain(true)
    } else if (isOpenCapitalGain) {
      setIsOpenCapitalGain(false)
      setIsOpenProfession(true)
    } else if (isOpenProfession) {
      setIsOpenProfession(false)
      setIsOpenOtherIncomes(true)
    } else if (isOpenOtherIncomes) {
      // Last table, call onNext to switch to the next tab
      onNext()
    }
  }

  useEffect(() => {
    if (contentRefSalary.current) {
      contentRefSalary.current.style.maxHeight = isOpenSalary
        ? `${contentRefSalary.current.scrollHeight}px`
        : "0"
    }
    if (contentRefProperty.current) {
      contentRefProperty.current.style.maxHeight = isOpenProperty
        ? `${contentRefProperty.current.scrollHeight}px`
        : "0"
    }
    if (contentRefCapitalGain.current) {
      contentRefCapitalGain.current.style.maxHeight = isOpenCapitalGain
        ? `${contentRefCapitalGain.current.scrollHeight}px`
        : "0"
    }
    if (contentRefProfessionIncome.current) {
      contentRefProfessionIncome.current.style.maxHeight = isOpenProfession
        ? `${contentRefProfessionIncome.current.scrollHeight}px`
        : "0"
    }
    if (contentRefOtherIncomes.current) {
      contentRefOtherIncomes.current.style.maxHeight = isOpenOtherIncomes
        ? `${contentRefOtherIncomes.current.scrollHeight}px`
        : "0"
    }
  }, [
    isOpenSalary,
    isOpenProperty,
    isOpenCapitalGain,
    isOpenProfession,
    isOpenOtherIncomes,
  ])

  const handleChange = (section, field, value) => {
    onInputChange(2, section, field, value)
  }

  // Function to get circle check SVG based on filled status
  const getCircleCheckSVG = (isFilled) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="20"
      height="20"
      viewBox="0 0 120 120"
    >
      <circle cx="60" cy="64" r="48" opacity=".35"></circle>
      <circle
        cx="60"
        cy="60"
        r="48"
        fill={isFilled ? "#44bf00" : "#000"}
      ></circle>
      <polygon
        points="53.303,89 26.139,61.838 33.582,54.395 53.303,74.116 86.418,41 93.861,48.443"
        opacity=".35"
      ></polygon>
      <polygon
        fill="#fff"
        points="53.303,84 26.139,56.838 33.582,49.395 53.303,69.116 86.418,36 93.861,43.443"
      ></polygon>
    </svg>
  )

  return (
    <div
      className={`transition-all duration-300 bg-white p-4 rounded-lg ${
        activeTab === 2 ? "block" : "hidden"
      }`}
    >
      <div className=" bg-white-50 py-6 flex flex-col items-center justify-center relative overflow-hidden sm:py-12 mt-[-4rem]">
        <div className=" flex flex-col w-full max-w-md">
          {/* First Table - Salary Income */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div
              className="p-4 w-full bg-white rounded-t-lg flex justify-between items-center cursor-pointer"
              onClick={toggleContentSalary}
            >
              <div className="flex items-center gap-3">
                {getCircleCheckSVG(
                  formData.incomeDetails.salaryIncome.basicSalary !== "" ||
                    formData.incomeDetails.salaryIncome.hraReceived !== "" ||
                    formData.incomeDetails.salaryIncome.actualRent !== "" ||
                    formData.incomeDetails.salaryIncome
                      .otherTaxableAllowance !== ""
                )}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    Salary Income
                  </h4>
                  <p className="text-gray-500">₹ 0</p>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transition-transform duration-200 ${
                  isOpenSalary ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <div
              ref={contentRefSalary}
              className="w-full bg-white overflow-hidden transition-all duration-300"
              style={{ maxHeight: "0" }}
            >
              <div className="p-4 border-t border-gray-200">
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex items-center">
                    <label
                      htmlFor="basicSalary"
                      className="text-gray-700 select-none font-medium w-48"
                    >
                      Basic Salary
                    </label>
                    <div className="relative ">
                      <span className="absolute inset-y-0 left-0 flex items-center  pl-3 pointer-events-none text-gray-400">
                        ₹
                      </span>
                      <input
                        id="basicSalary"
                        type="number"
                        name="basicSalary"
                        placeholder="0"
                        value={formData.incomeDetails.salaryIncome.basicSalary}
                        onChange={(e) =>
                          onInputChange(
                            2, // Tab number
                            "salaryIncome",
                            "basicSalary",
                            e.target.value
                          )
                        }
                        className="pl-6 py-2  rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label
                      htmlFor="hraReceived"
                      className="text-gray-700 select-none font-medium w-48"
                    >
                      HRA Received
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        ₹
                      </span>
                      <input
                        id="hraReceived"
                        type="number"
                        name="hraReceived"
                        placeholder="0"
                        value={formData.incomeDetails.salaryIncome.hraReceived}
                        onChange={(e) =>
                          onInputChange(
                            2,
                            "salaryIncome",
                            "hraReceived",
                            e.target.value
                          )
                        }
                        className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label
                      htmlFor="actualRent"
                      className="text-gray-700 select-none font-medium w-48"
                    >
                      Actual Rent
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        ₹
                      </span>
                      <input
                        id="actualRent"
                        type="number"
                        name="actualRent"
                        placeholder="0"
                        value={formData.incomeDetails.salaryIncome.actualRent}
                        onChange={(e) =>
                          onInputChange(
                            2,
                            "salaryIncome",
                            "actualRent",
                            e.target.value
                          )
                        }
                        className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label
                      htmlFor="city"
                      className="text-gray-700 select-none font-medium w-48"
                    >
                      City
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input
                          id="city-metro"
                          type="radio"
                          name="cityType"
                          value="Metro"
                          className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                          checked={cityType === "Metro"}
                          onChange={handleCityType}
                        />
                        <label
                          htmlFor="city-metro"
                          className="text-sm font-medium text-gray-900 ml-2 block"
                        >
                          Metro
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="city-non-metro"
                          type="radio"
                          name="cityType"
                          value="Non Metro"
                          className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                          checked={cityType === "Non Metro"}
                          onChange={handleCityType}
                        />
                        <label
                          htmlFor="city-non-metro"
                          className="text-sm font-medium text-gray-900 ml-2 block"
                        >
                          Non Metro
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label
                      htmlFor="otherTaxableAllowances"
                      className="text-gray-700 select-none font-medium w-48"
                    >
                      Other Taxable Allowances
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        ₹
                      </span>
                      <input
                        id="otherTaxableAllowances"
                        type="number"
                        name="otherTaxableAllowances"
                        placeholder="0"
                        value={
                          formData.incomeDetails.salaryIncome
                            .otherTaxableAllowance
                        }
                        onChange={(e) =>
                          onInputChange(
                            2,
                            "salaryIncome",
                            "otherTaxableAllowance",
                            e.target.value
                          )
                        }
                        className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={handleNextButton}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Table - House Property Income */}
          <div className="bg-white rounded-lg border border-gray-200 mt-[-1px]">
            <div
              className="p-4 w-full bg-white rounded-t-lg flex justify-between items-center cursor-pointer"
              onClick={toggleContentProperty}
            >
              <div className="flex items-center gap-3">
                {getCircleCheckSVG(
                  formData.incomeDetails.houseIncomeProperty
                    .interestOnBorrowedProperty !== "" ||
                    formData.incomeDetails.houseIncomeProperty.rentReceived !==
                      "" ||
                    formData.incomeDetails.houseIncomeProperty.muncipalTax !==
                      "" ||
                    formData.incomeDetails.houseIncomeProperty
                      .interestOnBorrowedCapital !== ""
                )}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    House Property Income
                  </h4>
                  <p className="text-gray-500">₹ 0</p>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transition-transform duration-200 ${
                  isOpenProperty ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <div
              ref={contentRefProperty}
              className="w-full bg-white overflow-hidden transition-all duration-300"
              style={{ maxHeight: "0" }}
            >
              <div className="p-4 border-t border-gray-200">
                <div className="grid grid-cols-1 gap-6">
                  <h4 className="text-gray-700">SELF OCCUPIED</h4>
                  <div className="flex items-center">
                    <label
                      htmlFor="interestBorrowedCapital"
                      className="text-gray-700 select-none font-medium w-48"
                    >
                      Interest on Borrowed Capital
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        ₹
                      </span>
                      <input
                        id="interestBorrowedCapital"
                        type="number"
                        name="interestBorrowedCapital"
                        placeholder="0"
                        value={
                          formData.incomeDetails.houseIncomeProperty
                            .interestOnBorrowedProperty
                        }
                        onChange={(e) =>
                          onInputChange(
                            2,
                            "houseIncomeProperty",
                            "interestOnBorrowedProperty",
                            e.target.value
                          )
                        }
                        className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <h4 className="text-gray-500">LET OUT</h4>
                  <div className="flex items-center">
                    <label
                      htmlFor="rentReceived"
                      className="text-gray-700 select-none font-medium w-48"
                    >
                      Rent Received
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        ₹
                      </span>
                      <input
                        id="rentReceived"
                        type="number"
                        name="rentReceived"
                        placeholder="0"
                        value={
                          formData.incomeDetails.houseIncomeProperty
                            .rentReceived
                        }
                        onChange={(e) =>
                          onInputChange(
                            2,
                            "houseIncomeProperty",
                            "rentReceived",
                            e.target.value
                          )
                        }
                        className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label
                      htmlFor="municipalTax"
                      className="text-gray-700 select-none font-medium w-48"
                    >
                      Muncipal Tax
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        ₹
                      </span>
                      <input
                        id="municipalTax"
                        type="number"
                        name="municipalTax"
                        placeholder="0"
                        value={
                          formData.incomeDetails.houseIncomeProperty.muncipalTax
                        }
                        onChange={(e) =>
                          onInputChange(
                            2,
                            "houseIncomeProperty",
                            "muncipalTax",
                            e.target.value
                          )
                        }
                        className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label
                      htmlFor="interestBorrowedCapital"
                      className="text-gray-700 select-none font-medium w-48"
                    >
                      Interest on Borrowed Capital
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        ₹
                      </span>
                      <input
                        id="interestBorrowedCapital"
                        type="number"
                        name="interestBorrowedCapital"
                        placeholder="0"
                        value={
                          formData.incomeDetails.houseIncomeProperty
                            .interestOnBorrowedCapital
                        }
                        onChange={(e) =>
                          onInputChange(
                            2,
                            "houseIncomeProperty",
                            "interestOnBorrowedCapital",
                            e.target.value
                          )
                        }
                        className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={handleNextButton}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* third Table - Capital Gainse */}
          <div className="bg-white rounded-lg border border-gray-200 mt-[-1px]">
            <div
              className="p-4 w-full bg-white rounded-t-lg flex justify-between items-center cursor-pointer"
              onClick={toggleCapitalGains}
            >
              <div className="flex items-center gap-3">
                {getCircleCheckSVG(
                  formData.incomeDetails.capitalGains
                    .shortTermCapitalGains15 !== "" ||
                    formData.incomeDetails.capitalGains
                      .shortTermCapitalGains30 !== "" ||
                    formData.incomeDetails.capitalGains
                      .shortTermCapitalGainsSlab !== "" ||
                    formData.incomeDetails.capitalGains
                      .longTermCapitalGains10 !== "" ||
                    formData.incomeDetails.capitalGains
                      .longTermCapitalGains20 !== ""
                )}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    Capital Gains
                  </h4>
                  <p className="text-gray-500">₹ 0</p>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transition-transform duration-200 ${
                  isOpenCapitalGain ? "transform rotate-180" : "" // Use isOpenCapitalGain
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <div
              ref={contentRefCapitalGain}
              className="w-full bg-white overflow-hidden transition-all duration-300"
              style={{ maxHeight: "0" }}
            >
              <div className="p-4 border-t border-gray-200">
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex items-center">
                    <label
                      htmlFor="ShortTermCapitalGains15"
                      className="text-gray-700 select-none font-medium w-48"
                    >
                      Short Term Capital Gains 15%
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        ₹
                      </span>
                      <input
                        id="ShortTermCapitalGains15%"
                        type="number"
                        name="ShortTermCapitalGains15%"
                        placeholder="0"
                        value={
                          formData.incomeDetails.capitalGains
                            .shortTermCapitalGains15
                        }
                        onChange={(e) =>
                          onInputChange(
                            2,
                            "capitalGains",
                            "shortTermCapitalGains15",
                            e.target.value
                          )
                        }
                        className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <label
                      htmlFor="shortTermCapitalGains30"
                      className="text-gray-700 select-none font-medium w-48"
                    >
                      Short Term Capital Gains 30%
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        ₹
                      </span>
                      <input
                        id="shortTermCapitalGains30%"
                        type="number"
                        name="shortTermCapitalGains30%"
                        placeholder="0"
                        value={
                          formData.incomeDetails.capitalGains
                            .shortTermCapitalGains30
                        }
                        onChange={(e) =>
                          onInputChange(
                            2,
                            "capitalGains",
                            "shortTermCapitalGains30",
                            e.target.value
                          )
                        }
                        className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <label
                      htmlFor="shortTermCapitalGainsSlab"
                      className="text-gray-700 select-none font-medium w-48"
                    >
                      Short Term Capital Gains slab
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        ₹
                      </span>
                      <input
                        id="shortTermCapitalGainsSlab%"
                        type="number"
                        name="shortTermCapitalGainsSlab%"
                        placeholder="0"
                        value={
                          formData.incomeDetails.capitalGains
                            .shortTermCapitalGainsSlab
                        }
                        onChange={(e) =>
                          onInputChange(
                            2,
                            "capitalGains",
                            "shortTermCapitalGainsSlab",
                            e.target.value
                          )
                        }
                        className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label
                      htmlFor="shortTermCapitalGains10%"
                      className="text-gray-700 select-none font-medium w-48"
                    >
                      Long Term Capital Gains 10%
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        ₹
                      </span>
                      <input
                        id="shortTermCapitalGains10%"
                        type="number"
                        name="shortTermCapitalGains10%"
                        placeholder="0"
                        value={
                          formData.incomeDetails.capitalGains
                            .longTermCapitalGains10
                        }
                        onChange={(e) =>
                          onInputChange(
                            2,
                            "capitalGains",
                            "longTermCapitalGains10",
                            e.target.value
                          )
                        }
                        className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <label
                      htmlFor="longTermCapitalGains20%"
                      className="text-gray-700 select-none font-medium w-48"
                    >
                      Long Term Capital Gains 20%
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        ₹
                      </span>
                      <input
                        id="longTermCapitalGains20%"
                        type="number"
                        name="longTermCapitalGains20%"
                        placeholder="0"
                        value={
                          formData.incomeDetails.capitalGains
                            .longTermCapitalGains20
                        }
                        onChange={(e) =>
                          onInputChange(
                            2,
                            "capitalGains",
                            "longTermCapitalGains20",
                            e.target.value
                          )
                        }
                        className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={handleNextButton}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* fourth Table - Business & Profession Income */}

          <div className="bg-white rounded-lg border border-gray-200 mt-[-1px]">
            <div
              className="p-4 w-full bg-white rounded-t-lg flex justify-between items-center cursor-pointer"
              onClick={toggleProfessionIncome}
            >
              <div className="flex items-center gap-3">
                {getCircleCheckSVG(
                  formData.incomeDetails.bussinessAndProfessionIncome.profit !==
                    ""
                )}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    Business & Profession Income
                  </h4>
                  <p className="text-gray-500">₹ 0</p>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transition-transform duration-200 ${
                  isOpenProfession ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <div
              ref={contentRefProfessionIncome}
              className="w-full bg-white overflow-hidden transition-all duration-300"
              style={{ maxHeight: "0" }}
            >
              <div className="p-4 border-t border-gray-200">
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex items-center">
                    <label
                      htmlFor="Business&ProfessionIncome-profit"
                      className="text-gray-700 select-none font-medium w-48"
                    >
                      Profit
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        ₹
                      </span>
                      <input
                        id="profit"
                        type="number"
                        name="profit"
                        placeholder="0"
                        value={
                          formData.incomeDetails.bussinessAndProfessionIncome
                            .profit
                        }
                        onChange={(e) =>
                          onInputChange(
                            2,
                            "bussinessAndProfessionIncome",
                            "profit",
                            e.target.value
                          )
                        }
                        className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={handleNextButton}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fifth Table - Other Incomes */}
          <div className="bg-white rounded-lg border border-gray-200 mt-[-1px]">
            <div
              className="p-4 w-full bg-white rounded-t-lg flex justify-between items-center cursor-pointer"
              onClick={toogleOtherIncomes}
            >
              <div className="flex items-center gap-3">
                {getCircleCheckSVG(
                  formData.incomeDetails.otherIncomes.savingsAccountInterest !==
                    "" ||
                    formData.incomeDetails.otherIncomes.fixedDepositInterest !==
                      "" ||
                    formData.incomeDetails.otherIncomes.domesticDividend !==
                      "" ||
                    formData.incomeDetails.otherIncomes.otherIncome !== ""
                )}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    Other Incomes
                  </h4>
                  <p className="text-gray-500">₹ 0</p>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transition-transform duration-200 ${
                  isOpenOtherIncomes ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <div
              ref={contentRefOtherIncomes}
              className="w-full bg-white overflow-hidden transition-all duration-300"
              style={{ maxHeight: "0" }}
            >
              <div className="p-4 border-t border-gray-200">
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex items-center">
                    <label
                      htmlFor="SavingsAccountInterest"
                      className="text-gray-700 select-none font-medium w-48"
                    >
                      Savings Account Interest
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        ₹
                      </span>
                      <input
                        id="SavingsAccountInterest"
                        type="number"
                        name="SavingsAccountInterest"
                        placeholder="0"
                        value={
                          formData.incomeDetails.otherIncomes
                            .savingsAccountInterest
                        }
                        onChange={(e) =>
                          onInputChange(
                            2,
                            "otherIncomes",
                            "savingsAccountInterest",
                            e.target.value
                          )
                        }
                        className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label
                      htmlFor="fixedDepositInterest"
                      className="text-gray-700 select-none font-medium w-48"
                    >
                      Fixed deposit Interest
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        ₹
                      </span>
                      <input
                        id="fixedDepositInterest"
                        type="number"
                        name="fixedDepositInterest"
                        placeholder="0"
                        value={
                          formData.incomeDetails.otherIncomes
                            .fixedDepositInterest
                        }
                        onChange={(e) =>
                          onInputChange(
                            2,
                            "otherIncomes",
                            "fixedDepositInterest",
                            e.target.value
                          )
                        }
                        className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label
                      htmlFor="domesticDividend"
                      className="text-gray-700 select-none font-medium w-48"
                    >
                      Domestic Dividend
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        ₹
                      </span>
                      <input
                        id="domesticDividend"
                        type="number"
                        name="domesticDividend"
                        placeholder="0"
                        value={
                          formData.incomeDetails.otherIncomes.domesticDividend
                        }
                        onChange={(e) =>
                          onInputChange(
                            2,
                            "otherIncomes",
                            "domesticDividend",
                            e.target.value
                          )
                        }
                        className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label
                      htmlFor="otherIncome"
                      className="text-gray-700 select-none font-medium w-48"
                    >
                      Other Income
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        ₹
                      </span>
                      <input
                        id="otherIncome"
                        type="number"
                        name="otherIncome"
                        placeholder="0"
                        value={formData.incomeDetails.otherIncomes.otherIncome}
                        onChange={(e) =>
                          onInputChange(
                            2,
                            "otherIncomes",
                            "otherIncome",
                            e.target.value
                          )
                        }
                        className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={onNext}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IncomeDetails

import React, { useState } from "react"
import BasicDetails from "./BasicDetails"
import IncomeDetails from "./IncomeDetails"
import Deductions from "./Deductions"
import NewRegimeCalculation from "./NewRegimeCalculaion"

const Tab = () => {
  const [activeTab, setActiveTab] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber)
  }

  const handleNext = () => {
    setActiveTab(activeTab + 1) // Increment activeTab
  }

  const [formData, setFormData] = useState({
    //Income Details
    incomeDetails: {
      salaryIncome: {
        basicSalary: "",
        hraReceived: "",
        actualRent: "",
        otherTaxableAllowance: "",
      },
      houseIncomeProperty: {
        interestOnBorrowedProperty: "",
        rentReceived: "",
        muncipalTax: "",
        interestOnBorrowedCapital: "",
      },
      capitalGains: {
        shortTermCapitalGains15: "",
        shortTermCapitalGains30: "",
        shortTermCapitalGainsSlab: "",
        longTermCapitalGains10: "",
        longTermCapitalGains20: "",
      },
      bussinessAndProfessionIncome: {
        profit: "",
      },
      otherIncomes: {
        savingsAccountInterest: "",
        fixedDepositInterest: "",
        domesticDividend: "",
        otherIncome: "",
      },
    },

    // Deductions
    deductions: {
      investments: {
        ELSS: "",
        EPF: "",
        PPF: "",
        LICPremium: "",
        otherInvestment: "",
        NPSInvestment: "",
      },
      nps: {
        Employeecontribution80CCD1B: "",
        Employeecontribution80CCD2: "",
      },
      medical: {
        selfFamily: "",
        parents: "",
        parentsSeniorCitizen: "",
      },
      otherDeductions: {
        donationCharity: "",
        interestOnSavingDeposits: "",
        interestOnElectricVehicle: "",
        interestOnEducationLoan: "",
      },
    },
  })

  const handleSubmit = () => {
    setIsLoading(true)

    // Store formData in local storage
    localStorage.setItem("formData", JSON.stringify(formData))
    // Trigger the calculation
    NewRegimeCalculation()

    setTimeout(() => {
      console.log("Data Loaded..!!")
      console.log("Form Data:", formData) // Log the collected data

      setIsLoading(false)
    }, 1000)
  }

  // Function to update formData when input fields change
  const handleInputChange = (tab, section, field, value) => {
    const sectionToUpdate = tab === 2 ? "incomeDetails" : "deductions"
    setFormData((prevData) => ({
      ...prevData,
      [sectionToUpdate]: {
        ...prevData[sectionToUpdate],
        [section]: {
          ...prevData[sectionToUpdate][section],
          [field]: value,
        },
      },
    }))
  }

  return (
    <div className="mt-5 ml-20 font-sans flex h-screen">
      <div className="p-8">
        <div className="max-w-md mx-auto">
          <div className="mb-4 flex space-x-2 p-2 bg-white ">
            <span
              onClick={() => handleTabClick(1)}
              className={`flex py-2 px-4    transition-all  duration-300 cursor-pointer ${
                activeTab === 1 ? "text-blue-600" : "text-black"
              }`}
            >
              Basic Details
            </span>
            <span
              onClick={() => handleTabClick(2)}
              className={`flex py-2 px-4 transition-all duration-300 cursor-pointer ${
                activeTab === 2 ? "text-blue-600" : "text-black"
              }`}
            >
              Income Details
            </span>
            <span
              onClick={() => handleTabClick(3)}
              className={`flex py-2 px-4  transition-all duration-300 cursor-pointer ${
                activeTab === 3 ? "text-blue-600" : "text-black"
              }`}
            >
              Deductions
            </span>
          </div>
          {/* divider line */}
          <div className="  dark:bg-white  ">
            <div
              className={`w-full h-px max-w-6xl mx-auto my-4 cursor-pointer`}
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%)",
              }}
            />
          </div>
          {/* Tab Content */}
          {activeTab === 1 && (
            <BasicDetails handleNext={handleNext} activeTab={activeTab} />
          )}
          {activeTab === 2 && (
            <IncomeDetails
              activeTab={activeTab}
              onNext={handleNext}
              formData={formData}
              onInputChange={handleInputChange}
            />
          )}
          {activeTab === 3 && (
            <Deductions
              activeTab={activeTab}
              formData={formData}
              onInputChange={handleInputChange}
            />
          )}

          {activeTab === 3 && (
            <div>
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Loading Data..." : "Submit"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Tab

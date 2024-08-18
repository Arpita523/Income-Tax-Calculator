import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateFormData } from "./reducers/taxSlice"

const Deductions = ({ activeTab }) => {
  const [isOpenInvestments, setIsOpenInvestments] = useState(false)
  const [isOpenNPS, setIsOpenNPS] = useState(false)
  const [isOpenMedical, setIsOpenMedical] = useState(false)
  const [isOpenOtherDeductions, setIsOpenOtherDeductions] = useState(false)

  const toogleOpenInvestments = () => {
    setIsOpenInvestments(!isOpenInvestments)
  }
  const toogleOpenNPS = () => {
    setIsOpenNPS(!isOpenNPS)
  }
  const toogleOpenMedical = () => {
    setIsOpenMedical(!isOpenMedical)
  }
  const toogleOpenOtherDeductions = () => {
    setIsOpenOtherDeductions(!isOpenOtherDeductions)
  }

  const contentRefOpenInvestments = useRef(null)
  const contentRefNPS = useRef(null)
  const contentRefMedical = useRef(null)
  const contentRefOtherDeductions = useRef(null)

  const handleDeductionButton = () => {
    if (isOpenInvestments) {
      setIsOpenInvestments(false)
      setIsOpenNPS(true)
    }
    if (isOpenNPS) {
      setIsOpenNPS(false)
      setIsOpenMedical(true)
    }
    if (isOpenMedical) {
      setIsOpenMedical(false)
      setIsOpenOtherDeductions(true)
    }
  }

  useEffect(() => {
    if (contentRefOpenInvestments.current) {
      contentRefOpenInvestments.current.style.maxHeight = isOpenInvestments
        ? `${contentRefOpenInvestments.current.scrollHeight}px`
        : "0"
    }
    if (contentRefNPS.current) {
      contentRefNPS.current.style.maxHeight = isOpenNPS
        ? `${contentRefNPS.current.scrollHeight}px`
        : "0"
    }
    if (contentRefMedical.current) {
      contentRefMedical.current.style.maxHeight = isOpenMedical
        ? `${contentRefMedical.current.scrollHeight}px`
        : "0"
    }
    if (contentRefOtherDeductions.current) {
      contentRefOtherDeductions.current.style.maxHeight = isOpenOtherDeductions
        ? `${contentRefOtherDeductions.current.scrollHeight}px`
        : "0"
    }
  }, [isOpenInvestments, isOpenNPS, isOpenMedical, isOpenOtherDeductions])

  const dispatch = useDispatch()
  const deductions = useSelector((state) => state.taxCalculator.deductions)

  const handleChange = (section, field, value) => {
    dispatch(updateFormData({ tab: 3, section, field, value }))
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
      className={`transition-all duration-300  p-4  ${
        activeTab === 3 ? "block" : "hidden"
      }`}
    >
      {/* first Table - Investments */}
      <div className="bg-white rounded-lg border border-gray-200 mt-[-1rem]">
        <div
          className="p-4 w-full bg-white rounded-t-lg flex justify-between items-center cursor-pointer"
          onClick={toogleOpenInvestments}
        >
          <div className="flex items-center gap-3">
            {getCircleCheckSVG(
              deductions.investments.ELSS !== "" || // Use deductions from Redux
                deductions.investments.EPF !== "" ||
                deductions.investments.PPF !== "" ||
                deductions.investments.LICPremium !== "" ||
                deductions.investments.otherInvestment !== "" ||
                deductions.investments.NPSInvestment !== ""
            )}
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                Investments
              </h4>
              <p className="text-gray-500">₹ 0</p>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 transition-transform duration-200 ${
              isOpenInvestments ? "transform rotate-180" : ""
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
          ref={contentRefOpenInvestments}
          className="w-full bg-white overflow-hidden transition-all duration-300"
          style={{ maxHeight: "0" }}
        >
          <div className="p-4 border-t border-gray-200">
            <div className="grid grid-cols-1 gap-6">
              <h4 className="text-gray-700">Section 80C</h4>
              <div className="flex items-center">
                <label
                  htmlFor="ELSS"
                  className="text-gray-700 select-none font-medium w-48"
                >
                  ELSS
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    ₹
                  </span>
                  <input
                    id="ELSS"
                    type="number"
                    name="ELSS"
                    placeholder="0"
                    value={deductions.investments.ELSS}
                    onChange={(e) =>
                      handleChange("investments", "ELSS", e.target.value)
                    }
                    className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* EPF Input */}
              <div className="flex items-center">
                <label
                  htmlFor="EPF"
                  className="text-gray-700 select-none font-medium w-48"
                >
                  EPF
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    ₹
                  </span>
                  <input
                    id="EPF"
                    type="number"
                    name="EPF"
                    placeholder="0"
                    value={deductions.investments.EPF}
                    onChange={(e) =>
                      handleChange("investments", "EPF", e.target.value)
                    }
                    className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* PPF Input */}
              <div className="flex items-center">
                <label
                  htmlFor="PPF"
                  className="text-gray-700 select-none font-medium w-48"
                >
                  PPF
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    ₹
                  </span>
                  <input
                    id="PPF"
                    type="number"
                    name="PPF"
                    placeholder="0"
                    value={deductions.investments.PPF}
                    onChange={(e) =>
                      handleChange("investments", "PPF", e.target.value)
                    }
                    className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* LIC Premium Input */}
              <div className="flex items-center">
                <label
                  htmlFor="LICPremium"
                  className="text-gray-700 select-none font-medium w-48"
                >
                  LIC Premium
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    ₹
                  </span>
                  <input
                    id="LICPremium"
                    type="number"
                    name="LICPremium"
                    placeholder="0"
                    value={deductions.investments.LICPremium}
                    onChange={(e) =>
                      handleChange("investments", "LICPremium", e.target.value)
                    }
                    className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Other Investment Input */}
              <div className="flex items-center">
                <label
                  htmlFor="otherInvestment"
                  className="text-gray-700 select-none font-medium w-48"
                >
                  Other
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    ₹
                  </span>
                  <input
                    id="otherInvestment"
                    type="number"
                    name="otherInvestment"
                    placeholder="0"
                    value={deductions.investments.otherInvestment}
                    onChange={(e) =>
                      handleChange(
                        "investments",
                        "otherInvestment",
                        e.target.value
                      )
                    }
                    className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <h4 className="text-gray-500">Section 80CCD(1)</h4>
              <div className="flex items-center">
                <label
                  htmlFor="NPSInvestment"
                  className="text-gray-700 select-none font-medium w-48"
                >
                  NPS
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    ₹
                  </span>
                  <input
                    id="NPSInvestment"
                    type="number"
                    name="NPSInvestment"
                    placeholder="0"
                    value={deductions.investments.NPSInvestment}
                    onChange={(e) =>
                      handleChange(
                        "investments",
                        "NPSInvestment",
                        e.target.value
                      )
                    }
                    className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={handleDeductionButton}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Table - NPS */}
      <div className="bg-white rounded-lg border border-gray-200 mt-[-1px]">
        <div
          className="p-4 w-full bg-white rounded-t-lg flex justify-between items-center cursor-pointer"
          onClick={toogleOpenNPS}
        >
          <div className="flex items-center gap-3">
            {getCircleCheckSVG(
              deductions.nps.Employeecontribution80CCD1B !== "" || // Use deductions from Redux
                deductions.nps.Employeecontribution80CCD2 !== ""
            )}
            <div>
              <h4 className="text-lg font-semibold text-gray-800">NPS</h4>
              <p className="text-gray-500">₹ 0</p>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 transition-transform duration-200 ${
              isOpenNPS ? "transform rotate-180" : ""
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
          ref={contentRefNPS}
          className="w-full bg-white overflow-hidden transition-all duration-300"
          style={{ maxHeight: "0" }}
        >
          <div className="p-4 border-t border-gray-200">
            <div className="grid grid-cols-1 gap-6">
              <h4 className="text-gray-700">Section 80C</h4>
              <div className="flex items-center">
                <label
                  htmlFor="Employeecontribution80CCD1B"
                  className="text-gray-700 select-none font-medium w-48"
                >
                  Employee's contribution made u/s 80CCD(1B)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    ₹
                  </span>
                  <input
                    id="Employeecontribution80CCD1B"
                    type="number"
                    name="Employeecontribution80CCD1B"
                    placeholder="0"
                    value={deductions.nps.Employeecontribution80CCD1B} // Bind to formData
                    onChange={(e) =>
                      handleChange(
                        "nps",
                        "Employeecontribution80CCD1B",
                        e.target.value
                      )
                    }
                    className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <label
                  htmlFor="Employeecontribution80CCD1B"
                  className="text-gray-700 select-none font-medium w-48"
                >
                  Employee's contribution made u/s 80CCD(2)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    ₹
                  </span>
                  <input
                    id="Employeecontribution80CCD1B"
                    type="number"
                    name="Employeecontribution80CCD1B"
                    placeholder="0"
                    value={deductions.nps.Employeecontribution80CCD2} // Bind to formData
                    onChange={(e) =>
                      handleChange(
                        "nps",
                        "Employeecontribution80CCD2",
                        e.target.value
                      )
                    }
                    className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={handleDeductionButton}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Third Table - Medical */}
      <div className="bg-white rounded-lg border border-gray-200 mt-[-1px]">
        <div
          className="p-4 w-full bg-white rounded-t-lg flex justify-between items-center cursor-pointer"
          onClick={toogleOpenMedical}
        >
          <div className="flex items-center gap-3">
            {getCircleCheckSVG(
              deductions.medical.selfFamily !== "" || // Use deductions from Redux
                deductions.medical.parents !== "" ||
                deductions.medical.parentsSeniorCitizen !== ""
            )}

            <div>
              <h4 className="text-lg font-semibold text-gray-800">Medical</h4>
              <p className="text-gray-500">₹ 0</p>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 transition-transform duration-200 ${
              isOpenMedical ? "transform rotate-180" : ""
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
          ref={contentRefMedical}
          className="w-full bg-white overflow-hidden transition-all duration-300"
          style={{ maxHeight: "0" }}
        >
          <div className="p-4 border-t border-gray-200">
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-center">
                <label
                  htmlFor="selfFamily"
                  className="text-gray-700 select-none font-medium w-48"
                >
                  For Self and Family
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    ₹
                  </span>
                  <input
                    id="selfFamily"
                    type="number"
                    name="selfFamily"
                    placeholder="0"
                    value={deductions.medical.selfFamily} // Bind to formData
                    onChange={(e) =>
                      handleChange("medical", "selfFamily", e.target.value)
                    }
                    className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <label
                  htmlFor="parents"
                  className="text-gray-700 select-none font-medium w-48"
                >
                  For Parents
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    ₹
                  </span>
                  <input
                    id="parents"
                    type="number"
                    name="parents"
                    placeholder="0"
                    value={deductions.medical.parents}
                    onChange={(e) =>
                      handleChange("medical", "parents", e.target.value)
                    }
                    className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <label
                  htmlFor="parentsSeniorCitizen"
                  className="text-gray-700 select-none font-medium w-48"
                >
                  For Parents (Sr. Citizen)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    ₹
                  </span>
                  <input
                    id="parentsSeniorCitizen"
                    type="number"
                    name="parentsSeniorCitizen"
                    placeholder="0"
                    value={deductions.medical.parentsSeniorCitizen}
                    onChange={(e) =>
                      handleChange(
                        "medical",
                        "parentsSeniorCitizen",
                        e.target.value
                      )
                    }
                    className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <button
                  onClick={handleDeductionButton}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* fourth Table - Other Deductions */}
      <div className="bg-white rounded-lg border border-gray-200 mt-[-1px]">
        <div
          className="p-4 w-full bg-white rounded-t-lg flex justify-between items-center cursor-pointer"
          onClick={toogleOpenOtherDeductions}
        >
          <div className="flex items-center gap-3">
            {getCircleCheckSVG(
              deductions.otherDeductions.donationCharity !== "" || // Use deductions from Redux
                deductions.otherDeductions.interestOnSavingDeposits !== "" ||
                deductions.otherDeductions.interestOnElectricVehicle !== "" ||
                deductions.otherDeductions.interestOnEducationLoan !== ""
            )}
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                Other Deductions
              </h4>
              <p className="text-gray-500">₹ 0</p>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 transition-transform duration-200 ${
              isOpenOtherDeductions ? "transform rotate-180" : ""
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
          ref={contentRefOtherDeductions}
          className="w-full bg-white overflow-hidden transition-all duration-300"
          style={{ maxHeight: "0" }}
        >
          <div className="p-4 border-t border-gray-200">
            <div className="grid grid-cols-1 gap-6">
              {/* Donation to Charity Input */}
              <div className="flex items-center">
                <label
                  htmlFor="donationCharity"
                  className="text-gray-700 select-none font-medium w-48"
                >
                  Donation to Charity u/s 80G
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    ₹
                  </span>
                  <input
                    id="donationCharity"
                    type="number"
                    name="donationCharity"
                    placeholder="0"
                    value={deductions.otherDeductions.donationCharity} // Bind to formData
                    onChange={(e) =>
                      handleChange(
                        "otherDeductions",
                        "donationCharity",
                        e.target.value
                      )
                    }
                    className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Interest On Saving Deposits Input */}
              <div className="flex items-center">
                <label
                  htmlFor="interestOnSavingDeposits"
                  className="text-gray-700 select-none font-medium w-48"
                >
                  Interest On Saving Deposits u/s 80TTA
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    ₹
                  </span>
                  <input
                    id="interestOnSavingDeposits"
                    type="number"
                    name="interestOnSavingDeposits"
                    placeholder="0"
                    value={deductions.otherDeductions.interestOnSavingDeposits}
                    onChange={(e) =>
                      handleChange(
                        "otherDeductions",
                        "interestOnSavingDeposits",
                        e.target.value
                      )
                    }
                    className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Interest on Electric Vehicle Loan Input */}
              <div className="flex items-center">
                <label
                  htmlFor="interestOnElectricVehicle"
                  className="text-gray-700 select-none font-medium w-48"
                >
                  Interest on Electric Vehicle Loan u/s 80EEB
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    ₹
                  </span>
                  <input
                    id="interestOnElectricVehicle"
                    type="number"
                    name="interestOnElectricVehicle"
                    placeholder="0"
                    value={deductions.otherDeductions.interestOnElectricVehicle}
                    onChange={(e) =>
                      handleChange(
                        "otherDeductions",
                        "interestOnElectricVehicle",
                        e.target.value
                      )
                    }
                    className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Interest On Education Loan Input */}
              <div className="flex items-center">
                <label
                  htmlFor="interestOnEducationLoan"
                  className="text-gray-700 select-none font-medium w-48"
                >
                  Interest On Education Loan u/s 80E
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    ₹
                  </span>
                  <input
                    id="interestOnEducationLoan"
                    type="number"
                    name="interestOnEducationLoan"
                    placeholder="0"
                    value={deductions.otherDeductions.interestOnEducationLoan}
                    onChange={(e) =>
                      handleChange(
                        "otherDeductions",
                        "interestOnEducationLoan",
                        e.target.value
                      )
                    }
                    className="pl-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Deductions

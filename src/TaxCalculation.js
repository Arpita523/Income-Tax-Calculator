import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { clearAllData } from "./reducers/taxSlice"

const TaxCalculation = () => {
  const newRegimeCalculation = useSelector(
    (state) => state.taxCalculator.newRegimeCalculation
  )
  // You'll need to add a selector for oldRegimeCalculation once you implement it
  // const oldRegimeCalculation = useSelector( ... );

  const dispatch = useDispatch()

  const handleClearAll = () => {
    dispatch(clearAllData())
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value)
  }

  // Function to extract labels (keys) from calculation objects
  const getLabels = (obj) => {
    return Object.keys(obj).map((key) => key.replace(/_/g, " "))
  }

  return (
    <div className="flex flex-col items-end fixed top-40 right-60">
      <button
        onClick={handleClearAll}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Clear All
      </button>
      <div className="w-[600px] bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="py-4 px-6 bg-gray-50 font-bold text-left text-lg border border-gray-200">
                Particulars
              </th>
              {/* Hide the "Tax Regime" header for now */}
              {/* <th
                className="py-4 px-6 bg-gray-50 font-bold text-center text-lg border border-gray-200"
                colSpan="2" 
              >
                Tax Regime
              </th> */}
              <th className="py-4 px-6 bg-gray-50 font-bold text-center text-lg border border-gray-200">
                New Regime
              </th>
            </tr>
            {/* Remove the Old regime header row */}
            {/* <tr>
              <th className="py-2 px-6 bg-gray-50 border border-gray-200"></th>
              <th className="py-2 px-6 bg-gray-50 text-center border border-gray-200">
                Old
              </th>
              <th className="py-2 px-6 bg-gray-50 text-center border border-gray-200">
                New
              </th>
            </tr> */}
          </thead>
          <tbody>
            {getLabels(newRegimeCalculation).map((label, index) => (
              <tr key={index}>
                <td className="py-3 px-6 border border-gray-200">{label}</td>
                {/* Remove the Old regime cell for now */}
                {/* <td className="py-3 px-6 text-center border border-gray-200">
                  {formatCurrency(
                    // oldRegimeCalculation[label.replace(/ /g, "_")] || 0 
                  )}
                </td> */}
                <td className="py-3 px-6 text-center border border-gray-200">
                  {formatCurrency(
                    newRegimeCalculation[label.replace(/ /g, "_")] || 0
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="h-4 bg-gray-50"></div>
        <div className="bg-blue-100 py-3 px-6 text-center border-t border-blue-200">
          Total Tax payable is{" "}
          {formatCurrency(newRegimeCalculation.Total_Tax_payable)} under New Tax
          Regime
        </div>
      </div>
    </div>
  )
}

export default TaxCalculation

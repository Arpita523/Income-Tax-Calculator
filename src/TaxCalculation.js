import React, { useState, useEffect } from "react"

const TaxCalculation = () => {
  const [tableData, setTableData] = useState([
    { label: "Gross Total Income", oldValue: 0, newValue: 0 },
    { label: "Total Deductions", oldValue: 0, newValue: 0 },
    { label: "Gross Taxable Income", oldValue: 0, newValue: 0 },
    { label: "Tax on Total Income", oldValue: 0, newValue: 0 },
    { label: "Surcharge", oldValue: 0, newValue: 0 },
    { label: "Health and Education Cess", oldValue: 0, newValue: 0 },
    { label: "Total Tax payable", oldValue: 0, newValue: 0 },
  ])

  useEffect(() => {
    const newRegimeData = JSON.parse(
      localStorage.getItem("newRegimeCalculation")
    )
    if (newRegimeData) {
      setTableData([
        {
          label: "Gross Total Income",
          oldValue: 0,
          newValue: newRegimeData.Gross_Total_Income,
        },
        {
          label: "Total Deductions",
          oldValue: 0,
          newValue: newRegimeData.Total_Deductions,
        },
        {
          label: "Gross Taxable Income",
          oldValue: 0,
          newValue: newRegimeData.Gross_Taxable_Income,
        },
        {
          label: "Tax on Total Income",
          oldValue: 0,
          newValue: newRegimeData.calculatedTax,
        },
        { label: "Surcharge", oldValue: 0, newValue: newRegimeData.surcharge },
        {
          label: "Health and Education Cess",
          oldValue: 0,
          newValue: newRegimeData.cess,
        },
        {
          label: "Total Tax payable",
          oldValue: 0,
          newValue: newRegimeData.Total_Tax_payable,
        },
      ])
    }
  }, [])

  const handleClearAll = () => {
    setTableData(
      tableData.map((item) => ({ ...item, oldValue: 0, newValue: 0 }))
    )
    localStorage.removeItem("newRegimeCalculation")
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value)
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
              <th
                className="py-4 px-6 bg-gray-50 font-bold text-center text-lg border border-gray-200"
                colSpan="2"
              >
                Tax Regime
              </th>
            </tr>
            <tr>
              <th className="py-2 px-6 bg-gray-50 border border-gray-200"></th>
              <th className="py-2 px-6 bg-gray-50 text-center border border-gray-200">
                Old
              </th>
              <th className="py-2 px-6 bg-gray-50 text-center border border-gray-200">
                New
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                <td className="py-3 px-6 border border-gray-200">
                  {item.label}
                </td>
                <td className="py-3 px-6 text-center border border-gray-200">
                  {formatCurrency(item.oldValue)}
                </td>
                <td className="py-3 px-6 text-center border border-gray-200">
                  {formatCurrency(item.newValue)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="h-4 bg-gray-50"></div>
        <div className="bg-blue-100 py-3 px-6 text-center border-t border-blue-200">
          Total Tax payable is {formatCurrency(tableData[6].newValue)} under New
          Tax Regime
        </div>
      </div>
    </div>
  )
}

export default TaxCalculation

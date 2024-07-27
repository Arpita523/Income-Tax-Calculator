import React, { useState } from "react"

const BasicDetails = (props) => {
  const handleNext = props.handleNext // Corrected variable name
  const activeTab = props.activeTab

  const [selectedAge, setSelectedAge] = useState(null)
  const [selectedResidentialStatus, setSelectedResidentialStatus] =
    useState(null)

  const handleAgeChange = (event) => {
    setSelectedAge(event.target.value)
  }

  const handleResidentialChange = (event) => {
    setSelectedResidentialStatus(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()

    try {
      localStorage.setItem("Age", selectedAge)
      localStorage.setItem("ResidentialStatus", selectedResidentialStatus)
    } catch (error) {
      console.log("Error during submission:", error)
    }
  }

  return (
    <div
      className={`transition-all duration-300  p-4  ${
        activeTab === 1 ? "block" : "hidden"
      }`}
    >
      {/* Age Section */}

      <div className="grid grid-cols-6 items-center">
        <div className="col-span-3">
          <h2 className="text-4 mb-2 ">Age</h2>
        </div>
        <div className="col-span-3 flex flex-col">
          <fieldset className="mb-1">
            <legend className="sr-only">Age Range</legend>
            <div className="flex items-center mb-1">
              <input
                type="radio"
                name="age"
                value="below60"
                id="age-below60"
                className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                onChange={handleAgeChange}
                checked={selectedAge === "below60"}
              />
              <label
                htmlFor="age-below60"
                className="text-sm font-medium text-gray-900 ml-2 block"
              >
                Below 60 years
              </label>
            </div>
          </fieldset>
          <fieldset className="mb-1">
            <legend className="sr-only">Age Range</legend>
            <div className="flex items-center mb-1">
              <input
                type="radio"
                name="age"
                value="60to80"
                id="age-60to80"
                className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                onChange={handleAgeChange}
                checked={selectedAge === "60to80"}
              />
              <label
                htmlFor="age-60to80"
                className="text-sm font-medium text-gray-900 ml-2 block"
              >
                60 to 80 years
              </label>
            </div>
          </fieldset>
          <fieldset className="mb-1">
            <legend className="sr-only">Age Range</legend>
            <div className="flex items-center mb-1">
              <input
                type="radio"
                name="age"
                value="above80"
                id="age-above80"
                className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                onChange={handleAgeChange}
                checked={selectedAge === "above80"}
              />
              <label
                htmlFor="age-above80"
                className="text-sm font-medium text-gray-900 ml-2 block"
              >
                Above 80 years
              </label>
            </div>
          </fieldset>
        </div>
      </div>
      {/* Middle Line */}
      <div className="  dark:bg-white  ">
        <div
          className={`w-full h-px max-w-6xl mx-auto my-5 cursor-pointer`}
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%)",
          }}
        />
      </div>
      {/* Residential Status Section */}
      <div className="grid grid-cols-6 items-center">
        <div className="col-span-3">
          <h2 className="text-4sm  mb-2 ">Residential Status</h2>
        </div>
        <div className="col-span-3 flex flex-col">
          <fieldset className="mb-1">
            <legend className="sr-only">Residential Status</legend>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                name="residentialStatus" // Corrected name attribute
                value="resident"
                id="resident-tab"
                className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                onChange={handleResidentialChange}
                checked={selectedResidentialStatus === "resident"} // Corrected variable name
              />
              <label
                htmlFor="resident-tab"
                className="text-sm font-medium text-gray-900 ml-2 block"
              >
                Resident
              </label>
            </div>
          </fieldset>
          <fieldset className="mb-1">
            <legend className="sr-only">Residential Status</legend>
            <div className="flex items-center mb-1">
              <input
                type="radio"
                name="residentialStatus" // Corrected name attribute
                value="notOrdinarilyResident" // Corrected value
                id="notOrdinarilyResident-tab" // Corrected ID
                className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                onChange={handleResidentialChange}
                checked={
                  selectedResidentialStatus === "notOrdinarilyResident" // Corrected variable name
                }
              />
              <label
                htmlFor="notOrdinarilyResident-tab" // Corrected htmlFor
                className="text-sm font-medium text-gray-900 ml-2 block"
              >
                Not Ordinarily Resident
              </label>
            </div>
          </fieldset>
          <fieldset className="mb-1">
            <legend className="sr-only">Residential Status</legend>
            <div className="flex items-center mb-1">
              <input
                type="radio"
                name="residentialStatus" // Corrected name attribute
                value="nonResident" // Corrected value
                id="nonResident-tab" // Corrected ID
                className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                onChange={handleResidentialChange}
                checked={selectedResidentialStatus === "nonResident"} // Corrected variable name
              />
              <label
                htmlFor="nonResident-tab" // Corrected htmlFor
                className="text-sm font-medium text-gray-900 ml-2 block"
              >
                Non Resident
              </label>
            </div>
          </fieldset>
        </div>
      </div>
      {/* Next Button */}
      <button
        onClick={handleNext} // Corrected function name
        className="ml-60 mt-10 px-8 py-2 rounded-full text-sm font-medium border shadow focus:outline-none focus:ring transition text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100 active:bg-blue-200 focus:ring-blue-300"
        type="submit"
      >
        Next
      </button>
    </div>
  )
}

export default BasicDetails

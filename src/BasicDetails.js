import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateFormData } from "./reducers/taxSlice"

const BasicDetails = ({ handleNext, activeTab }) => {
  const dispatch = useDispatch()
  const basicDetails = useSelector((state) => state.taxCalculator.basicDetails)

  const handleChange = (event) => {
    const { name, value } = event.target
    dispatch(updateFormData({ tab: 1, section: null, field: name, value }))
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
                onChange={handleChange}
                checked={basicDetails.age === "below60"}
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
                onChange={handleChange}
                checked={basicDetails.age === "60to80"}
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
                onChange={handleChange}
                checked={basicDetails.age === "above80"}
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
                name="residentialStatus"
                value="resident"
                id="resident-tab"
                className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                onChange={handleChange}
                checked={basicDetails.residentialStatus === "resident"}
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
                name="residentialStatus"
                value="notOrdinarilyResident"
                id="notOrdinarilyResident-tab"
                className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                onChange={handleChange}
                checked={
                  basicDetails.residentialStatus === "notOrdinarilyResident"
                }
              />
              <label
                htmlFor="notOrdinarilyResident-tab"
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
                name="residentialStatus"
                value="nonResident"
                id="nonResident-tab"
                className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                onChange={handleChange}
                checked={basicDetails.residentialStatus === "nonResident"}
              />
              <label
                htmlFor="nonResident-tab"
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
        onClick={handleNext}
        className="ml-60 mt-10 px-8 py-2 rounded-full text-sm font-medium border shadow focus:outline-none focus:ring transition text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100 active:bg-blue-200 focus:ring-blue-300"
        type="submit"
      >
        Next
      </button>
    </div>
  )
}

export default BasicDetails

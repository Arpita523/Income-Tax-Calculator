import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  // Basic Details
  basicDetails: {
    age: "",
    residentialStatus: "",
  },
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
  newRegimeCalculation: {
    Gross_Total_Income: 0,
    Total_Deductions: 0,
    Gross_Taxable_Income: 0,
    calculatedTax: 0,
    surcharge: 0,
    cess: 0,
    Total_Tax_payable: 0,
  },
}

export const taxSlice = createSlice({
  name: "taxCalculator",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      const { tab, section, field, value } = action.payload
      if (tab === 1) {
        state.basicDetails[field] = value
      } else {
        const sectionToUpdate = tab === 2 ? "incomeDetails" : "deductions"
        state[sectionToUpdate][section][field] = value
      }
    },
    setNewRegimeCalculation: (state, action) => {
      state.newRegimeCalculation = action.payload
    },
    calculateNewRegime: (state) => {
      const { incomeDetails, deductions } = state
      // Salary Income
      let totalIncome = 0
      totalIncome += parseFloat(incomeDetails.salaryIncome.basicSalary || 0)
      totalIncome += parseFloat(incomeDetails.salaryIncome.hraReceived || 0)
      totalIncome += parseFloat(incomeDetails.salaryIncome.actualRent || 0)
      totalIncome += parseFloat(
        incomeDetails.salaryIncome.otherTaxableAllowance || 0
      )

      // House Income Property
      totalIncome += parseFloat(
        incomeDetails.houseIncomeProperty.interestOnBorrowedProperty || 0
      )
      totalIncome += parseFloat(
        incomeDetails.houseIncomeProperty.rentReceived || 0
      )
      totalIncome -= parseFloat(
        incomeDetails.houseIncomeProperty.muncipalTax || 0
      )
      totalIncome -= parseFloat(
        incomeDetails.houseIncomeProperty.interestOnBorrowedCapital || 0
      )

      // Capital Gains
      totalIncome += parseFloat(
        incomeDetails.capitalGains.shortTermCapitalGains15 || 0
      )
      totalIncome += parseFloat(
        incomeDetails.capitalGains.shortTermCapitalGains30 || 0
      )
      totalIncome += parseFloat(
        incomeDetails.capitalGains.shortTermCapitalGainsSlab || 0
      )
      totalIncome += parseFloat(
        incomeDetails.capitalGains.longTermCapitalGains10 || 0
      )
      totalIncome += parseFloat(
        incomeDetails.capitalGains.longTermCapitalGains20 || 0
      )

      // Business and Profession Income
      totalIncome += parseFloat(
        incomeDetails.bussinessAndProfessionIncome.profit || 0
      )

      // Other Incomes
      totalIncome += parseFloat(
        incomeDetails.otherIncomes.savingsAccountInterest || 0
      )
      totalIncome += parseFloat(
        incomeDetails.otherIncomes.fixedDepositInterest || 0
      )
      totalIncome += parseFloat(
        incomeDetails.otherIncomes.domesticDividend || 0
      )
      totalIncome += parseFloat(incomeDetails.otherIncomes.otherIncome || 0)

      // Calculate total deductions
      let totalDeductions = 0

      // Investments
      totalDeductions += parseFloat(deductions.investments.ELSS || 0)
      totalDeductions += parseFloat(deductions.investments.EPF || 0)
      totalDeductions += parseFloat(deductions.investments.PPF || 0)
      totalDeductions += parseFloat(deductions.investments.LICPremium || 0)
      totalDeductions += parseFloat(deductions.investments.otherInvestment || 0)
      totalDeductions += parseFloat(deductions.investments.NPSInvestment || 0)

      // NPS
      totalDeductions += parseFloat(
        deductions.nps.Employeecontribution80CCD1B || 0
      )
      totalDeductions += parseFloat(
        deductions.nps.Employeecontribution80CCD2 || 0
      )

      // Medical
      totalDeductions += parseFloat(deductions.medical.selfFamily || 0)
      totalDeductions += parseFloat(deductions.medical.parents || 0)
      totalDeductions += parseFloat(
        deductions.medical.parentsSeniorCitizen || 0
      )

      // Other Deductions
      totalDeductions += parseFloat(
        deductions.otherDeductions.donationCharity || 0
      )
      totalDeductions += parseFloat(
        deductions.otherDeductions.interestOnSavingDeposits || 0
      )
      totalDeductions += parseFloat(
        deductions.otherDeductions.interestOnElectricVehicle || 0
      )
      totalDeductions += parseFloat(
        deductions.otherDeductions.interestOnEducationLoan || 0
      )

      // New Regime Calculation Steps

      // Step 1: Gross Total Income
      const Gross_Total_Income = totalIncome

      // Step 2: Total Deductions (only standard deduction in new regime)
      const standardDeduction = 50000
      const Total_Deductions = standardDeduction

      // Step 3: Gross Taxable Income
      const Gross_Taxable_Income = Gross_Total_Income - Total_Deductions

      // Step 4: Calculate tax using new regime slabs
      let calculatedTax = 0

      if (Gross_Taxable_Income <= 300000) {
        calculatedTax = 0
      } else if (Gross_Taxable_Income <= 600000) {
        calculatedTax = (Gross_Taxable_Income - 300000) * 0.05
      } else if (Gross_Taxable_Income <= 900000) {
        calculatedTax = 15000 + (Gross_Taxable_Income - 600000) * 0.1
      } else if (Gross_Taxable_Income <= 1200000) {
        calculatedTax = 45000 + (Gross_Taxable_Income - 900000) * 0.15
      } else if (Gross_Taxable_Income <= 1500000) {
        calculatedTax = 90000 + (Gross_Taxable_Income - 1200000) * 0.2
      } else {
        calculatedTax = 150000 + (Gross_Taxable_Income - 1500000) * 0.3
      }

      // Step 5: Calculate surcharge (if applicable)
      let surcharge = 0
      if (Gross_Taxable_Income > 5000000 && Gross_Taxable_Income <= 10000000) {
        surcharge = calculatedTax * 0.1
      } else if (
        Gross_Taxable_Income > 10000000 &&
        Gross_Taxable_Income <= 20000000
      ) {
        surcharge = calculatedTax * 0.15
      } else if (
        Gross_Taxable_Income > 20000000 &&
        Gross_Taxable_Income <= 50000000
      ) {
        surcharge = calculatedTax * 0.25
      } else if (Gross_Taxable_Income > 50000000) {
        surcharge = calculatedTax * 0.37
      }

      // Step 6: Calculate Health and Education Cess
      const cess = 0.04 * (calculatedTax + surcharge)

      // Step 7: Calculate Total Tax payable
      const Total_Tax_payable = calculatedTax + surcharge + cess

      state.newRegimeCalculation = {
        Gross_Total_Income,
        Total_Deductions,
        Gross_Taxable_Income,
        calculatedTax,
        surcharge,
        cess,
        Total_Tax_payable,
      }
    },
    clearAllData: () => initialState,
  },
})

export const {
  updateFormData,
  setNewRegimeCalculation,
  clearAllData,
  calculateNewRegime,
} = taxSlice.actions
export default taxSlice.reducer

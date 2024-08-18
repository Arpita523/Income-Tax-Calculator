import Headers from "./Headers"
import Tab from "./Tab"
import NewRegimeCalculation from "./NewRegimeCalculaion"
import TaxCalculation from "./TaxCalculation"

function App() {
  return (
    <div className="App">
      <Headers />
      <Tab />
      <NewRegimeCalculation /> {/* Keep this component for now */}
      <TaxCalculation />
    </div>
  )
}

export default App

import { useEffect, useState } from "react"


const IncomeOverview = ({ transactions, onAddIncome }) => {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions)
        setChartData(result)

        return () => {}
    }, [transactions])

  return (
    <div>
      IncomeOverview
    </div>
  )
}

export default IncomeOverview

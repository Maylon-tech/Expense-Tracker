import { useEffect, useState } from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import IncomeOverview from "../../components/Income/IncomeOverview"
import { API_PATHS } from "../../utils/apiPaths"
import axiosInstance from "../../utils/axiosInstance"
import Modal from "../../components/Modal"
import AddIncomeForm from "../../components/Income/AddIncomeForm"
import IncomeList from "../../components/Income/IncomeList"
import DeleteAlert from "../../components/DeleteAlert"


const Income = () => {
  const [incomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)

  // Get all income details
  const fetchIncomeDetails = async () => {
    if (loading) return
    
    setLoading(true)

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      )

      if (response.data) {
        setIncomeData(response.data)
      }

    } catch (error) {
      console.log("Something went wrong. Please try again.", error)
    } finally {
      setLoading(false)
    }
  }

  // Handle Add income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income

    // validate checks
    if (!source.trim()) {
      // toast.error("Source is required.")
      alert(("Source is required."))
      return
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      // toast.error("Amount should be a valid number greater than 0.")
      alert(("Amount should be a valid number greater than 0."))
      return
    }

    if (!date) {
      // toast.error("Date is required.")
      alert(("Date is required."))
      return
    }
    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      })

      setOpenAddIncomeModal(false)
      // toast.success("Income added successfully.")
      alert("Income added successfully.")
      fetchIncomeDetails()
    } catch (error) {
      console.error(
        "Error adding income.:",
        error.message?.data?.message || error.message
      )
    }

  }
  
  // Delete Income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))

      setOpenDeleteAlert({ show: false, data: null })
      // toast.success("Income details deleted successfully.")
      alert("Income details deleted successfully.")
      fetchIncomeDetails()
    } catch (error) {
      console.error(
        "Error deleting income",
        error.response?.data?.message || error.message
      )
    }
  }
  
  // Handle download income details
  const handleDownloadIncomeDetails = async () => {}

  useEffect(() => {
    fetchIncomeDetails()

    return () => {}
  }, [])

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, daat: id })
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>

        <Modal
          title="Add Income"
          onClose={() => setOpenAddIncomeModal(false)}
          isOpen={openAddIncomeModal}
        >
          <AddIncomeForm
            onAddIncome={handleAddIncome}
          />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure want to delete this income details?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income

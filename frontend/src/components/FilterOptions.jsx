import { useState } from "react";
import { MdOutlineFilterList } from "react-icons/md";

const FilterOptions = ({ onFilterChange, fetchStudents }) => {
  const [batch, setBatch] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleBatchChange = (e) => {
    const selectedBatch = e.target.value;
    setBatch(selectedBatch);
    if (selectedBatch === "All") {
      onFilterChange({ batch: "", paymentStatus });
      setPaymentStatus("");
      fetchStudents();
    } else {
      onFilterChange({ batch: selectedBatch, paymentStatus });
    }
  };

  const handlePaymentStatusChange = (e) => {
    const selectedPaymentStatus = e.target.value;
    setPaymentStatus(selectedPaymentStatus);
    if (selectedPaymentStatus === "All") {
      onFilterChange({ batch, paymentStatus: "" });
      setBatch("");
      fetchStudents();
    } else {
      onFilterChange({ batch, paymentStatus: selectedPaymentStatus });
    }
  };
  return (
    <div className="flex items-center justify-center gap-4 relative">
      <p className="flex items-center gap-1 font-medium text-gray-500">
        <MdOutlineFilterList size={20} />
      </p>
      <div className="relative">
        <p className="text-[12px] absolute -top-[10px] bg-white left-1 text-gray-400">
          Batch
        </p>
        <select
          className="border border-gray-300 p-2 px-3 rounded-md w-[90px]"
          value={batch}
          onChange={handleBatchChange}
        >
          <option value="">All</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>
      </div>
      <div className=" relative">
        <p className="text-[12px] absolute -top-[10px] bg-white left-1 text-gray-400">
          Fee Status
        </p>
        <select
          className="border border-gray-300 p-2 px-3 rounded-md"
          value={paymentStatus}
          onChange={handlePaymentStatusChange}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default FilterOptions;

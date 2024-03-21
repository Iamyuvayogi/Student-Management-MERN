import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdEdit, MdDeleteOutline } from "react-icons/md";
import { RiLoader2Line } from "react-icons/ri";
import { BASE_URL } from "../api/url";
import { ImFileEmpty } from "react-icons/im";
import StudentForm from "./StudentForm";

const StudentList = ({
  isLoading,
  students,
  fetchStudents,
  isModelOpen,
  setIsModelOpen,
}) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  const actionBoxRef = useRef();

  const handleEdit = (student) => {
    setSelectedStudent(student._id);
    setEditingStudent(student);
  };

  const handleDelete = async (studentId) => {
    try {
      await axios.delete(`${BASE_URL}/api/delete-student/${studentId}`);
      console.log("deleted");
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student: ", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionBoxRef.current &&
        !actionBoxRef.current.contains(event.target)
      ) {
        setSelectedStudent(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedStudent]);

  const handleEditModal = async (student) => {
    await handleEdit(student);
    setIsModelOpen(true);
  };

  return (
    <div className="container mt-8 px-3 h-[450px] overflow-y-auto mb-6 w-full">
      <table className="relative w-full">
        <thead className="sticky top-0 bg-white shadow-sm z-10">
          <tr className="text-gray-400 sticky text-center border-b">
            <th className="font-medium p-3">Name</th>
            <th className="font-medium p-3">Email</th>
            <th className="font-medium p-3">Phone no.</th>
            <th className="font-medium p-3">Course</th>
            <th className="font-medium p-3">Batch</th>
            <th className="font-medium p-3">Fee Status</th>
            <th></th>
          </tr>
        </thead>

        {students?.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan="7" className="text-center py-4">
                {isLoading ? (
                  <>
                    <RiLoader2Line size={20} className="animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                     No data Found
                  </>
                )}
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {students.map((student) => (
              <tr
                key={student._id}
                className={`${
                  selectedStudent === student._id && "bg-gray-100"
                } hover:bg-gray-100 cursor-pointer rounded-md text-center`}
              >
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.email}</td>
                <td className="p-3">{student.mobile}</td>
                <td className="p-3">{student.course}</td>
                <td className="p-3">{student.batch}</td>
                <td
                  className={`p-3 ${
                    (student.paymentStatus === "Pending" &&
                      "text-orange-500") ||
                    (student.paymentStatus === "Completed" && "text-green-500")
                  }`}
                >
                  {student.paymentStatus}
                </td>
                <td>
                  <div className="relative">
                    <HiOutlineDotsVertical
                      className="cursor-pointer"
                      onClick={() => setSelectedStudent(student._id)}
                    />
                    {selectedStudent === student._id && (
                      <div
                        ref={actionBoxRef}
                        className="absolute z-[8] right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                      >
                        <button
                          onClick={() => handleEditModal(student)}
                          className="px-4 py-2 text-sm hover:bg-gray-100 w-full text-left flex items-center gap-1 text-gray-500"
                        >
                          <MdEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(student._id)}
                          className="px-4 py-2 text-sm hover:bg-gray-100 w-full text-left flex items-center gap-1 text-gray-500"
                        >
                          <MdDeleteOutline /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {isModelOpen && (
        <StudentForm
          onSubmit={fetchStudents}
          setIsModelOpen={setIsModelOpen}
          initialData={editingStudent}
          setEditingStudent={setEditingStudent}
        />
      )}
    </div>
  );
};

export default StudentList;

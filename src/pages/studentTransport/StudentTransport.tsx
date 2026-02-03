import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { Pencil, Trash2 } from "lucide-react";
import {
  useGetAllAssignStudent,
  useGetTransportFee,
} from "../../hooks/studentAssign.hook";
import type {
  TStudentAssign,
  TTransportFee,
} from "../../types/studentAssign.type";
import CreateAssignStudentModal from "../../components/assignStudentModal/CreateAssignStudentModal";
import DeleteAssignStudentModal from "../../components/assignStudentModal/DeleteAssignStudentModal";
import UpdateAssignStudentModal from "../../components/assignStudentModal/UpdateAssignStudentModal";

const StudentTransport = () => {
  const [isCreateStudentAssignModal, setIsCreateStudentAssignModal] =
    useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [updateId, setUpdateId] = useState("");
  // get student transport data
  const { data: studentAssignmentLis, isLoading: SALoading } =
    useGetAllAssignStudent();

  const { data: transportFeeList, isLoading: TFLoading } = useGetTransportFee();
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-base lg:text-2xl font-bold text-black">
          Student Assignment and Fee Generation
        </h1>
        <Button
          onClick={() => {
            setIsCreateStudentAssignModal(true);
          }}
          className=" cursor-pointer"
        >
          Assign Student
        </Button>
      </div>

      <div className=" grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* table */}
        <div className="lg:col-span-8">
          <div>
            <h1 className="text-xl font-bold text-center py-1.5">
              Assign Student
            </h1>
            <Table className=" overflow-x-scroll">
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Pickup Point</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Stats</TableHead>

                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {studentAssignmentLis?.data?.map(
                  (assignStudent: TStudentAssign) => (
                    <TableRow key={assignStudent?.id}>
                      <TableCell> {assignStudent?.student?.name}</TableCell>
                      <TableCell>{assignStudent?.route?.name}</TableCell>
                      <TableCell>{assignStudent?.pickupPoint?.name}</TableCell>
                      <TableCell>
                        {assignStudent?.route?.routeVehicle?.vehicle?.vehicleNo}
                      </TableCell>
                      <TableCell>{assignStudent?.route?.endPoint}</TableCell>
                      <TableCell>
                        <span className="text-amber-700 text-xs font-bold">
                          {" "}
                          {assignStudent?.isActive ? "ACTIVE" : "DEACTIVATE"}
                        </span>
                      </TableCell>
                      {/* action btn */}
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-blue-600 hover:bg-blue-50  cursor-pointer"
                            onClick={() => {
                              setIsUpdateModalOpen(true);
                              setUpdateId(assignStudent?.id);
                            }}
                          >
                            <Pencil size={16} />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:bg-red-50 cursor-pointer"
                            onClick={() => {
                              setIsDeleteModalOpen(true);
                              setDeleteId(assignStudent?.id);
                            }}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ),
                )}

                {/* show loading spinner */}

                {SALoading && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-40 text-center">
                      <div className="flex justify-center items-center w-full">
                        <LoadingSpinner />
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {/*  list is empty */}
                {studentAssignmentLis?.data?.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center text-muted-foreground"
                    >
                      No data found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* fee belling data */}
        <div className="lg:col-span-4 bg-white">
          <div className="p-6">
            <h1 className="text-xl font-bold text-center py-1.5">
              Transport Fee
            </h1>
            {/* loading state */}
            {TFLoading && (
              <div className="flex justify-center items-center w-full">
                <LoadingSpinner />
              </div>
            )}

            <div className=" space-y-1.5">
              {transportFeeList?.data?.map((transportFee: TTransportFee) => (
                <div
                  key={transportFee?.id}
                  className=" bg-slate-50 border rounded-sm shadow-sm p-4 space-y-1.5"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-base font-bold">
                      {transportFee?.student?.name}
                    </h2>
                    <h2 className="text-base text-blue-500 font-bold">
                      {" "}
                      ৳{transportFee?.amount}
                    </h2>
                  </div>
                  <p className=" text-base ">{transportFee?.route?.name}</p>
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-semibold text-amber-700">
                      {transportFee?.status}
                    </h3>
                    <h3 className="text-base font-semibold">
                      {
                        new Date(transportFee?.createdAt)
                          .toISOString()
                          .split("T")[0]
                      }
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*  create Create student assign  model */}

      <CreateAssignStudentModal
        open={isCreateStudentAssignModal}
        setOpen={setIsCreateStudentAssignModal}
      />
      {/* delete a assign student modal */}
      <DeleteAssignStudentModal
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        id={deleteId}
      />
      {/* update active status a assign student modal */}
      <UpdateAssignStudentModal
        open={isUpdateModalOpen}
        setOpen={setIsUpdateModalOpen}
        id={updateId}
      />
    </>
  );
};

export default StudentTransport;

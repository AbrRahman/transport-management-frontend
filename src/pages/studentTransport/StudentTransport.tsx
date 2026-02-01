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
import CreateRoutePickupPointModal from "../../components/routePickupPointModal/CreateRoutePickupPointModal";
import { useGetAllAssignStudent } from "../../hooks/studentAssign.hook";
import type { TStudentAssign } from "../../types/studentAssign.type";

const StudentTransport = () => {
  const [isCreateStudentAssignModal, setIsCreateStudentAssignModal] =
    useState(false);

  const { data: studentAssignmentLis, isLoading: SALoading } =
    useGetAllAssignStudent();
  console.log(studentAssignmentLis?.data);
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
          Add a New
        </Button>
      </div>

      <div className=" grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* table */}
        <div className="lg:col-span-8">
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
                      {assignStudent?.isActive ? "ACTIVE" : "deactivate"}
                    </TableCell>
                    {/* action btn */}
                    <TableCell className="text-right">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 text-blue-600 hover:bg-blue-50"
                          onClick={() => console.log("Edit", assignStudent?.id)}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:bg-red-50"
                          onClick={() =>
                            console.log("Delete", assignStudent?.id)
                          }
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

        {/* fee belling data */}
        <div className="lg:col-span-4 bg-white">
          <div className="p-6">
            <h1 className="text-xl font-bold text-center py-1.5">
              Transport Fee
            </h1>
            {/* <div className="flex justify-center items-center w-full">
              <LoadingSpinner />
            </div> */}
            <div className=" bg-slate-50 border rounded-sm shadow-sm p-4 space-y-1.5">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-bold">Rahim abd</h2>
                <h2 className="text-base text-blue-500 font-bold"> ৳1500</h2>
              </div>
              <p className=" text-base ">route is route</p>
              <div className="flex justify-between items-center">
                <h3 className="text-base font-semibold text-amber-700">
                  Pending
                </h3>
                <h3 className="text-base font-semibold">Data</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  create Create student assign  model */}

      <CreateRoutePickupPointModal
        open={isCreateStudentAssignModal}
        setOpen={setIsCreateStudentAssignModal}
      />
    </>
  );
};

export default StudentTransport;

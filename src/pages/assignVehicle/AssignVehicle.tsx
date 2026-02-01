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
import { useGetAllAssignVehicle } from "../../hooks/assignVehicle";
import type { TAssignVehicle } from "../../types/assignVehicle";

const AssignVehicle = () => {
  const [isCreateAssignVehicleOpen, setIsCreateAssignVehicleOpen] =
    useState(false);

  const { data, isLoading } = useGetAllAssignVehicle();
  const assignVehicleList = data?.data;

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h1 className=" text-2xl font-bold text-black">Assign Vehicle</h1>
        <Button
          onClick={() => {
            setIsCreateAssignVehicleOpen(true);
          }}
          className=" cursor-pointer"
        >
          Add a New
        </Button>
      </div>
      {/* table */}
      <Table className=" overflow-x-scroll">
        <TableHeader>
          <TableRow>
            <TableHead>Route</TableHead>
            <TableHead>Vehicle No</TableHead>
            <TableHead>Diver</TableHead>
            <TableHead>Contact No</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {assignVehicleList?.map((assignVehicle: TAssignVehicle) => (
            <TableRow key={assignVehicle?.id}>
              <TableCell> {assignVehicle?.route?.name}</TableCell>
              <TableCell> {assignVehicle?.vehicle?.vehicleNo}</TableCell>
              <TableCell>{assignVehicle?.vehicle?.driverName}</TableCell>
              <TableCell>{assignVehicle?.vehicle?.contactNo}</TableCell>
              {/* action btn */}
              <TableCell className="text-right">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-blue-600 hover:bg-blue-50"
                    onClick={() => console.log("Edit", assignVehicle?.id)}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-red-600 hover:bg-red-50"
                    onClick={() => console.log("Delete", assignVehicle?.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}

          {/* show loading spinner */}

          {isLoading && (
            <TableRow>
              <TableCell colSpan={5} className="h-40 text-center">
                <div className="flex justify-center items-center w-full">
                  <LoadingSpinner />
                </div>
              </TableCell>
            </TableRow>
          )}

          {/*  list is empty */}
          {assignVehicleList?.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground"
              >
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/*  create Create assign vehicle  model */}

      <CreateRoutePickupPointModal
        open={isCreateAssignVehicleOpen}
        setOpen={setIsCreateAssignVehicleOpen}
      />
    </>
  );
};

export default AssignVehicle;

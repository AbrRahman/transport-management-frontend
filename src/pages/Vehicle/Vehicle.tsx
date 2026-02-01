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
import CreateVehicleModal from "../../components/vehicle/CreateVehicleModal";
import { useGetVehicles } from "../../hooks/vehicle.hook";
import type { TVehicle } from "../../types/vehicle.types";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";

const Vehicle = () => {
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const { data, isLoading } = useGetVehicles();
  const vehiclesData = data?.data;

  return (
    <>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setIsVehicleModalOpen(true);
          }}
          className=" cursor-pointer"
        >
          Add Vehicle
        </Button>
      </div>
      {/* table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vehicle No</TableHead>
            <TableHead>Diver Name</TableHead>
            <TableHead>Contact No</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {vehiclesData?.map((vehicle: TVehicle) => (
            <TableRow key={vehicle?.id}>
              <TableCell> {vehicle?.vehicleNo}</TableCell>
              <TableCell>{vehicle?.driverName}</TableCell>
              <TableCell>{vehicle?.contactNo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* show loading spinner */}

        {isLoading && (
          <TableRow>
            <TableCell colSpan={3} className="h-40 text-center">
              <div className="flex justify-center items-center w-full">
                <LoadingSpinner />
              </div>
            </TableCell>
          </TableRow>
        )}

        {/* vehicle list is empty */}
        {vehiclesData?.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={3}
              className="text-center text-muted-foreground"
            >
              No data found
            </TableCell>
          </TableRow>
        )}
      </Table>
      {/* vehicle create model */}

      <CreateVehicleModal
        open={isVehicleModalOpen}
        setOpen={setIsVehicleModalOpen}
      />
    </>
  );
};

export default Vehicle;

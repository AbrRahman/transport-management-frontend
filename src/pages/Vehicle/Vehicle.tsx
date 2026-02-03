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
import { Pencil, Trash2 } from "lucide-react";
import DeleteVehicleModal from "../../components/vehicle/DeleteVehicleModal";
import UpdateVehicleModal from "../../components/vehicle/UpdateVechicleModal";

const Vehicle = () => {
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const { data, isLoading } = useGetVehicles();
  const vehiclesData = data?.data;

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h1 className=" text-2xl font-bold text-black">Vehicles</h1>
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
      <Table className=" overflow-x-scroll">
        <TableHeader>
          <TableRow>
            <TableHead>Vehicle No</TableHead>
            <TableHead>Diver Name</TableHead>
            <TableHead>Contact No</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {vehiclesData?.map((vehicle: TVehicle) => (
            <TableRow key={vehicle?.id}>
              <TableCell> {vehicle?.vehicleNo}</TableCell>
              <TableCell>{vehicle?.driverName}</TableCell>
              <TableCell>{vehicle?.contactNo}</TableCell>
              {/* action btn */}
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-blue-600 hover:bg-blue-50  cursor-pointer"
                    onClick={() => {
                      setIsUpdateModalOpen(true);
                      setUpdateId(vehicle?.id);
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
                      setDeleteId(vehicle?.id);
                    }}
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
              <TableCell colSpan={4} className="h-40 text-center">
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
                colSpan={4}
                className="text-center text-muted-foreground"
              >
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* vehicle create model */}

      <CreateVehicleModal
        open={isVehicleModalOpen}
        setOpen={setIsVehicleModalOpen}
      />
      {/* update vehicle modal */}
      <UpdateVehicleModal
        open={isUpdateModalOpen}
        setOpen={setIsUpdateModalOpen}
        id={updateId}
      />

      {/* delete a pickup point modal */}
      <DeleteVehicleModal
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        id={deleteId}
      />
    </>
  );
};

export default Vehicle;

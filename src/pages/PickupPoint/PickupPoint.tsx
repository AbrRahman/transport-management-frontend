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
// import CreateVehicleModal from "../../components/vehicle/CreateVehicleModal";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { Trash2 } from "lucide-react";
import { useGetAllPickupPoint } from "../../hooks/pickupPoint.hook";
import type { TPickupPoint } from "../../types/pickupPoint.type";
import CreatePickupPointModal from "../../components/pickupPoint/CreatePickupPointModal";
import DeletePickupPointModal from "../../components/pickupPoint/DeletePickupPointModal";

const PickupPoint = () => {
  const [isPickupPointModalOpen, setIsPickupPointModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const { data, isLoading } = useGetAllPickupPoint();
  const pickupPoint = data?.data;
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h1 className=" text-2xl font-bold text-black">Pickup Point</h1>
        <Button
          onClick={() => {
            setIsPickupPointModalOpen(true);
          }}
          className=" cursor-pointer"
        >
          Add Pickup Point
        </Button>
      </div>
      {/* table */}
      <Table className=" overflow-x-scroll">
        <TableHeader>
          <TableRow>
            <TableHead>Pickup Point Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {pickupPoint?.map((pickupPoint: TPickupPoint) => (
            <TableRow key={pickupPoint?.id}>
              <TableCell> {pickupPoint?.name}</TableCell>
              <TableCell>{pickupPoint?.location}</TableCell>
              {/* action btn */}
              <TableCell className="">
                <div className="flex gap-2">
                  {/* action btn */}
                  <TableCell className="">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:bg-red-50 cursor-pointer"
                        onClick={() => {
                          setIsDeleteModalOpen(true);
                          setDeleteId(pickupPoint?.id);
                        }}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </div>
              </TableCell>
            </TableRow>
          ))}

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
          {pickupPoint?.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={2}
                className="text-center text-muted-foreground"
              >
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/*  create pickup point  modal */}

      <CreatePickupPointModal
        open={isPickupPointModalOpen}
        setOpen={setIsPickupPointModalOpen}
      />

      {/* delete a pickup point modal */}
      <DeletePickupPointModal
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        id={deleteId}
      />
    </>
  );
};

export default PickupPoint;

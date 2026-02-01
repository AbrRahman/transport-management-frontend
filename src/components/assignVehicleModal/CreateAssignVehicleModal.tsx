import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import RHFSelect from "../form/RHFSelect/RHFSelect";
import type { TRoute } from "../../types/routes.type";

import {
  createAssignVehicleSchema,
  type TAssignInputs,
} from "../../schema/assignFormValidationSchema";
import {
  useCreateAssignVehicle,
  useGetAllUnassignedRoute,
  useGetAllUnassignedVehicle,
} from "../../hooks/assignVehicle";
import type { TVehicle } from "../../types/vehicle.types";

type TModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const CreateAssignVehicleModal = ({ open, setOpen }: TModalProps) => {
  // react hook form config
  const form = useForm<TAssignInputs>({
    resolver: zodResolver(createAssignVehicleSchema),
    defaultValues: {
      routeId: "",
      vehicleId: "",
    },
  });

  //   get route set as a potion
  const { data: routes } = useGetAllUnassignedRoute();
  const RouteOptions = routes?.data?.map((route: TRoute) => ({
    label: route?.name,
    value: route?.id,
  }));

  // get all vehicle
  const { data: vehicles } = useGetAllUnassignedVehicle();
  console.log(vehicles?.data);
  const vehicleOptions = vehicles?.data?.map((vehicle: TVehicle) => ({
    label: vehicle?.vehicleNo,
    value: vehicle?.id,
  }));

  const { mutate: CreateAssignVehicle, isPending } = useCreateAssignVehicle();

  const handleAssignVehicle = async (data: TAssignInputs) => {
    await CreateAssignVehicle(data, {
      onSuccess: () => {
        setOpen(false);
        toast.success("Add data successfully");
        form.reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Assign Vehicle</DialogTitle>
        {/* form */}
        <form
          onSubmit={form.handleSubmit(handleAssignVehicle)}
          className="space-y-2"
        >
          <div className=" flex gap-2 w-full">
            <div className="basis-1/2">
              {/* route select */}
              <RHFSelect
                name="routeId"
                label="Select a Route"
                control={form.control}
                options={RouteOptions}
                placeholder="Select route"
              />
            </div>
            <div className="basis-1/2">
              {/* route select vehicle */}
              <RHFSelect
                name="vehicleId"
                label="Select a vehicle"
                control={form.control}
                options={vehicleOptions}
                placeholder="Select vehicle"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              className="cursor-pointer"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="cursor-pointer"
              type="submit"
              disabled={isPending}
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssignVehicleModal;

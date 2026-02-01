import { Dialog, DialogContent, DialogTitle } from "../../components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";

import {
  createVehicleSchema,
  type TVehicleInputs,
} from "../../schema/vehicleFormValidationSchema";
import RHFInput from "../form/RHFInput/RHFInput";
import { useCreateVehicle } from "../../hooks/vehicle.hook";
type TCreateVehicleModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const CreateVehicleModal = ({ open, setOpen }: TCreateVehicleModalProps) => {
  // react hook form config
  const form = useForm<TVehicleInputs>({
    resolver: zodResolver(createVehicleSchema),
    defaultValues: {
      vehicleNo: "",
      driverName: "",
      helperName: "",
      contactNo: "",
    },
  });

  const { mutate: createVehicle, isPending, isSuccess } = useCreateVehicle();

  // handle create vehicleData
  const handleCreateVehicleData = async (data: TVehicleInputs) => {
    // submit create vehicle data

    await createVehicle(data);
    if (isSuccess) {
      setOpen(false);
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Add a vehicle</DialogTitle>
        {/* form */}
        <form
          onSubmit={form.handleSubmit(handleCreateVehicleData)}
          className="space-y-2"
        >
          <RHFInput
            name="vehicleNo"
            control={form.control}
            placeholder="Enter vehicle number"
          />
          <RHFInput
            name="driverName"
            control={form.control}
            placeholder="Enter vehicle driver name"
          />
          <RHFInput
            name="helperName"
            control={form.control}
            placeholder="Enter vehicle helper name"
          />
          <RHFInput
            name="contactNo"
            control={form.control}
            placeholder="Enter vehicle contract number"
          />
          <div className="flex justify-end gap-4">
            <Button type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateVehicleModal;

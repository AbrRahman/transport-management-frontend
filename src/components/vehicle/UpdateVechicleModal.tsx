import { Dialog, DialogContent, DialogTitle } from "../../components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import RHFInput from "../form/RHFInput/RHFInput";
import {
  useGetSingleVehicle,
  useUpdateVehicle,
} from "../../hooks/vehicle.hook";
import {
  createVehicleSchema,
  type TVehicleInputs,
} from "../../schema/vehicleFormValidationSchema";
type TModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
};
const UpdateVehicleModal = ({ open, setOpen, id }: TModalProps) => {
  //   get vehicle data
  const { data } = useGetSingleVehicle(id, { enabled: open });
  const vehicle = data?.data;
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

  //   update ap hook call
  const { mutate: updateRoute, isPending } = useUpdateVehicle();

  //   update form handle
  const handleUpdateForm = async (data: Partial<TVehicleInputs>) => {
    await updateRoute(
      { id: id, data: data },
      {
        onSuccess: () => {
          setOpen(false);
          form.reset();
        },
      },
    );
  };
  // set input values
  useEffect(() => {
    if (vehicle) {
      form.reset({
        vehicleNo: vehicle?.vehicleNo,
        driverName: vehicle?.driverName,
        helperName: vehicle?.helperName,
        contactNo: vehicle?.contactNo,
      });
    }
  }, [vehicle, form]);
  return (
    <Dialog open={open && !!id} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Update Vehicle</DialogTitle>
        {/* form */}
        <form
          onSubmit={form.handleSubmit(handleUpdateForm)}
          className="space-y-2"
        >
          <RHFInput
            name="vehicleNo"
            level="Vehicle No"
            control={form.control}
            placeholder="Enter vehicle number"
          />
          <RHFInput
            name="driverName"
            level="Driver Name"
            control={form.control}
            placeholder="Enter vehicle driver name"
          />
          <RHFInput
            name="helperName"
            level="Helper Name"
            control={form.control}
            placeholder="Enter vehicle helper name"
          />
          <RHFInput
            name="contactNo"
            level="Contact No"
            control={form.control}
            placeholder="Enter vehicle contract number"
          />
          <div className="flex justify-end gap-4 cursor-pointer ">
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
              Update
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateVehicleModal;

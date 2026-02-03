import { Dialog, DialogContent, DialogTitle } from "../../components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import RHFInput from "../form/RHFInput/RHFInput";

import {
  createPickupPointSchema,
  type TPickupPointInputs,
} from "../../schema/pickupPointValidationSchema";
import {
  useGetSinglePickupPoint,
  useUpdatePickupPoint,
} from "../../hooks/pickupPoint.hook";
type TModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
};
const UpdatePickupPointModal = ({ open, setOpen, id }: TModalProps) => {
  //   get pickup value
  const { data } = useGetSinglePickupPoint(id, { enabled: open });
  const pickupPoint = data?.data;
  // react hook form config
  const form = useForm<TPickupPointInputs>({
    resolver: zodResolver(createPickupPointSchema),
    defaultValues: {
      name: "",
      location: "",
    },
  });

  //   update ap hook call
  const { mutate: updateRoute, isPending } = useUpdatePickupPoint();

  //   update form handle
  const handleUpdateForm = async (data: Partial<TPickupPointInputs>) => {
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
    if (pickupPoint) {
      form.reset({
        name: pickupPoint?.name,
        location: pickupPoint?.location,
      });
    }
  }, [pickupPoint, form]);
  return (
    <Dialog open={open && !!id} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Update Pickup point</DialogTitle>
        {/* form */}
        <form
          onSubmit={form.handleSubmit(handleUpdateForm)}
          className="space-y-2"
        >
          <RHFInput
            name="name"
            level="Pickup Point Name"
            control={form.control}
            placeholder="Enter pickup point name"
          />
          <RHFInput
            name="location"
            level="Pickup Point location"
            control={form.control}
            placeholder="Enter Pickup point location"
          />
          <div className="flex justify-end gap-4 cursor-pointer ">
            <Button type="button" onClick={() => setOpen(false)}>
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

export default UpdatePickupPointModal;

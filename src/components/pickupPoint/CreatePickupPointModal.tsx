import { Dialog, DialogContent, DialogTitle } from "../../components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import RHFInput from "../form/RHFInput/RHFInput";
import {
  createPickupPointSchema,
  type TPickupPointInputs,
} from "../../schema/pickupPointValidationSchema";
import { useCreatePickupPoint } from "../../hooks/pickupPoint.hook";
import { toast } from "sonner";
type TModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const CreatePickupPointModal = ({ open, setOpen }: TModalProps) => {
  // react hook form config
  const form = useForm<TPickupPointInputs>({
    resolver: zodResolver(createPickupPointSchema),
    defaultValues: {
      name: "",
      location: "",
    },
  });

  const { mutate: createPickupPoint, isPending } = useCreatePickupPoint();
  // handle create pickupPoint
  const handleCreatePickupPoint = async (data: TPickupPointInputs) => {
    // submit create pickup point

    await createPickupPoint(data, {
      onSuccess: () => {
        setOpen(false);
        toast.success("Pickup point created successfully");
        form.reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Add a vehicle</DialogTitle>
        {/* form */}
        <form
          onSubmit={form.handleSubmit(handleCreatePickupPoint)}
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

export default CreatePickupPointModal;

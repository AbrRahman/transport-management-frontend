import { Dialog, DialogContent, DialogTitle } from "../../components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import RHFInput from "../form/RHFInput/RHFInput";
import { toast } from "sonner";
import {
  createRouteSchema,
  type TRouteInputs,
} from "../../schema/routeValidationSchema";
import { useCreateRoute } from "../../hooks/route.hook";
type TModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const CreateRouteModal = ({ open, setOpen }: TModalProps) => {
  // react hook form config
  const form = useForm<TRouteInputs>({
    resolver: zodResolver(createRouteSchema),
    defaultValues: {
      name: "",
      startPoint: "",
      endPoint: "",
    },
  });

  const { mutate: createRoute, isPending } = useCreateRoute();

  const handleCreateRoute = async (data: TRouteInputs) => {
    await createRoute(data, {
      onSuccess: () => {
        setOpen(false);
        toast.success("Route created successfully");
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
          onSubmit={form.handleSubmit(handleCreateRoute)}
          className="space-y-2"
        >
          <RHFInput
            name="name"
            level="Route Name"
            control={form.control}
            placeholder="Enter route name"
          />
          <div className=" flex gap-2 w-full">
            <div className="basis-1/2">
              <RHFInput
                name="startPoint"
                level="Start Point"
                control={form.control}
                placeholder="Enter start point address"
              />
            </div>
            <div className="basis-1/2">
              <RHFInput
                name="endPoint"
                level="End Point"
                control={form.control}
                placeholder="Enter end point address"
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

export default CreateRouteModal;

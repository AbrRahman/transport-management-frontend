import { Dialog, DialogContent, DialogTitle } from "../../components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import RHFInput from "../form/RHFInput/RHFInput";
import { toast } from "sonner";

import { useGetAllRoutesByUnassignedTransferFee } from "../../hooks/route.hook";
import {
  createFeeMasterSchema,
  type TFeeMasterInputs,
} from "../../schema/feeMasterFormValidationSchema";
import RHFSelect from "../form/RHFSelect/RHFSelect";
import type { TRoute } from "../../types/routes.type";
import { useCreateTransportFee } from "../../hooks/feeMaster.hook";
type TModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const CreateFeeMasterModal = ({ open, setOpen }: TModalProps) => {
  // react hook form config
  const form = useForm({
    resolver: zodResolver(createFeeMasterSchema),
    defaultValues: {
      monthlyFee: "",
      routeId: "",
    },
  });

  //   get route set as a potion
  const { data, isLoading: routeLoading } =
    useGetAllRoutesByUnassignedTransferFee();
  const routes = data?.data;
  const options = routes?.map((route: TRoute) => ({
    label: route?.name,
    value: route?.id,
  }));

  const { mutate: createTransportFee, isPending } = useCreateTransportFee();

  const handleCreateFee = async (data: TFeeMasterInputs) => {
    await createTransportFee(data, {
      onSuccess: () => {
        setOpen(false);
        toast.success("Transfer fee assign successfully");
        form.reset();
      },
    });
  };
  // if route data is empty then close modal
  useEffect(() => {
    if (!open) return;
    if (routeLoading) return;
    // route empty
    if (routes && routes.length == 0) {
      toast.error("No available routes found. Please create a route first.");
      setOpen(false);
    }
  }, [open, routeLoading, routes, setOpen]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Add a transport fee</DialogTitle>
        {/* form */}
        <form
          onSubmit={form.handleSubmit(handleCreateFee)}
          className="space-y-2"
        >
          {/* route select */}
          <RHFSelect
            name="routeId"
            label="Select a Route"
            control={form.control}
            options={options}
            placeholder="Select route"
          />

          {/* enter fee amount */}
          <RHFInput
            name="monthlyFee"
            level="Amount(Tk)"
            type="number"
            control={form.control}
            placeholder="Enter transport fee"
          />
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

export default CreateFeeMasterModal;

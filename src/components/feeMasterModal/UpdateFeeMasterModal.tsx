import { Dialog, DialogContent, DialogTitle } from "../../components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import RHFInput from "../form/RHFInput/RHFInput";
import { toast } from "sonner";

import {
  updateFeeMasterSchema,
  type TFeeMasterInputs,
} from "../../schema/feeMasterFormValidationSchema";

import {
  useGetSingleTransportFee,
  useUpdateRouteTransferFee,
} from "../../hooks/feeMaster.hook";
import { Input } from "../ui/input";
type TModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
};
const UpdateFeeMasterModal = ({ open, setOpen, id }: TModalProps) => {
  // react hook form config
  const form = useForm({
    resolver: zodResolver(updateFeeMasterSchema),
    defaultValues: {
      monthlyFee: "",
    },
  });

  //  get route transport data
  const { data } = useGetSingleTransportFee(id);
  const feeMasterData = data?.data;
  const { mutate: updateTransportFee, isPending } = useUpdateRouteTransferFee();

  const handleUpdateBtn = async (data: Partial<TFeeMasterInputs>) => {
    await updateTransportFee(
      { id: id, data: { monthlyFee: data?.monthlyFee as number } },
      {
        onSuccess: () => {
          setOpen(false);
          toast.success("Transfer fee update successfully");
        },
      },
    );
  };

  useEffect(() => {
    if (feeMasterData) {
      form.reset({
        monthlyFee: feeMasterData?.monthlyFee,
      });
    }
  }, [feeMasterData, form]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Add a transport fee</DialogTitle>
        {/* form */}
        <form
          onSubmit={form.handleSubmit(handleUpdateBtn)}
          className="space-y-2"
        >
          {/* set route value */}
          <div>
            <h3 className="text-black text-sm mb-0.5 ml-0.5">Route Name</h3>
            <Input value={feeMasterData?.route?.name} disabled />
          </div>

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
              Update
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateFeeMasterModal;

import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import RHFInput from "../form/RHFInput/RHFInput";
import { toast } from "sonner";

import { useGetAllRoutes } from "../../hooks/route.hook";
import RHFSelect from "../form/RHFSelect/RHFSelect";
import type { TRoute } from "../../types/routes.type";
import {
  createRoutePickupPointSchema,
  type TRoutePickupPointInputs,
} from "../../schema/routePickupPointFormValidationSchema";
import { useGetAllPickupPoint } from "../../hooks/pickupPoint.hook";
import type { TPickupPoint } from "../../types/pickupPoint.type";
import { useCreateRoutePickupPoint } from "../../hooks/routePickupPoint";
type TModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const CreateRoutePickupPointModal = ({ open, setOpen }: TModalProps) => {
  // react hook form config
  const form = useForm({
    resolver: zodResolver(createRoutePickupPointSchema),
    defaultValues: {
      routeId: "",
      pickupPointId: "",
      stopOrder: "",
    },
  });

  //   get route set as a potion
  const { data } = useGetAllRoutes();
  const routes = data?.data;
  const RouteOptions = routes?.map((route: TRoute) => ({
    label: route?.name,
    value: route?.id,
  }));

  // get all pickup point
  const { data: pickupPoints } = useGetAllPickupPoint();
  const pickupPointOptions = pickupPoints?.data?.map(
    (pickupPoint: TPickupPoint) => ({
      label: pickupPoint?.name,
      value: pickupPoint?.id,
    }),
  );

  const { mutate: createRoutePickupPoint, isPending } =
    useCreateRoutePickupPoint();

  const handleCreateRoutePickupPoint = async (
    data: TRoutePickupPointInputs,
  ) => {
    await createRoutePickupPoint(data, {
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
        <DialogTitle>Add a vehicle</DialogTitle>
        {/* form */}
        <form
          onSubmit={form.handleSubmit(handleCreateRoutePickupPoint)}
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
              {/* route select pickup point */}
              <RHFSelect
                name="pickupPointId"
                label="Select a Pickup Point"
                control={form.control}
                options={pickupPointOptions}
                placeholder="Select Pickup Point"
              />
            </div>
          </div>
          {/* stop orders*/}
          <RHFInput
            name="stopOrder"
            level="Enter Stop order"
            type="number"
            control={form.control}
            placeholder="Enter Stope order"
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

export default CreateRoutePickupPointModal;

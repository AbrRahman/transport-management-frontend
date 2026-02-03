import { Dialog, DialogContent, DialogTitle } from "../../components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import RHFInput from "../form/RHFInput/RHFInput";
import {
  createRouteSchema,
  type TRouteInputs,
} from "../../schema/routeValidationSchema";
import { useGetSingleRoute, useUpdateRoute } from "../../hooks/route.hook";
type TModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
};
const UpdateRouteModal = ({ open, setOpen, id }: TModalProps) => {
  //   get route value
  const { data } = useGetSingleRoute(id, { enabled: open });
  const route = data?.data;
  // react hook form config
  const form = useForm<TRouteInputs>({
    resolver: zodResolver(createRouteSchema),
    defaultValues: {
      name: "",
      startPoint: "",
      endPoint: "",
    },
  });

  //   update ap hook call
  const { mutate: updateRoute, isPending } = useUpdateRoute();

  //   update btn handle
  const handleUpdateBtn = async (data: Partial<TRouteInputs>) => {
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
    if (route) {
      form.reset({
        name: route?.name,
        startPoint: route?.startPoint,
        endPoint: route?.endPoint,
      });
    }
  }, [route, form]);
  return (
    <Dialog open={open && !!id} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Update Route</DialogTitle>
        {/* form */}
        <form
          onSubmit={form.handleSubmit(handleUpdateBtn)}
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

export default UpdateRouteModal;

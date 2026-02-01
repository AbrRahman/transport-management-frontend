import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import RHFSelect from "../form/RHFSelect/RHFSelect";
import type { TRoute } from "../../types/routes.type";

import {
  createAssignStudentSchema,
  type TAssignStudentInputs,
} from "../../schema/assignStudentValidationSchema";
import {
  useCreateStudentAssignment,
  useGetAllStudent,
} from "../../hooks/studentAssign.hook";
import { useGetAllRoutes } from "../../hooks/route.hook";
import { useGetPickupPointBaseOnRoute } from "../../hooks/pickupPoint.hook";

type TModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const CreateAssignStudentModal = ({ open, setOpen }: TModalProps) => {
  // react hook form config
  const form = useForm<TAssignStudentInputs>({
    resolver: zodResolver(createAssignStudentSchema),
    defaultValues: {
      studentId: "",
      routeId: "",
      pickupPointId: "",
    },
  });

  //   get student set as option
  const { data: students } = useGetAllStudent();
  const StudentOption = students?.data?.map(
    (student: { name: string; id: string }) => ({
      label: student?.name,
      value: student?.id,
    }),
  );
  //   get route set as a potion
  const { data: routes } = useGetAllRoutes();
  const RouteOptions = routes?.data?.map((route: TRoute) => ({
    label: route?.name,
    value: route?.id,
  }));
  const routeId = form?.watch("routeId");
  // get all pickup point data
  const { data: pickupPointList } = useGetPickupPointBaseOnRoute(routeId);

  const pickupPointOptions = pickupPointList?.data?.map(
    (pickupPoint: { pickupPoint: { id: string; name: string } }) => ({
      label: pickupPoint?.pickupPoint?.name,
      value: pickupPoint?.pickupPoint?.id,
    }),
  );

  const { mutate: createStudentAssignment, isPending } =
    useCreateStudentAssignment();

  const handleAssignStudent = async (data: TAssignStudentInputs) => {
    const month = Number(new Date().toISOString().split("-")[1]);
    const newData: {
      month: number;
      studentId: string;
      routeId: string;
      pickupPointId: string;
    } = {
      month: month,
      ...data,
    };

    await createStudentAssignment(newData, {
      onSuccess: () => {
        setOpen(false);
        toast.success("Add data successfully");
        form.reset();
      },
    });
  };
  useEffect(() => {
    form.setValue("pickupPointId", "");
  }, [routeId]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Assign Student</DialogTitle>
        {/* form */}
        <form
          onSubmit={form.handleSubmit(handleAssignStudent)}
          className="space-y-2"
        >
          {/* select student */}
          <RHFSelect
            name="studentId"
            label="Select a student"
            control={form.control}
            options={StudentOption}
            placeholder="Select student"
          />
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
                name="pickupPointId"
                label="Select a pickupPoint"
                control={form.control}
                options={pickupPointOptions}
                placeholder="Select PickupPoint"
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

export default CreateAssignStudentModal;

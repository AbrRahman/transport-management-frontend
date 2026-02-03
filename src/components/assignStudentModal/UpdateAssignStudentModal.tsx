import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { useUpdateAssignStudent } from "../../hooks/studentAssign.hook";
type TModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
};
const UpdateAssignStudentModal = ({ open, setOpen, id }: TModalProps) => {
  const { mutate: updateAssignStudent, isPending } = useUpdateAssignStudent();

  const handleUpdate = async () => {
    await updateAssignStudent(id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Do you really want to change active status?</DialogTitle>

        <div className="flex justify-end gap-4">
          <Button
            className="cursor-pointer"
            type="button"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            className="cursor-pointer"
            type="submit"
            disabled={isPending}
          >
            Confirm Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAssignStudentModal;

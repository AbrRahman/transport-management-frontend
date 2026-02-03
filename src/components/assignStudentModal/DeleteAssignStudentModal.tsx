import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { useDeleteAssignStudent } from "../../hooks/studentAssign.hook";
type TModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
};
const DeleteAssignStudentModal = ({ open, setOpen, id }: TModalProps) => {
  const { mutate: deleteAssignStudent, isPending } = useDeleteAssignStudent();

  const handleDelete = async () => {
    await deleteAssignStudent(id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Do you really want to delete this record?</DialogTitle>

        <div className="flex justify-end gap-4">
          <Button
            className="cursor-pointer"
            type="button"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            className="cursor-pointer"
            type="submit"
            disabled={isPending}
          >
            Confirm Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAssignStudentModal;

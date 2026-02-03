import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { useDeleteRoute } from "../../hooks/route.hook";
type TModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
};
const DeleteRouteModal = ({ open, setOpen, id }: TModalProps) => {
  const { mutate: deleteVehicle, isPending } = useDeleteRoute();

  const handleDelete = async () => {
    console.log(id);
    await deleteVehicle(id, {
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

export default DeleteRouteModal;

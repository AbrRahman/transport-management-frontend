import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { useDeleteRoutePickupPoint } from "../../hooks/routePickupPoint";
type TModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
};
const DeleteRoutePickupPointModal = ({ open, setOpen, id }: TModalProps) => {
  const { mutate: deleteRoutePickupPoint, isPending } =
    useDeleteRoutePickupPoint();

  const handleDelete = async () => {
    console.log(id);
    await deleteRoutePickupPoint(id, {
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

export default DeleteRoutePickupPointModal;

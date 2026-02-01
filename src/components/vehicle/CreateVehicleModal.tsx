import { Dialog, DialogContent, DialogTitle } from "../../components/ui/dialog";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
type TCreateVehicleModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const CreateVehicleModal = ({ open, setOpen }: TCreateVehicleModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Add a vehicle</DialogTitle>
        <h1>Hello world</h1>
        <div className="flex justify-end gap-4">
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateVehicleModal;

import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { Pencil, Trash2 } from "lucide-react";
import { useGetAllTransportFee } from "../../hooks/feeMaster.hook";
import type { TFeeMaster } from "../../types/feeMaster.type";
import CreateFeeMasterModal from "../../components/feeMasterModal/CreateFeeMasterModal";
import DeleteFeeMasterModal from "../../components/feeMasterModal/DeleteFeeMasterModal";
import UpdateFeeMasterModal from "../../components/feeMasterModal/UpdateFeeMasterModal";

const FeeMaster = () => {
  const [isFeeMasterModalOpen, setIsFeeMasterModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [updateId, setUpdateId] = useState("");

  const { data, isLoading } = useGetAllTransportFee();
  const feeMastersData = data?.data;

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h1 className=" text-2xl font-bold text-black">Fee Master</h1>
        <Button
          onClick={() => {
            setIsFeeMasterModalOpen(true);
          }}
          className=" cursor-pointer"
        >
          Add a New
        </Button>
      </div>
      {/* table */}
      <Table className=" overflow-x-scroll">
        <TableHeader>
          <TableRow>
            <TableHead>Route Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Cycle</TableHead>
            <TableHead>Start Point</TableHead>
            <TableHead>End Point</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {feeMastersData?.map((feeMaster: TFeeMaster) => (
            <TableRow key={feeMaster?.id}>
              <TableCell> {feeMaster?.route.name}</TableCell>
              <TableCell>{feeMaster?.monthlyFee}</TableCell>
              <TableCell>Monthly</TableCell>
              <TableCell> {feeMaster?.route.startPoint}</TableCell>
              <TableCell> {feeMaster?.route.endPoint}</TableCell>

              {/* action btn */}
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-blue-600 hover:bg-blue-50  cursor-pointer"
                    onClick={() => {
                      setIsUpdateModalOpen(true);
                      setUpdateId(feeMaster?.id);
                    }}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-red-600 hover:bg-red-50 cursor-pointer"
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setDeleteId(feeMaster?.id);
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}

          {/* show loading spinner */}

          {isLoading && (
            <TableRow>
              <TableCell colSpan={6} className="h-40 text-center">
                <div className="flex justify-center items-center w-full">
                  <LoadingSpinner />
                </div>
              </TableCell>
            </TableRow>
          )}

          {/* vehicle list is empty */}
          {feeMastersData?.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-muted-foreground"
              >
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/*  create transfer fee  modal */}
      <CreateFeeMasterModal
        open={isFeeMasterModalOpen}
        setOpen={setIsFeeMasterModalOpen}
      />

      {/* update transport fee modal */}
      <UpdateFeeMasterModal
        open={isUpdateModalOpen}
        setOpen={setIsUpdateModalOpen}
        id={updateId}
      />

      {/* delete transfer fee modal */}
      <DeleteFeeMasterModal
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        id={deleteId}
      />
    </>
  );
};

export default FeeMaster;

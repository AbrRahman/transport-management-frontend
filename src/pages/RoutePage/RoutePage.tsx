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
import type { TRoute } from "../../types/routes.type";
import { useGetAllRoutes } from "../../hooks/route.hook";
import CreateRouteModal from "../../components/routeModal/CreateRouteModal";
import DeleteRouteModal from "../../components/routeModal/DeleteRouteModal";
import UpdateRouteModal from "../../components/routeModal/UpdateRouteModal";

const RoutePage = () => {
  const [isRoutePageModalOpen, setIsRoutePageModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateId, setUpdateId] = useState("");

  const { data, isLoading } = useGetAllRoutes();

  const routes = data?.data;
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h1 className=" text-2xl font-bold text-black">Routes</h1>
        <Button
          onClick={() => {
            setIsRoutePageModalOpen(true);
          }}
          className=" cursor-pointer"
        >
          Add a Route
        </Button>
      </div>
      {/* table */}
      <Table className=" overflow-x-scroll">
        <TableHeader>
          <TableRow>
            <TableHead>Route Name</TableHead>
            <TableHead>Start Point</TableHead>
            <TableHead>End Point</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {routes?.map((route: TRoute) => (
            <TableRow key={route?.id}>
              <TableCell> {route?.name}</TableCell>
              <TableCell>{route?.startPoint}</TableCell>
              <TableCell>{route?.endPoint}</TableCell>
              {/* action btn */}
              <TableCell>
                <div className="flex gap-2">
                  {/* action btn */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-blue-600 hover:bg-blue-50  cursor-pointer"
                    onClick={() => {
                      setIsUpdateModalOpen(true);
                      setUpdateId(route?.id);
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
                      setDeleteId(route?.id);
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
              <TableCell colSpan={3} className="h-40 text-center">
                <div className="flex justify-center items-center w-full">
                  <LoadingSpinner />
                </div>
              </TableCell>
            </TableRow>
          )}

          {/* vehicle list is empty */}
          {routes?.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={2}
                className="text-center text-muted-foreground"
              >
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/*  create route  modal */}

      <CreateRouteModal
        open={isRoutePageModalOpen}
        setOpen={setIsRoutePageModalOpen}
      />

      {/* update route modal */}
      <UpdateRouteModal
        open={isUpdateModalOpen}
        setOpen={setIsUpdateModalOpen}
        id={updateId}
      />

      {/* delete a pickup point modal */}
      <DeleteRouteModal
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        id={deleteId}
      />
    </>
  );
};

export default RoutePage;

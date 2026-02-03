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
import { Trash2 } from "lucide-react";
import CreateRoutePickupPointModal from "../../components/routePickupPointModal/CreateRoutePickupPointModal";
import DeleteRoutePickupPointModal from "../../components/routePickupPointModal/DeleteRoutePickupPointModal";
import { useGetRoutesWithStops } from "../../hooks/route.hook";
import type { TRouteWithPickupPoints } from "../../types/routes.type";

const RoutePickupPoint = () => {
  const [isRoutePickupPointOpen, setIsRoutePickupPointOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const { data, isLoading } = useGetRoutesWithStops();
  const routesWithStops = data?.data;
  console.log(routesWithStops);
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h1 className=" text-2xl font-bold text-black">Route Map</h1>
        <Button
          onClick={() => {
            setIsRoutePickupPointOpen(true);
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
            <TableHead>Route</TableHead>
            <TableHead>Pickup Point</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {routesWithStops?.map((routesWithStop: TRouteWithPickupPoints) => (
            <TableRow key={routesWithStop?.id}>
              <TableCell> {routesWithStop?.name}</TableCell>
              <TableCell>
                <ol className="list-decimal pl-4 space-y-1">
                  {routesWithStop.routePickupPoint?.map((stop) => (
                    <li key={stop.stopOrder} className="text-sm">
                      {stop.pickupPoint.name}
                    </li>
                  ))}
                </ol>
              </TableCell>

              <TableCell>{routesWithStop?.endPoint}</TableCell>
              {/* action btn */}
              <TableCell className="">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-red-600 hover:bg-red-50 cursor-pointer"
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      // setDeleteId(routesWithStop?.id);
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
              <TableCell colSpan={5} className="h-40 text-center">
                <div className="flex justify-center items-center w-full">
                  <LoadingSpinner />
                </div>
              </TableCell>
            </TableRow>
          )}

          {/*  list is empty */}
          {routesWithStops?.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground"
              >
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/*  create Create RoutePickupPoint  model */}

      <CreateRoutePickupPointModal
        open={isRoutePickupPointOpen}
        setOpen={setIsRoutePickupPointOpen}
      />
      {/* delete a route pickup point modal */}
      <DeleteRoutePickupPointModal
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        id={deleteId}
      />
    </>
  );
};

export default RoutePickupPoint;

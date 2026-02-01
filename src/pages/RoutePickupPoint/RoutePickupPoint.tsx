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
import { useGetAllRoutePickupPoint } from "../../hooks/routePickupPoint";
import type { TRoutePickupPoint } from "../../types/routePickupPoint.type";
import CreateRoutePickupPointModal from "../../components/routePickupPointModal/CreateRoutePickupPointModal";

const RoutePickupPoint = () => {
  const [isRoutePickupPointOpen, setIsRoutePickupPointOpen] = useState(false);
  const { data, isLoading } = useGetAllRoutePickupPoint();
  const routePickupPointData = data?.data;
  console.log(routePickupPointData);
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
            <TableHead>Stop No</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {routePickupPointData?.map((routePickupPoint: TRoutePickupPoint) => (
            <TableRow key={routePickupPoint?.id}>
              <TableCell> {routePickupPoint?.route?.name}</TableCell>
              <TableCell> {routePickupPoint?.pickupPoint?.name}</TableCell>
              <TableCell>{routePickupPoint?.stopOrder}</TableCell>
              <TableCell>{routePickupPoint?.route?.endPoint}</TableCell>
              {/* action btn */}
              <TableCell className="text-right">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-blue-600 hover:bg-blue-50"
                    onClick={() => console.log("Edit", routePickupPoint?.id)}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-red-600 hover:bg-red-50"
                    onClick={() => console.log("Delete", routePickupPoint?.id)}
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
          {routePickupPointData?.length === 0 && (
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
    </>
  );
};

export default RoutePickupPoint;

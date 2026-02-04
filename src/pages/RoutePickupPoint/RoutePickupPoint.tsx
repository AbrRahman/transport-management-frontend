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
import CreateRoutePickupPointModal from "../../components/routePickupPointModal/CreateRoutePickupPointModal";
import { useGetRoutesWithStops } from "../../hooks/route.hook";
import type { TRouteWithPickupPoints } from "../../types/routes.type";

const RoutePickupPoint = () => {
  const [isRoutePickupPointOpen, setIsRoutePickupPointOpen] = useState(false);

  const { data, isLoading } = useGetRoutesWithStops();
  const routesWithStops = data?.data;

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
          </TableRow>
        </TableHeader>

        <TableBody>
          {routesWithStops?.map((routesWithStop: TRouteWithPickupPoints) => (
            <TableRow key={routesWithStop?.id}>
              <TableCell> {routesWithStop?.name}</TableCell>
              <TableCell>
                {routesWithStop?.routePickupPoint?.length == 0 && (
                  <span>No added pickup point</span>
                )}
                <ol className="list-decimal pl-4 space-y-1">
                  {routesWithStop?.routePickupPoint?.map((stop) => (
                    <li key={stop?.stopOrder} className="text-sm">
                      {stop?.pickupPoint?.name}
                    </li>
                  ))}
                </ol>
              </TableCell>
              <TableCell>{routesWithStop?.endPoint}</TableCell>
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

          {/*  list is empty */}
          {routesWithStops?.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={3}
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

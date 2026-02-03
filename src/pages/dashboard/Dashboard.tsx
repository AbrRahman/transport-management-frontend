import { Bus, BusFront, Route, User } from "lucide-react";
import { useGetAllRoutes } from "../../hooks/route.hook";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { useGetVehicles } from "../../hooks/vehicle.hook";
import { useGetAllAssignVehicle } from "../../hooks/assignVehicle.hook";
import { useGetAllAssignStudent } from "../../hooks/studentAssign.hook";

const Dashboard = () => {
  // call api hooks
  const { data: route, isLoading } = useGetAllRoutes();
  const { data: vehicles } = useGetVehicles();
  const { data: routeVehicle } = useGetAllAssignVehicle();
  const { data: assignStudent } = useGetAllAssignStudent();

  // dashboard items
  const dashboardItems = [
    {
      title: "Active Routes",
      icon: Route,
      color: "text-blue-600",
      count: route?.data?.length,
    },
    {
      title: "Vehicles",
      icon: Bus,
      color: "text-green-600",
      count: vehicles?.data?.length,
    },
    {
      title: "Vehicle on Road",
      icon: BusFront,
      color: "text-orange-600",
      count: routeVehicle?.data?.length,
    },
    {
      title: "Assign Student",
      icon: User,
      color: "text-purple-600",
      count: assignStudent?.data?.length,
    },
  ];
  // show loading spine
  if (isLoading) {
    return (
      <div className=" flex justify-center items-center h-[40vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className=" grid grid-cols-2 lg:grid-cols-4 gap-4">
      {dashboardItems?.map((dashboardItem) => {
        const Icon = dashboardItem?.icon;
        return (
          <div
            key={dashboardItem?.title}
            className="flex items-center gap-4 rounded-xl bg-blue-50 p-5"
          >
            <div
              className={`flex h-12 w-12 ${dashboardItem?.color} items-center justify-center rounded-lg bg-blue-100`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold ">{dashboardItem?.title}</p>
              <p className="text-xl font-bold">{dashboardItem?.count}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;

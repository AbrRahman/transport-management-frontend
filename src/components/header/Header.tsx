import { SidebarTrigger } from "../ui/sidebar";
const Header = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold text-slate-800">
          Student Transport
        </h1>
      </div>
    </header>
  );
};

export default Header;

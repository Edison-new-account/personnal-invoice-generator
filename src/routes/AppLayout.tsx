import Header from "@/components/screen/Header";
import { Toaster } from "@/components/ui/sonner";
import { FC, PropsWithChildren } from "react";

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <Header className="flex items-center justify-between" />
      <div className="bg-gray-100 grow w-full overflow-auto">{children}</div>
      <Toaster richColors />
    </div>
  );
};
export default AppLayout;

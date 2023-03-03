import { useSideBarStore } from "@/hooks/sideBarStore";
import { useState } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import Slide from "@mui/material/Slide";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const sideBar = useSideBarStore();
  return (
    <>
      <Navbar />
      {sideBar.estaVisible === true && <SideBar />}
      {/* <Slide in={sideBar.estaVisible} mountOnEnter unmountOnExit>
        <SideBar />
      </Slide> */}

      <main className="text-slate-600 pt-16 w-full h-screen overflow-hidden absolute top-0 z-0 bg-gray-100">
        <div className="w-full h-full overflow-y-auto p-4">{children}</div>
      </main>
    </>
  );
}

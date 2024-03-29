import { useSideBarStore } from "@/src/hooks/sideBarStore";
import { useState } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import Slide from "@mui/material/Slide";
import { Snackbar, Alert } from "@mui/material";
import { useAlert } from "@/src/hooks/alertStore";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { estaVisible: sideBarVisible } = useSideBarStore();
  const cerrarSideBar = useSideBarStore((state) => state.cerrarSideBar);
  const [open, setOpen] = useState(false);
  const {
    estaVisible: alerta,
    cerrarAlerta,
    mensaje: alertaMensaje,
    props: alertProps,
  } = useAlert((state) => state);

  return (
    <>
      <Navbar />
      <main
        className="text-slate-600 pt-16 w-full h-screen flex flex-col md:flex-row gap-4 overflow-hidden absolute top-0 z-0 bg-marn-dark p-4"
        onClick={() => {
          if (sideBarVisible === true) {
            cerrarSideBar();
          }
          setOpen(true);
        }}
      >
        <SideBar />
        <div
          className="w-full h-full overflow-y-auto p-4 bg-gray-200 rounded-md
          }"
        >
          {children}
        </div>
      </main>
      <Snackbar open={alerta} autoHideDuration={5000} onClose={cerrarAlerta}>
        <Alert
          onClose={cerrarAlerta}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
          {...alertProps}
        >
          {alertaMensaje}
        </Alert>
      </Snackbar>
    </>
  );
}

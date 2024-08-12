import { Suspense } from "react";
// import Map from "./components/Map";
import Navbar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import Loader from "./components/common/Loader";
import Router from "./routes/route";
import { Toaster } from "react-hot-toast";
import { useCycle } from "framer-motion";
import "./App.css";
import { FloatingOverlay } from "@floating-ui/react";

function App() {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navbar toggle={toggleOpen} />
      {isOpen && (
        <FloatingOverlay
          lockScroll
          className="bg-gray-300 z-50 bg-opacity-50 backdrop-blur flex px-2"
        />
      )}
      <SideBar isOpen={isOpen} toggle={toggleOpen} />
      <Toaster />
      <main className="px-2 md:px-4 py-10 md:py-20">
        <Suspense
          fallback={
            <div className="min-h-[80vh] grid place-items-center w-full text-xl md:text-3xl">
              <Loader />
            </div>
          }
        >
          <Router />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;

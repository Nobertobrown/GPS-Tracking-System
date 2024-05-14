import { Suspense } from "react";
// import Map from "./components/Map";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Loader from "./components/common/Loader";
import Router from "./routes/route";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navbar />
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

import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./footer";
import Navbar from "./navbar";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-full mx-auto w-full">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>

      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}

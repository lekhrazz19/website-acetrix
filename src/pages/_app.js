import "@/styles/globals.css";
import { Orbitron, Rajdhani } from "next/font/google";
import LoadingAnimation from "../components/Loading";
import { useEffect, useState } from "react";
import { ContextProvider } from "@/context";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500); // Set loading to false after 4.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <ContextProvider>
      <div className={`${orbitron.variable} ${rajdhani.variable} acetrix-main font-sans`}>
        {loading ? <LoadingAnimation /> : <Component {...pageProps} />}
      </div>
    </ContextProvider>
  );
}

export default MyApp;

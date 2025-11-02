// pages/_app.tsx
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Blog from "./blog/blog";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar/>
      <Component {...pageProps} />

    </>
  );
}

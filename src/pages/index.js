import Navbar from "@/components/Navbar";
import Image from "next/image";
import Blog from "./blog/blog";

export default function Home() {
  return (
    <div className="bg-black text-white box-border m-0 p-0">
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-5 px-5 py-10 text-center">
        <img 
          className="block mx-auto w-1/2" 
          src="/images/itachi-uchiha-naruto-amoled-black-background-minimal-art-3840x2160-6478.jpg"
          alt="Itachi"
        />

        <iframe 
          width="853" 
          height="480" 
          src="https://www.youtube.com/embed/7RUylQDHQMk"
          className="rounded"
        ></iframe>
        <iframe 
          width="853" 
          height="480" 
          src="https://www.youtube.com/embed/A-NQaCzzk4o"
          className="rounded"
        ></iframe>
        <iframe 
          width="853" 
          height="480" 
          src="https://www.youtube.com/embed/q0xc49VGrGc"
          className="rounded"
        ></iframe>
        <iframe 
          width="853" 
          height="480" 
          src="https://www.youtube.com/embed/EIRLTsjrDQI"
          className="rounded"
        ></iframe>
      </div>
    </div>
  );
}
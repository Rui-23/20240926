// import Image from "next/image";
import { inter } from "./ui/fonts";
import Header from '@/app/ui/header';
import Footer from '@/app/ui/footer';
import HeroText from "./ui/hero-text";
import UploadBox from "./ui/upload-box";
import RotateSection from "./ui/rotate-section";

export default function Home() {
  return (
    <div className={`w-full flex flex-col ${inter.className}`}>
      <main className="flex flex-col">
        <Header />
        <div className="text-black h-screen">
          <div className="container mx-auto py-20 space-y-5">
            <HeroText />
            <UploadBox />
            {/* <RotateSection /> */}
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

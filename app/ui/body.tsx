import HeroText from "@/app/ui/hero-text";
import UploadBox from "@/app/ui/upload-box";
import RotateSection from "@/app/ui/rotate-section";

export default function Body() {
  return (
    <div className="text-black h-screen">
      <div className="container mx-auto py-20 space-y-5">
        <HeroText />
        <UploadBox />
        {/* <RotateSection /> */}
      </div>
    </div>
  );
}
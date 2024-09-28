import { inter } from "@/app/ui/fonts";
import Header from '@/app/ui/header';
import Footer from '@/app/ui/footer';
import Body from "@/app/ui/body";

export default function Home() {
  return (
    <div className={`w-full flex flex-col ${inter.className}`}>
      <main className="flex flex-col">
        <Header />
        <Body />
        <Footer />
      </main>
    </div>
  );
}

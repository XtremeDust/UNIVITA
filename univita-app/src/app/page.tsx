import { Inconsolata, Literata } from "next/font/google";
import Image from "next/image";
import Header from "@/components/header/MainHeader";
import Footer from "@/components/footer/MainFooter";
import Banner from "@/components/sections/banner";
import Features from "@/components/sections/featuresSection";
import Btcomment from "@/components/sections/ButtonComent";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-dvh bg-amber-100">
      {/*Header*/}
      <Header></Header>
      
      {/*content*/}
      <main className="bg-blue-400">          
            <div className="Hero Banner">
            <Banner/>
            </div>
            <div className="features">
              <Features/>
            </div>
            <div>
              {/*promocion*/}
            </div>
            <div>
              {/*apartados e informacion*/}
            </div>
            <div>
              {/*deja tu comentario*/}
              <Btcomment/>
            </div>
      </main>
      {/*Footer*/}
      <Footer></Footer>
    </div>
  );
}

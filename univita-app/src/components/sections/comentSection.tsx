 "use client"
import Btcomment from "@/components/sections/ButtonComent";
import Comentars from "@/components/sections/comentarios";

 export default function univita(){
    return(
        <section className="comenSection grid gap-5"> 
            <section className="comentarios flex flex-col w-full m-0 place-items-center text-center place-content-center space-y-5 overflow-hidden p-1">
                <div className="text-[20px] md:text-2xl font-medium flex flex-col gap-1">
                    <h3  className="lg:text-3xl font-mono">Tu opinión tambien importa</h3>
                    <p className="ml-5 text-[16px] text-justify">ayudanos a crecer contigo y mejorar la expertiencia del deporte</p>                
                </div>

                <div className="group space-y-4">
                    {/*comentarios 1 */}
                    <div className=" flex flex-nowrap place-content-center gap-5 animate-scroll-rigth">
                        <Comentars mayor={2} menor={7}/>
                        <Comentars mayor={2} menor={7}/>
                    </div>

                    {/*comentarios 2 */}
                    <div className="flex flex-nowrap place-content-center gap-5 animate-scroll-left ">
                        <Comentars mayor={0} menor={5}/>
                        <Comentars mayor={0} menor={5}/>
                    </div>
                </div>
                
            </section>
            <div className="btComen">
                {/*deja tu comentario*/}
                <Btcomment/>
            </div>  
            
        </section>
    )
 }
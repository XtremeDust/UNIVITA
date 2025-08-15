 "use client"
import Btcomment from "@/components/sections/ButtonComent";
import Comentars from "@/components/sections/comentarios";

 export default function univita(){
    return(
        <section className="comenSection grid gap-5 space-y-10"> 
            <section className="comentarios flex flex-col w-full m-0 place-items-center text-center place-content-center space-y-5 overflow-hidden p-1">
                <div className="text-[20px] md:text-2xl font-medium flex flex-col gap-1 space-y-3">
                    <h3  className="lg:text-3xl font-mono">Tu opinión tambien importa</h3>
                    <p className="ml-5 text-justify">ayudanos a crecer contigo y mejorar la expertiencia del deporte</p>                
                </div>

                {/*comentarios 1 */}
                <div className="flex flex-nowrap place-content-center lg:gap-4 mx-auto space-x-7 lg:space-x-2 ">
                    <Comentars mayor={2} menor={7}/>                   
                </div>

                                {/*comentarios 2 */}
                 <div className="flex flex-nowrap place-content-center gap-4  ">
                    <Comentars mayor={0} menor={5}/>
                </div>
                
            </section>
            <div className="btComen">
                {/*deja tu comentario*/}
                <Btcomment/>
            </div>  
            
        </section>
    )
 }
'use client'
import {indicadorProps, coments} from "@/types/comentarios"

    export default function Comentars({mayor, menor}:indicadorProps){
        return(
            <div className="flex flex-row place-content-center gap-5 md:w-1/2 group">
                {coments.map((coment, index)=>( 
                    <div key={index} className={` odd:bg-unimar odd:text-white odd:border-white bg-gray-50  border-2 border-blue-400 ring-2 ring-unimar odd:ring-gray-400 rounded-lg ${coment.id>mayor && coment.id<menor ? 'visible' : 'hidden'} opacity-100 group-hover:opacity-50 hover:opacity-100 hover:scale-105 transition-all duration-300 `}>
                    {(coment.id>mayor && coment.id<menor) &&(
                        <div key={coment.id} className={` h-full w-sm md:w-md p-2 space-y-3 place-content-center place-items-center `}>
                            <div className="flex flex-row space-x-3 items-center w-full px-2 ">
                                <div className={` bg-gray-400 size-10 rounded-full`}>
                                    <img src={coment.avatar} alt="logo" />
                                </div>
                                <div className="flex flex-wap space-x-2">
                                    <h3 className="font-bold">{(coment.name ==='null' ? 'Anonimo' : coment.name)}</h3> {/* este apartado puede ser sacado del correo? */} <h4>{(coment.rol ==='null' ? '' : coment.rol)}</h4> <span className="opacity-70">{coment.date}</span>
                                </div>
                            </div>                
                            <p className=" line-clamp-4 w-sm text-justify px-5 md:px-0 pb-1">{coment.content.contenido}</p>                        
                        </div> 
                        )   }                        
                        </div>                                                                                                                                       
                    ))
                }
            </div>
        )
    }
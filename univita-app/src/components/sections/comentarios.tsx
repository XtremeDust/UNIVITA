'use client'
import {indicadorProps} from "../../types/comentarios"
import {coments} from "../../types/comentarios"

    export default function Comentars({mayor, menor}:indicadorProps){
        return(
            <div className="flex flex-col md:flex-row mx-auto place-content-center gap-7 md:w-1/2 ">
                {coments.map((coment, index)=>( 
                    <div key={index}>
                    {(coment.id>mayor && coment.id<menor) &&(
                            <div key={coment.id} className={` bg-${coment.color}-100 ring-2 ring-${coment.color}-500 h-full w-md p-2 rounded-lg  space-y-3 place-content-center place-items-center `}>
                            <div className="flex flex-col md:flex-row space-x-3 items-center w-full px-2 ">
                                <div className={` bg-${coment.color}-700 size-10 rounded-full`}>
                                    <img src={coment.avatar} alt="logo" />
                                </div>
                                <div className="flex flex-wap space-x-2">
                                    <h3 className="font-bold">{(coment.name ==='null' ? 'Anonimo' : coment.name)}</h3> {/* este apartado puede ser sacado del correo? */} <h4>{(coment.rol ==='null' ? '' : coment.rol)}</h4> <span className="opacity-70">{coment.date}</span>
                                </div>
                            </div>                
                            <p className="ml-4 line-clamp-4 w-sm text-justify">{coment.content.contenido}</p>                        
                        </div> 
                        )   }                        
                        </div>                                                                                                                                       
                    ))
                }
            </div>
        )
    }
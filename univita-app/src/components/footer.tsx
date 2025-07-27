//footer de la pagina principal

import { url } from "inspector";
import { title } from "process";
import Redes from "./redes";

interface sectionF {
    id:number;
    title:string;
    url:string;
    subsection?: sectionF[];
}

const sectionFs: sectionF[] =[
    {
        id:1,
        title:"Nuestra Institución",
        url:"#",
        subsection:[
            {id:11, title:"Rectorado", url:"#"},
            {id:12, title:"Vicerrectorados", url:"#"},
            {id:13, title:"Decanatos", url:"#"},
            {id:14, title:"Bienestar Estudiantil", url:"#"}
        ],
    },
    {
        id:2,
        title:"Ofertas de Estudios",
        url:"#",
        subsection:[
            {id:21, title:"Pregrado", url:"#"},
            {id:22, title:"Postgrado", url:"#"},
            {id:23, title:"Diplomados", url:"#"},
            {id:24, title:"Cursos y Talleres", url:"#"}
        ],
    },
    {
        id:3,
        title:"Servicios web",
        url:"#",
        subsection:[
            {id:31, title:"Académicos", url:"#"},
            {id:32, title:"Biblioteca UNIMAR", url:"#"},
            {id:33, title:"Educación Virtual", url:"#"},
            {id:34, title:"Pagos Online", url:"#"}
        ],
    },
    {
        id:4,
        title:"Accesos Rápidos",
        url:"#",
        subsection:[
            {id:41, title:"Directorio Académico", url:"#"},
            {id:42, title:"Calendario Académico", url:"#"},
            {id:43, title:"Contáctanos a través de", url:"#"},        
        ],
    }
]

 function Footer(){
  return(
    <footer className="bg-[#0d4d98] grid lg:grid-cols-5 size-full justify-center text-sm ">
        
          <div className=" text-center justify-items-center justify-self-center p-6 col-span-5 lg:col-span-1">
            {/*
             imagen con cloudinary (es un gif de prueba MAS BIEN cuidado mata de ternura!!!)
            https://res.cloudinary.com/dnfvfft3w/image/upload/v1753572417/samples/animals/kitten-playing.gif
            
            se puede usar una api y enviar la imagen a cloudinary sin necesidad de cargarla (se tiene que probar)
            <img src="https://res.cloudinary.com/dnfvfft3w/image/upload/v1753572417/samples/animals/kitten-playing.gif" alt="logo" className="w-44"/>
            
            */}

            <img src="https://res.cloudinary.com/dnfvfft3w/image/upload/v1753574382/logo-unimar-22_fmrgjq.png" alt="logo" className="w-44"/>
            <p className="text-[12px] w-50 lg:w-84 p-1">Av. Concepción Mariño, Sector El Toporo, El Valle del Espíritu Santo, Edo. Nueva Esparta, Venezuela.</p>
          </div>
          
            <div className="lg:grid grid-flow-col col-span-4 gap-5 p-8 ml-7 hidden">
                {sectionFs.map((section)=>(
                    <ul key={section.id} >
                        <a href={section.url} className="font-bold">
                            {section.title}
                        </a>

                        {section.subsection?.map((sub)=>(                            
                            <li key={sub.id} className="mt-3">
                                {sub.id!==43 &&(
                                <a href={sub.url}>
                                 {sub.title}
                                 </a>
                                )}

                                 {sub.id===43 &&(
                                    <div>
                                        <p>{sub.title}</p>
                                        <Redes/>
                                    </div>
                                 )}
                            </li>
                        ))}                    
                    </ul>
                ))}
              
            </div>
       
                
            <div className="col-span-5 justify-self-center p-1 text-[11px]">
            © Copyright 2025 Walas de Margarita, Rif: J-50760740-0. Isla de Margarita - Venezuela.
            </div>
      </footer>
  );  
} 

export default Footer;
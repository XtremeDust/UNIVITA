import { title } from "process";

const featS =[
    {
        id:1,
        title:"Descubre",   
        text:"En esta seccion podras saber todo sobre los eventos deportivos",
        src:"er",
        img:"f"
    },
    {
        id:2,
        title:"Inscribete",   
        text:"Ahora las incripciones a los eventos deportivos y culturales los puedes hacer desde tu dispositivo",
        src:"er",
        img:"r3"
    },
    {
        id:3,
        title:"Mantente informado",   
        text:"Sigue los resultados, fechas y ultimas novedades de los eventos deportivos y culturales",
        src:"er",
        img:"#"
    },
    {
        id:4,
        title:"Mantente informado",   
        text:"Sigue los resultados, fechas y ultimas novedades de los eventos deportivos y culturales",
        src:"er",
        img:"#"
    },
]

 export default function featuresS(){
    return(
        <div className="mt-5 p-3">
            <div className="text-black text-3xl font-medium flex flex-col gap-1">
                <h2 className="text-4xl font-mono">Vive la Nueva Experiencia del Deporte</h2>
                <span className="ml-5 text-justify">Algo colocare despues</span>
            </div>
            <div className="flex flex-wrap justify-evenly gap-3 p-3 mt-5 group">
                {featS.map((events)=>(
                    <a key={events.id} href={events.src} className="bg-green-500 h-48 w-full md:w-11/12 lg:w-5/12 xl:w-96 rounded-2xl flex flex-col gap-1 place-content-center p-3 hover:shadow-xl ring-2 ring-indigo-700 hover:shadow-pink-800 transition-all  duration-300 group-hover:opacity-50  hover:!opacity-100  hover:scale-105">
                        <img src={events.img} alt={events.title} />
                        <h3 className="text-[22px] font-bold">{events.title}</h3>                        
                            <p className="ml-1.5">{events.text}</p>
                    </a>
                ))}
            </div>
        </div>
    );
 }
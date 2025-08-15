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
        <div className=" p-3 text-black">
            <div className=" text-[20px] md:text-3xl font-medium flex flex-col gap-1">
                <h2 className="lg:text-4xl font-mono">Vive la Nueva Experiencia del Deporte</h2>
                <span className="ml-5 text-justify">Algo colocare despues</span>
            </div>
            <div className="flex flex-wrap justify-evenly gap-5 p-3 mt-5 group">
                {featS.map((events)=>(
                    <a key={events.id} href={events.src} className="h-48 w-full md:w-11/12 lg:w-5/12 xl:w-96 rounded-2xl flex flex-col gap-1 place-content-center p-[2px] transition-all  duration-500 group-hover:opacity-50  hover:!opacity-100  hover:scale-105 
                    // bg-[conic-gradient(from_0deg,_white_60%,_blue_70%,_white_80%)]
                    "
                    // bg-conic-0 from-white via-blue-700 to-white from-60% via-70% to-80%
                    // bg-[conic-gradient(from_0deg,_white_20%,_blue_35%,_white_65%,_blue_85%,_white_100%)]
                    //    bg-[conic-gradient(from_0deg,_white_0%,_blue_25%,_white_50%,_blue_75%,_white_100%)]
                    /*style={{
                       boxShadow: '0 0 10px #0d4d98, 0 0 20px #00ffff' /*hover:shadow-xl  hover:shadow-[#0d4d98]  //ring-2 ring-indigo-700
                    }}*/
                    >
                        <div className="bg-gray-200 w-full h-full p-3 rounded-2xl flex flex-col gap-1 place-content-center
                         ring-1 ring-blue-800 hover:ring-0 transition-all
                         ">
                        <img src={events.img} alt={events.title} /> 
                        <h3 className="text-[22px] font-bold">{events.title}</h3>                        
                            <p className="ml-1.5">{events.text}</p>
                    </div>
                    </a>
                ))}
            </div>
        </div>
    );
 }
"use client"
import Image from "next/image";
import React, {useState, useRef, useEffect} from "react";
import {featS} from "@/types/feactures";
import { motion, useInView, Variants } from "framer-motion";
import Calendar from "@/components/calendar/tournamentCalendar"
import React_Calendar from "@/components/calendar/React-tournamentCalendar"


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
    },
  },
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50, 
    scale: 0.95 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut", 
    },
  },
};

 export default function featuresS(){

   // const [isHoverS, setHoverS] = useState<number|null>(null);
   //     const HoverS = (index:number)=>{setHoverS(isHoverS => isHoverS===index ? null : index)};

    const ref = useRef(null);

    const isInView = useInView(ref, { once: true, amount: 0.1 });

    const [shouldAnimate, setShouldAnimate] = useState(false);

    useEffect(() => {
        if (isInView) {
            setShouldAnimate(true);
        }
    }, [isInView]);

    return(
        <div className=" p-3 text-black">
            <div className=" text-[20px] md:text-3xl font-medium flex flex-col gap-1">
                <h2 className="text-[1.5rem] md:text-[2rem] xl:text-[2.5rem] font-bold">Vive la Nueva Experiencia del Deporte</h2>
                <span className="text-justify text-[16px] md:text-[18px]">Inscríbete en eventos, consulta cronogramas, accede a normativas y sigue resultados todo desde tu portal favorito. Univita centraliza las herramientas para que participar sea simple y rápido.</span>
            </div>


            <motion.div 
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={shouldAnimate ? "visible" : "hidden"}
                className="flex flex-wrap justify-around space-y-1 mt-5 group">

                {featS.map((events, index)=>(
                    <motion.a 
                        key={events.id}
                        variants={itemVariants}
                        whileHover={{
                            scale: 1.02,
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                            transition: { duration: 0.2 }
                        }}
                        className=" lg:h-50 w-full md:w-11/11 lg:w-[95%] xl:w-[30%]  2xl:w-[30%] rounded-2xl flex flex-col gap-1 place-content-center p-[3px] transition-all  duration-500 group-hover:opacity-50 hover:!opacity-100 hover:scale-100 lg:hover:scale-100  place-items-center overflow-hidden relative "
                       // onMouseEnter={()=>HoverS(index)} onMouseLeave={()=>HoverS(index)}
                    >
                        <div className="flex flex-col md:flex-row flex-nowrap md:justify-start xl:place-content-center  place-content-center place-items-center card group hover:bg-unimar hover:text-white bg-gray-100 size-full rounded-2xl p-3 gap-3
                            ring-unimar ring-2 hover:ring-0 transition-all z-10">
                             <div className="relative transition-all duration-300 ease-in-out
                              group-[.card:hover]:bg-gray-400 
                              overflow-hidden bg-unimar rounded-full ">
                                <Image
                                    className=" scale-80"
                                    src={events.img}
                                    width={100}
                                    height={100}
                                    alt={events.title}
                                /> 
                             </div>
                             <div className="text-center md:text-justify xl:w-md">
                                <h3 className="text-[22px] font-bold ">{events.title}</h3>                        
                                    <p>{events.text}</p>
                             </div>
                        </div>

                        {/*<div className={` ${isHoverS===index ? 'animate-spin-gradient absolute inset-0 ':' pointer-events-none'}`}/>*/}
                    </motion.a>
                ))}
            </motion.div>
        {/*<Calendar></Calendar>*/}  
         {/*   <React_Calendar></React_Calendar> */}
        </div>
    );
 }
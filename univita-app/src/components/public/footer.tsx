//footer de la pagina principal
'use client'
import React from "react";
import AccordionF from "../ui/accordionF";
import LicksF from "../common/licksFooter";

function Footer(){

  return(
    <footer className="bg-[#0d4d98] grid lg:grid-cols-5 text-sm ">
        <div className="row-start-2 lg:row-start-1 text-center place-items-center justify-self-center p-6 col-span-5 lg:col-span-1">
        {/*
            imagen con cloudinary (es un gif de prueba MAS BIEN cuidado mata de ternura!!!)
        https://res.cloudinary.com/dnfvfft3w/image/upload/v1753572417/samples/animals/kitten-playing.gif
        
        se puede usar una api y enviar la imagen a cloudinary sin necesidad de cargarla (se tiene que probar)
        <img src="https://res.cloudinary.com/dnfvfft3w/image/upload/v1753572417/samples/animals/kitten-playing.gif" alt="logo" className="w-44"/>
        
        */}
        <img src="https://res.cloudinary.com/dnfvfft3w/image/upload/v1753574382/logo-unimar-22_fmrgjq.png" alt="logo" className="w-44"/>
        <p className="text-[12px] w-50 lg:w-84 p-1">Av. Concepción Mariño, Sector El Toporo, El Valle del Espíritu Santo, Edo. Nueva Esparta, Venezuela.</p>
        </div>
        <LicksF></LicksF>
        <AccordionF/>
        <div className="col-span-5 justify-self-center p-1 text-[11px]">
        © Copyright 2025 Walas de Margarita, Rif: J-50760740-0. Isla de Margarita - Venezuela.
        </div>
      </footer>
  );  
} 

export default Footer;
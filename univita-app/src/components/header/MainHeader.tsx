// header de la page principal
'use client'
import Redes from "../common/socialMedia";
import {sectionH} from "../../types/headerSection";
import {pago} from "../../types/headerSection";

import Accordeon from "@/components/header/accordionMH"
import React, {useState} from "react";
import Arrow from "../common/ArrowIcon";
import MenuDropdown from "../header/menuDropdown";

{/*
const pago = [
  {
  id:1,
  red:"pagos unimar",
  Url:"",
  icon:"online-payments-vertical.png",
  size:"w-26"
  }
]

const redi = [
  {
    id:1,
    title:"Inicio",
    url:"#",
    img:"#",
  },
  {
    id:2,
    title:"Nuestra Institucion",
    url:"#",
    img:"#",
  },
  {
    id:3,
    title:"Estudia en UNIMAR",
    url:"#",
    img:"#",
  },
  {
    id:4,
    title:"Postgrado",
    url:"#",
    img:"#",
  },
  {
    id:5,
    title:"Investigación",
    url:"#",
    img:"#",
  },
  {
    id:6,
    title:"Servicios  ",
    url:"#",
    img:"#",
  },              
                    
]*/}



function Header(){

const [isOpenMenu, setOpenMenu] = useState(false);





    return(
    
      <header className=" grid size-full  items-center text-center justify-center gap-1 bg-blue-50">
          
          {/*Span*/}
          <div className="nav grid  md:w-screen bg-blue-200 pb-1 text-blue-800">
            <i></i>
            <p>
             El valor del dólar, para el día de hoy 
             <span> fecha es </span>
              <strong>precio </strong> Bs
            </p>
          </div>

          {/*iconos*/}
          <div className="grid grid-cols-3 p-0.5 lg:ml-4 bg-blue-50">
            {/*iconos izquierdos*/}
            <div className="grid col-span-3 md:col-span-2 grid-flow-col gap-1 items-center justify-start xl:justify-end md:mr-30">      
              <Redes/>
              {pago.map((icons) =>(
                <a key={icons.id} href={icons.Url}>
                  <img src={icons.icon} alt={icons.red} className={icons.size}/>
                </a>
              ))}
              
            </div>
            {/*icono derecho*/}
            <div className="grid col-4 ">
              <a href="">
                <img src="login-vertical.png" alt="login" className="w-26" />
              </a>
            </div>
          </div>

          {/*Navbar*/}
          <div className="nav grid bg-blue-50 px-2 grid-flow-col">
            <nav className="grid md:grid-rows-1 xl:grid-flow-col ">

              {/*LOGO unimar*/}
              <div className="grid place-items-center xl:justify-items-normal ">
                <img src="logounimar-25-aniversario.png" alt="logo unimar" className="w-2/3 md:w-md  xl:ml-12"/>              
              </div>

              {/*menu panel*/}
              <div className="md:grid xl:col-span-2 place-items-center xl:justify-end xl:mr-14 h-10 xl:h-auto hidden">
                  <MenuDropdown/>             
              </div>
              
            </nav>

            {/*button menu mobile*/}
            <button className="md:hidden cursor-pointer justify-start" onClick={()=>setOpenMenu(!isOpenMenu)}>
              <img src="bars-solid-full.svg" alt="menu" className=" size-8"/>
            </button>

          </div>
          
          {/*menu mobile desplegable */}                
          <div className={` transition-all ease-in-out overflow-hidden md:hidden text-black ${isOpenMenu ? ' max-h-screen opacity-100 ' :' max-h-0 opacity-0  pointer-events-none'}`}>
            <Accordeon/>
          </div>


      </header>
    );
}

export default Header;

// header de la page principal
'use client'
import Redes from "../common/socialMedia";
import {pago} from "../../types/headerSection";
import Accordeon from "@/components/header/accordionMH"
import React, {useState} from "react";
import MenuDropdown from "../header/menuDropdown";

function Header(){

const [isOpenMenu, setOpenMenu] = useState(false);

    return(
    
      <header className=" flex flex-col w-full  items-center text-center justify-center gap-1 bg-blue-50">
          
          {/*Span*/}
          <div className="nav grid w-full bg-blue-200 pb-1 text-blue-800">
            <i></i>
            <p>
             El valor del dólar, para el día de hoy 
             <span> fecha es </span>
              <strong>precio </strong> Bs
            </p>
          </div>

          {/*iconos*/}
          <div className="flex flex-wap p-1 bg-blue-50 w-full justify-between lg:justify-items-stretch">
            {/*iconos izquierdos*/}
            <div className="flex flex-wap w-full h-6 items-center justify-start lg:justify-center">      
              <Redes size={'size-6'}/>
              {pago.map((icons) =>(
                <a key={icons.id} href={icons.Url}>
                  <img src={icons.icon} alt={icons.red} className={icons.size}/>
                </a>
              ))}              
            </div>

            {/*icono derecho*/}
            <div className="grid col-4">
              <a href="" className="w-28">
                <img src="login-vertical.png" alt="login" className="h-full" />
              </a>
            </div>
          </div>

          {/*Navbar*/}
          <div className="nav grid bg-blue-50 px-2 grid-flow-col w-full">
            <nav className="flex md:flex-col xl:flex-row ">

              {/*LOGO unimar*/}
              <div className="grid place-items-center xl:justify-items-normal ">
                <img src="logounimar-25-aniversario.png" alt="logo unimar" className="w-2/3 md:w-xl  xl:ml-12"/>              
              </div>

              {/*menu panel*/}
              <div className="md:grid place-content-center xl:justify-end xl:mr-14 h-10 xl:h-auto w-full hidden">
                  <MenuDropdown/>             
              </div>
              
            </nav>

            {/*button menu mobile*/}
            <button className="md:hidden cursor-pointer justify-start" onClick={()=>setOpenMenu(!isOpenMenu)}>
              <img src="bars-solid-full.svg" alt="menu" className=" size-8"/>
            </button>

          </div>
          
          {/*menu mobile desplegable */}                
          <div className={`w-full transition-all ease-in-out overflow-hidden md:hidden text-black ${isOpenMenu ? ' max-h-screen opacity-100 ' :' max-h-0 opacity-0  pointer-events-none'}`}>
            <Accordeon/>
          </div>


      </header>
    );
}

export default Header;

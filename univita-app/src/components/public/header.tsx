// header de la page principal
'use client'
import Redes from "../common/socialMedia";
import {sectionH} from "../../data/headerSection";
import {pago} from "../../data/headerSection";
import Image from "next/image";
import React, {useState} from "react";
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
          <div className="nav grid w-dvw bg-blue-200 pb-1 text-blue-800">
            <i></i>
            <p>
             El valor del dólar, según el BCV, para el día de hoy 
             <span> fecha es </span>
              <strong>precio </strong> Bs
            </p>
          </div>

          {/*iconos*/}
          <div className="grid grid-cols-3 p-2 ml-4 bg-blue-50">
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
          <div className="nav grid size-full bg-blue-50 p-2 grid-flow-col">
            <nav className="grid md:grid-rows-1 xl:grid-flow-col ">

              {/*LOGO unimar*/}
              <div className="grid place-items-center xl:justify-items-normal ">
                <img src="logounimar-25-aniversario.png" alt="logo unimar" className="w-2/3 md:w-md  xl:ml-12"/>              
              </div>

              {/*panel nav*/}
              <div className="md:grid xl:col-span-2 place-items-center xl:justify-end xl:mr-14 h-10 xl:h-auto hidden">
                <ul className="grid grid-flow-col-dense gap-4 text-gray-400 xl:text-sm text-[10px]">
                
                  
                  {sectionH.map((list)=>(
                    
                  <a key={list.id} href={list.url} className="hover:text-black flex">
                    {list.title} 
                    {/*list.id===2|| list.id===3 */}
                    {( list.img==="#") &&(
                      <Image
                            className="dark:invert rotate-180 p-1"
                            src="vercel.svg"
                            alt={list.title}
                            width={14}
                            height={14}
                            priority
                          />                                         
                  )}
                  </a>                
                ))}

                </ul>
              </div>
              
            </nav>

            {/*button mob*/}
                <button className="md:hidden cursor-pointer justify-start" onClick={()=>setOpenMenu(!isOpenMenu)}>
                  <img src="bars-solid-full.svg" alt="menu" className=" size-7"/>
                </button>

          </div>
                {/*menu mob */}
                
                <div className={`transition-all ease-in-out overflow-hidden text-black bg-amber-200 ${isOpenMenu ? ' max-h-screen opacity-100 ' :' max-h-0 opacity-0  pointer-events-none'}`}>
                  <li>s</li>
                  <li>a</li>
                  <li>l</li>
                </div>

      </header>
    );
}

export default Header;

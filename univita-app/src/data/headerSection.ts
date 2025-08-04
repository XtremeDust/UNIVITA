
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
export const pago = [
  {
  id:1,
  red:"pagos unimar",
  Url:"",
  icon:"online-payments-vertical.png",
  size:"w-26"
  }
]

 export interface sectionHs {
     id:number;
     title:string;
     url:string;
     img?:string | undefined;
     subsectionH?:sectionHs[];
 }

 export const sectionH:sectionHs[] = [
    {
    id:1,
    title:"Inicio",
    url:"#",
    },
    {
        id:2,
        title:"Nuestra Institucion",
        url:"#",
        img:"#",
        subsectionH:[
            {id:21, title:"UNIMAR", url:""},
            {id:22, title:"Organización", url:""},
            {id:23, title:"Rectorado", url:"",img:"#"},
            {id:24, title:"Secretaría General", url:"",img:"#"},
            {id:25, title:"Administración", url:""},
            {id:26, title:"Académico", url:"",img:"#"},
            {id:27, title:"Extensión", url:"",img:"", subsectionH:[{id:271, title:"Vicerrectorado", url:"",img:"#"},{id:272, title:"Servicio Comunitario", url:"",img:"#"}]},
            {id:28, title:"Normativas", url:""},
            {id:29, title:"Publicaciones Oficiales", url:""},            
            {id:211, title:"Comisión Electoral", url:""},  
        ]
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
    },
    {
        id:5,
        title:"Investigación",
        url:"#",
    },
    {
        id:6,
        title:"Servicios  ",
        url:"#",
    },
 ]



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
            {id:23, title:"Rectorado", url:"",img:"#", subsectionH:[{id:231, title:"Nuestro Subsistema", url:""},{id:232, title:"Planificación, Desarrollo y Evaluación Institucional", url:""},{id:233, title:"Talento Humano", url:""},{id:234, title:"Evaluación y Apoyo Psicológico", url:""}]},
            {id:24, title:"Secretaría General", url:"",img:"#", subsectionH:[{id:271, title:"Vicerrectorado", url:"",img:"#"},{id:272, title:"Servicio Comunitario", url:"",img:"#"}]},
            {id:25, title:"Administración", url:""},
            {id:26, title:"Académico", url:"",img:"#", subsectionH:[{id:261, title:"Vicerrectorado", url:""},{id:262, title:"Biblioteca UNIMAR", url:""},{id:263, title:"Decanatos", url:"", img:"#", subsectionH:[{id:264,title:"Estudios Generales",url:""},{id:265,title:"Humanidades, Artes y Eduación",url:""},{id:266,title:"Ciencias Económicas y Sociales",url:""},{id:267,title:"ciencias Jurídicas y Políticas",url:""},{id:268,title:"Ingenieria y Afines",url:""}]}]},
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
        subsectionH:[
            {id:31, title:"Pregrado", url:"", img:"#", subsectionH:[{id:331, title:"Requisitos", url:""},{id:332, title:"Carreras", url:""}]},
            {id:32, title:"Postgrado", url:"", img:"#",subsectionH:[{id:321, title:"Requisitos", url:""}] },
            {id:33, title:"Diplomados", url:""},
            {id:34, title:"Cursos y Tallerres", url:""},
            {id:35, title:"Egresados", url:""}
        ]
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


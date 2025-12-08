import React, {HTMLAttributes} from "react";

type Navigate = (newKey: number) => void;
export interface AsideProps extends HTMLAttributes<HTMLDivElement>{
    onNavigate:Navigate;
    CurrentKey:number;
    isExpanded?:boolean;
    handleMouseEnter?:()=>void
     handleMouseLeave?:()=>void
};


export interface Submenu{
    id:number;
    section:string;
    img:string;
    src?:string;
    submenu?:Submenu[];
}

export const menu:Submenu[]=[
    {id:1, section:'Home', img:'/hogar.png',src:''},
    {id:2, section:'Normativas', img:'/martillo-de-subasta.png',src:''},
    {id:3, section:'Inscripciones', img:'/contrato (1).png',src:''},
    {id:4, section:'Notificaciones', img:'/notificacion.png', src:''},
    {id:5, section:'Eventos y Actividades', img:'/calendario (3).png',
        submenu:[   
            {id:5, section:'Actividades generales', img:'/numero.png',src:''},
            {id:6, section:'Gestion de Torneos', img:'/eficiencia.png',src:''}
        ]
    },
    {id:9, section:'Deportes', img:'/deporte.png',src:''},
    {id:7, section:'Ofertas Academicas', img:'/etiqueta (1).png',src:''},
    {id:8, section:'Comentarios', img:'/insertar-comentario.png',src:''},
    {id:10, section:'Valoración', img:'/clasificacion.png', src:''},
    {id:11, section:'Infraestructura', img:'/edificio-de-oficinas.png', src:''},
    {id:12, section:'Reportes', img:'/informe-seo.png', src:''},
    {id:13, section:'Configuración', img:'/ajustes.png', src:''},

]

 const RepotModule = React.lazy (()=> import('@/app/dashboard/report/page'));
    const InfraModule = React.lazy (()=>import('@/app/dashboard/infrastructure/page'))
    const ConfigModule = React.lazy (()=>import ('@/app/dashboard/configuration/page'));
import React,{useState} from "react";
import {Button, Modal, ContentModal, Input, TextArea} from "@/types/ui_components";


export default function Comment() {
    const [OpenModal, setModal] = useState(false);

    const handleOpenModal=()=>{
        setModal(true)    
    };

    const handleCloseModal=()=>{
        setModal(false)    
    };

    return(
        <div className=" flex flex-wrap text-[24px] items-center justify-center lg:space-y-12 space-y-2 p-3  lg:gap-5 ">                        
            <div className="flex flex-col lg:w-3/5 space-y-3">
                <h2 className=" lg:text-4xl text-center lg:text-justify">¿Listo Para Elevar el nivel de la Experiencia Deportiva?</h2>
                <p className="text-[20px]  text-center lg:text-justify">Queremos que nos des tu opinión y dejes tu experiencia par que podamos seguir creiendo contigo</p>
            </div>
            <Button onClick={()=>(handleOpenModal)} className="text-[18px] text-white lg:text-[20px] rounded-xl transition-all duration-300 hover:scale-105 bg-unimar px-4 py-3
            ">               
                    Dejanos Tu Comentario               
            </Button>

           
                <Modal>
                    <ContentModal className="space-y-22 ">
                        <div className="flex flex-col header-modal items-end justify-center">
                            <Button variant={"btn-danger"} className="rounded-full" onClick={handleCloseModal}>X</Button>                            
                            <div className="text-center w-full">
                                Buzon de Comentarios
                            </div>                            
                        </div>
                        {/*
                        
                        <div className="flex flex-nowrap w-full header-modal items-center justify-center">
                            <div className=" w-full">
                                Comentario
                            </div>                            
                            <Button variant={"btn-danger"} className="rounded-full" onClick={handleCloseModal}>X</Button>                            
                        </div>
                        */}

                        <div className="main-modal space-y-10">
                            <div className="Email space-y-2">
                                <div className="input space-x-2">
                                    <label htmlFor="correo">Email</label>
                                    <Input className=" p-0.5 w-xs" type="text" placeholder="example.1234@unimar.edu.ve"/>
                                </div>
                                <div className="flex input space-x-1 justify-center items-center">
                                    <label className="text-[20px]">
                                        desea compartir su informacion
                                    </label>
                                    <Input className=" p-0.5 size-[18px]" type="checkbox"/>
                                </div>
                            </div>

                            <div className="Coment space-x-2">
                                <label htmlFor="correo">Comentario</label>
                                <TextArea className="p-0.5 w-sm h-[12rem]"/>
                            </div>
                        </div>

                        <div className="footer-modal space-x-[28rem]">
                            <Button variant={"btn-secondary"}>
                                Cerrar
                            </Button>
                            <Button variant={'btn-primary'}>
                                Enviar
                            </Button>
                        </div>
                    </ContentModal>
                </Modal>
           
        </div>
    )
}
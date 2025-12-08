 "use client"

 'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
 import Btcomment from "@/components/sections_Main/coments/ButtonComent";
 import ComentCard from "@/components/sections_Main/coments/comentCard";
 import { Coment } from "@/types/comentarios"; 
 import { coments } from "@/types/comentarios";
 import CommentModal from './comentModal';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function ComenSection() {
    const [allComments, setAllComments] = useState<Coment[]>([]);
    const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [loading, setLoading] = useState(true);

    const [selectedComment, setSelectedComment] = useState<Coment | null>(null);

    const handleCardClick = (coment: Coment) => {
        setSelectedComment(coment);
    };

    const COMMENTS_PER_GROUP = 3;

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`${API_URL}/comments/public`);
                if (!res.ok) throw new Error('Error al obtener comentarios.');
                
                const json: Coment[] = await res.json();
                setAllComments(json);

            } catch (e) {
                console.error(e);
                setAllComments([]);
            } finally {
                setLoading(false);
            }
        };
        fetchComments();
    }, []);
const CARD_TRANSITION_MS = 1000;
const TOTAL_ROTATION_TIME_MS = 7000;

const [isTransitionOut, setIsTransitionOut] = useState(false); 

useEffect(() => {
    if (allComments.length < COMMENTS_PER_GROUP) return;

    const totalGroups = Math.ceil(allComments.length / COMMENTS_PER_GROUP);

    const interval = setInterval(() => {
        setIsTransitionOut(true); 
        
        const dataChangeTimeout = setTimeout(() => {
            setCurrentGroupIndex(prevIndex => (prevIndex + 1) % totalGroups);
            setIsTransitionOut(false);
        }, CARD_TRANSITION_MS + 100); 

        return () => clearTimeout(dataChangeTimeout);
    }, TOTAL_ROTATION_TIME_MS);

    return () => clearInterval(interval);
}, [allComments.length]);

    const startIndex = currentGroupIndex * COMMENTS_PER_GROUP;
    const currentComments = allComments.slice(startIndex, startIndex + COMMENTS_PER_GROUP);

    const showPlaceholder = allComments.length === 0 && !loading;
    const canRotate = allComments.length >= COMMENTS_PER_GROUP;

    const PlaceholderCard = () => (
        <div className="p-10 text-center text-gray-500 bg-white rounded-xl shadow-lg border border-dashed border-gray-300 w-full xl:w-[40rem] transition-all duration-300">
            <p className="text-lg font-bold">¡Sé el primero!</p>
            <p className="text-sm">No hay comentarios públicos para mostrar. Tu voz puede ser la primera en aparecer aquí.</p>
        </div>
    );
    return(
        <section className="comenSection gap-6 bg-transparent my-2 flex-col flex "> 
            <section className="flex flex-col gap-5 w-full m-0 place-items-center text-center place-content-center overflow-hidden p-1">
                <div className=" md:text-2xl flex flex-col gap-3 text-center place-items-center m-0">
                    <h3  className="text-[1.5rem] md:text-[2rem] xl:text-[2.5rem] font-bold ">Construyendo Un Futuro Deportivo Brillante</h3>
                        <p className="w-[90%] text-center text-[18px] text-gray-600">Juntos, podemos crear un deporte universitario más vibrante y lleno de vida.
                            <span className="text-univita text-[19px]"> Tu voz </span>es la energía que mueve este proyecto
                        </p>

                    <div 
                        className={`flex flex-col xl:flex-row p-4 gap-5 transition-all duration-400 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
                    >
                    <AnimatePresence mode="wait">        
                        <motion.div
                                key={currentGroupIndex}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                
                                className="flex flex-col xl:flex-row p-4 gap-5 w-full justify-center"
                            >
                                {loading ? (
                                    <div className="p-10"></div>
                                ) : showPlaceholder ? (
                                    <PlaceholderCard />
                                ) : (
                                    currentComments.map((coment, index) => (
                                        <ComentCard 
                                            key={coment.id} 
                                            coment={coment} 
                                            index={index}
                                            onClick={() => handleCardClick(coment)}
                                        />
                                    ))
                                )}
                            {(!showPlaceholder && currentComments.length > 0 && currentComments.length < COMMENTS_PER_GROUP) && 
                                Array.from({ length: COMMENTS_PER_GROUP - currentComments.length }).map((_, i) => (
                                    <PlaceholderCard key={`placeholder-${i}`} />
                                ))
                            }
                        </motion.div>
                    </AnimatePresence>     
                </div>
                <CommentModal 
                    coment={selectedComment}
                    onClose={() => setSelectedComment(null)}
                    />
                
            </div>
            </section>
            <div className="btComen place-items-center ">
                <Btcomment/>
            </div>  
        </section>
    )
 }
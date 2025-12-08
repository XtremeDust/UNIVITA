'use client'
import React from 'react'
import { Modal, HeaderModal, ContainModal } from '@/types/ui_components'
import { RatingList } from '@/types/ratings'
import { StarDisplay } from '@/components/ui/Stardisplay'

interface Props {
    ratingData: RatingList;
    isOpen: boolean;
    onClose: () => void;
}

export default function ModalDetalleRating({ ratingData, isOpen, onClose }: Props) {
    if (!isOpen || !ratingData) return null;

    return (
        <Modal state={isOpen}>
            <ContainModal className="bg-white text-black max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden">
                <HeaderModal className="flex-none border-b border-gray-100 py-4 bg-gray-50" onClose={onClose}>
                    <div className="text-start ml-6">
                        <h2 className="text-xl font-bold text-slate-900">Detalle de Valoración</h2>
                        <p className="text-sm text-gray-500">Torneo: {ratingData.tournament_name}</p>
                    </div>
                </HeaderModal>
                <div className="p-8">
                    <div className="flex flex-col items-center justify-center mb-8 bg-unimar/5 p-6 rounded-xl border border-unimar/10">
                        <h3 className="text-4xl font-bold text-unimar mb-2">{ratingData.score}.0</h3>
                        <StarDisplay score={ratingData.score} size="size-8" />
                        <span className="text-sm text-gray-400 mt-2">Publicado el {ratingData.fecha}</span>
                    </div>
                    <div className="space-y-6">
                        <div className="relative">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Comentario</h4>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700 italic leading-relaxed relative">
                                <span className="absolute top-2 left-2 text-4xl text-gray-200 opacity-50">"</span>
                                <p className="relative z-10 px-4">
                                    {ratingData.comment || "El usuario no dejó ningún comentario escrito, solo valoró con estrellas."}
                                </p>
                            </div>
                        </div>
                        <hr className="border-gray-100"/>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Autor</h4>
                                <p className="font-semibold text-gray-800">{ratingData.autor_nombre}</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Correo</h4>
                                <p className="text-gray-600">{ratingData.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ContainModal>
        </Modal>
    );
}
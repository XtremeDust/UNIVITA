'use client'
import React, { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { 
  Input, Button, Select, Table, TableBody, TableCell, TableRow,
  TableHead, TableHeaderCell
} from '@/types/ui_components'
import ModalDetalleRating from './modalDetalleRating'
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal'
import { StarDisplay } from '@/components/ui/Stardisplay'
import { RatingList } from '@/types/ratings'

const titleRating = [
    {id:1, titulo:"Torneo"}, 
    {id:2, titulo:"Usuario"},
    {id:3, titulo:"Valoración"}, 
    {id:4, titulo:"Comentario"},
    {id:5, titulo:"Fecha"},
    {id:6, titulo:"Acciones"},
]

const buttons = [
    {id:1, button:"Ver", img:"/ojo.png"}, 
    {id:3, button:"Eliminar", img:"/basura (1).png"}
]

export default function RatingsPage() {

    const [ratings, setRatings] = useState<RatingList[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterScore, setFilterScore] = useState<string>('Todos'); 
    const [searchTerm, setSearchTerm] = useState('');
    
    const [ratingToDelete, setRatingToDelete] = useState<RatingList | null>(null);
    const [selectedRating, setSelectedRating] = useState<RatingList | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchRatings = async () => {
        try {
            setLoading(true);
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            const res = await fetch(`${API_URL}/ratings`); 
            if (!res.ok) throw new Error("Error al cargar valoraciones");
            const json = await res.json();
            setRatings(json.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRatings();
    }, []);

    const stats = useMemo(() => {
        if (ratings.length === 0) return { avg: 0, total: 0, bad: 0 };
        const total = ratings.length;
        const sum = ratings.reduce((acc, curr) => acc + curr.score, 0);
        const bad = ratings.filter(r => r.score <= 2).length;
        return {
            avg: (sum / total).toFixed(1),
            total,
            bad
        };
    }, [ratings]);

    const filteredRatings = ratings.filter(item => {
        const matchesSearch = item.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              item.tournament_name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesScore = filterScore === 'Todos' ? true : item.score === parseInt(filterScore);
        return matchesSearch && matchesScore;
    });

    const handleDeleteClick = (rating: RatingList) => setRatingToDelete(rating);
    
    const handleConfirmDelete = async () => {
        if (!ratingToDelete) return;
        setIsDeleting(true);
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            await fetch(`${API_URL}/ratings/${ratingToDelete.id}`, { method: 'DELETE' });
            setRatings(prev => prev.filter(r => r.id !== ratingToDelete.id)); 
            setRatingToDelete(null);
        } catch (e) {
            alert("Error eliminando");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="h-full overflow-hidden flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 px-1">
                <div className="bg-white p-4 rounded-xl shadow border-l-4 border-unimar">
                    <p className="text-gray-500 text-sm">Promedio General</p>
                    <div className="flex items-end gap-2">
                        <h3 className="text-3xl font-bold text-gray-800">{stats.avg}</h3>
                        <span className="text-yellow-500 text-2xl mb-1">★</span>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-400">
                    <p className="text-gray-500 text-sm">Total Valoraciones</p>
                    <h3 className="text-3xl font-bold text-gray-800">{stats.total}</h3>
                </div>
                <div className="bg-white p-4 rounded-xl shadow border-l-4 border-rose-400">
                    <p className="text-gray-500 text-sm">Feedback Negativo (1-2★)</p>
                    <h3 className="text-3xl font-bold text-gray-800">{stats.bad}</h3>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow flex-1 overflow-hidden flex flex-col">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Valoraciones de Torneos</h2>
                <div className="flex flex-col md:flex-row items-center mb-6 gap-3 shadow-sm p-3 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="relative w-full flex text-black">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            <Image src={'/lupa.png'} alt="buscar" width={20} height={20} />
                        </div>
                        <Input 
                            type="text" 
                            className="bg-white pl-10 pr-4 input py-2 w-full rounded-xl " 
                            placeholder="Buscar por usuario o torneo..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <select 
                        className="bg-white text-gray-700 text-sm rounded-xl input block w-full md:w-auto p-2.5"
                        value={filterScore}
                        onChange={(e) => setFilterScore(e.target.value)}
                    >
                        <option value="Todos">Todas las estrellas</option>
                        <option value="5">5 Estrellas (Excelente)</option>
                        <option value="4">4 Estrellas (Muy bien)</option>
                        <option value="3">3 Estrellas (Regular)</option>
                        <option value="2">2 Estrellas (Mal)</option>
                        <option value="1">1 Estrella (Terrible)</option>
                    </select>
                </div>

                <div className="overflow-auto flex-1">
                    <Table className="w-full">
                        <TableHead className="text-gray-100 bg-unimar sticky top-0 z-10">
                            {titleRating.map((t) => (
                                <TableHeaderCell key={t.id} className="first:rounded-l-lg last:rounded-r-lg p-4 justify-end font-semibold ">
                                    {t.titulo}
                                </TableHeaderCell>
                            ))}
                        </TableHead>
                        <TableBody className="bg-white divide-y divide-gray-200">
                            {filteredRatings.map((data) => (
                                <TableRow key={data.id} className="hover:bg-gray-50 text-center cursor-pointer transition-colors"
                                 onClick={() => { setSelectedRating(data); setIsModalOpen(true); }}
                                >
                                    <TableCell className="font-semibold text-gray-900">{data.tournament_name}</TableCell>
                                    <TableCell className="text-sm">
                                        <div className="flex flex-col items-center">
                                            <span className="font-bold text-gray-700">{data.autor_nombre}</span>
                                            <span className="text-xs text-gray-500">{data.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-center">
                                            <StarDisplay score={data.score} />
                                        </div>
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate text-gray-600 italic">
                                        {data.comment || "Sin comentario"}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-500">{data.fecha}</TableCell>
                                    
                                    <TableCell>
                                        <div className="flex justify-center gap-2"
                                        onClick={(e) => {
                                            e.stopPropagation();}}
                                        >
                                            <button 
                                                onClick={() => handleDeleteClick(data)}
                                                className="p-2 hover:bg-red-50 rounded-full transition-colors"
                                                title="Eliminar"
                                            >
                                                <Image src="/basura (1).png" alt="Eliminar" width={24} height={24} />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    
                    {!loading && filteredRatings.length === 0 && (
                        <div className='p-10 text-center text-gray-500'>
                            No se encontraron valoraciones con estos filtros.
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen && selectedRating && (
                <ModalDetalleRating
                    ratingData={selectedRating}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}

            {ratingToDelete && (
                <ConfirmDeleteModal
                    isOpen={!!ratingToDelete}
                    title="Eliminar Valoración"
                    message={`¿Estás seguro de eliminar la valoración de ${ratingToDelete.email}?`}
                    onClose={() => setRatingToDelete(null)}
                    onConfirm={handleConfirmDelete}
                    isLoading={isDeleting}
                />
            )}
        </div>
    )
}
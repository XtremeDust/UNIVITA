'use client'
import React, { useState, useEffect } from 'react'
import { Button, Table, TableBody, TableCell, TableRow, TableHead, TableHeaderCell } from '@/types/ui_components'
import { toast, Toaster } from 'react-hot-toast'
import Image from 'next/image'

export default function InfraPage() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    // --- ESTADOS ---
    const [spaces, setSpaces] = useState<any[]>([]);
    const [newSpaceName, setNewSpaceName] = useState('');
    const [newSpaceLoc, setNewSpaceLoc] = useState('');

    const [startTime, setStartTime] = useState('08:00');
    const [endTime, setEndTime] = useState('16:00');
    const [duration, setDuration] = useState(90);
    const [loadingTime, setLoadingTime] = useState(false);

    // --- CARGA ---
    useEffect(() => { fetchSpaces(); fetchTimes(); }, []);

    const fetchSpaces = async () => {
        const res = await fetch(`${API_URL}/infrastructure/spaces`);
        if(res.ok) setSpaces(await res.json());
    };

    const fetchTimes = async () => {
        const res = await fetch(`${API_URL}/infrastructure/time-settings`);
        if(res.ok) {
            const data = await res.json();
            setStartTime(data.work_start_time?.slice(0,5) || '08:00');
            setEndTime(data.work_end_time?.slice(0,5) || '16:00');
            setDuration(data.slot_duration_minutes || 90);
        }
    };

    // --- HANDLERS ---
    const handleCreateSpace = async () => {
        if(!newSpaceName) return toast.error("Nombre requerido");
        await fetch(`${API_URL}/infrastructure/spaces`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({ name: newSpaceName, location: newSpaceLoc, status: 'activo' })
        });
        toast.success("Espacio agregado");
        setNewSpaceName(''); setNewSpaceLoc('');
        fetchSpaces();
    };

    const handleDeleteSpace = async (id: number) => {
        if(!confirm("¿Eliminar este espacio?")) return;
        await fetch(`${API_URL}/infrastructure/spaces/${id}`, { method: 'DELETE' });
        fetchSpaces();
        toast.success("Eliminado");
    };

    const handleSaveTime = async () => {
        setLoadingTime(true);
        try {
            await fetch(`${API_URL}/infrastructure/time-settings`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                body: JSON.stringify({ work_start_time: startTime, work_end_time: endTime, slot_duration_minutes: duration })
            });
            toast.success("Configuración actualizada");
        } catch(e) { toast.error("Error al guardar"); }
        finally { setLoadingTime(false); }
    };

    return (
        <section className="p-2 md:p-6 space-y-8 animate-in fade-in zoom-in duration-300">
            <Toaster position="top-center" />
            
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Infraestructura</h2>
                    <p className="text-gray-500">Gestión de espacios deportivos y configuración horaria.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* --- TARJETA 1: GESTIÓN DE ESPACIOS --- */}
                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col hover:shadow-lg transition-shadow h-full">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                            <span className="text-xl">🏟️</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Espacios Deportivos</h3>
                    </div>

                    {/* Formulario Inline */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-4">
                        <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Agregar Nuevo Espacio</label>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input 
                                type="text" 
                                placeholder="Nombre (Ej: Cancha Techada)" 
                                value={newSpaceName} 
                                onChange={e => setNewSpaceName(e.target.value)} 
                                className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                            />
                            <input 
                                type="text" 
                                placeholder="Ubicación (Ej: Zona A)" 
                                value={newSpaceLoc} 
                                onChange={e => setNewSpaceLoc(e.target.value)} 
                                className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                            />
                            <button onClick={handleCreateSpace} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-sm active:scale-95 text-sm">
                                +
                            </button>
                        </div>
                    </div>

                    {/* Tabla de Espacios */}
                    <div className="flex-1 overflow-hidden rounded-xl border border-gray-100">
                        <Table className="w-full">
                            <TableHead className="bg-gray-50 border-b border-gray-200">
                                    <TableHeaderCell className="text-gray-600 font-semibold py-3">Nombre</TableHeaderCell>
                                    <TableHeaderCell className="text-gray-600 font-semibold py-3">Ubicación</TableHeaderCell>
                                    <TableHeaderCell className="text-center text-gray-600 font-semibold py-3 w-16">Acción</TableHeaderCell>
                            </TableHead>
                            <TableBody>
                                {spaces.map(s => (
                                    <TableRow key={s.id} className="hover:bg-blue-50/50 transition-colors border-b border-gray-100 last:border-0">
                                        <TableCell className="font-bold text-gray-700 py-3">{s.name}</TableCell>
                                        <TableCell className="text-gray-500 text-sm py-3">{s.location || '-'}</TableCell>
                                        <TableCell className="text-center py-3">
                                            <button onClick={() => handleDeleteSpace(s.id)} className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Eliminar">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                
                            </TableBody>
                        </Table>
                    </div>
                        {spaces.length < 1 && (
                            <div className="text-center text-gray-400 py-8 italic">No hay espacios registrados aún.</div>                                    
                        )}
                </div>

            </div>
        </section>
    )
}
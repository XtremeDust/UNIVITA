'use client'
import React, { useState, useEffect } from 'react'
import MagicButton from '@/components/ui/MagicButton'
import SignatureConfig from '@/components/sections_Dashboard/report/SignatureConfig'
import { toast, Toaster } from 'react-hot-toast'
import Image from 'next/image'
import { Input } from '@/types/ui_components'

interface TournamentOption {
    id: number;
    name: string;
}

export default function ReportsPage() {
    // --- ESTADOS ---
    const [cedulaNumero, setCedulaNumero] = useState('');
    const [prefijo, setPrefijo] = useState('V');
    const [loadingCert, setLoadingCert] = useState(false);

    // Estados de Filtro Global
    const [tournaments, setTournaments] = useState<TournamentOption[]>([]);
    const [selectedTournamentId, setSelectedTournamentId] = useState<string>(''); // '' = Todos
    const [loadingTournaments, setLoadingTournaments] = useState(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    // --- CARGAR TORNEOS ---
    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const res = await fetch(`${API_URL}/tournaments`);
                if (res.ok) {
                    const json = await res.json();
                    const list = Array.isArray(json.data) ? json.data : json; 
                    setTournaments(list.map((t: any) => ({ id: t.id, name: t.name || t.nombre })));
                }
            } catch (error) {
                console.error("Error cargando torneos", error);
            } finally {
                setLoadingTournaments(false);
            }
        };
        fetchTournaments();
    }, [API_URL]);

    // --- HELPER PARA GENERAR URLS ---
    const getReportUrl = (endpoint: string) => {
        return selectedTournamentId 
            ? `${API_URL}/reports/${endpoint}?tournament_id=${selectedTournamentId}` 
            : `${API_URL}/reports/${endpoint}`;
    };

    // --- HANDLER CONSTANCIA ---
    const handleDownloadCertificate = async () => {
        if (cedulaNumero.length < 5) {
            toast.error("Ingresa una cédula válida");
            return;
        }
        const fullCedula = `${prefijo}-${cedulaNumero}`;
        setLoadingCert(true);
        const loadToast = toast.loading(`Buscando...`);

        try {
            const res = await fetch(`${API_URL}/reports/certificate/${fullCedula}`);
            if (res.status === 404) {
                toast.dismiss(loadToast);
                toast.error("Estudiante no encontrado.");
                return;
            }
            if (!res.ok) throw new Error("Error servidor");

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `constancia_${fullCedula}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            
            toast.dismiss(loadToast);
            toast.success("Constancia generada");
        } catch (error) {
            toast.dismiss(loadToast);
            toast.error("Error de conexión");
        } finally {
            setLoadingCert(false);
        }
    };

    return (
        <section className="p-2 md:p-6 space-y-8 animate-in fade-in zoom-in duration-300">
            <Toaster position="top-center" reverseOrder={false} />

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Centro de Reportes</h2>
                    <p className="text-gray-500">Documentación oficial y gestión del sistema.</p>
                </div>
                
                <div className="bg-yellow-50 px-4 py-2 rounded-xl border border-yellow-200 flex items-center gap-3">
                    <span className="text-2xl">📖</span>
                    <div>
                        <p className="text-xs font-bold text-yellow-800 uppercase">Ayuda</p>
                        <a href="/manuales/manual_usuario.pdf" target="_blank" className="text-sm font-semibold text-yellow-700 hover:underline cursor-pointer">
                            Manual de Usuario
                        </a>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* --- TARJETA 1: GESTIÓN DE TORNEOS (UNIFICADA) --- */}
                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col hover:shadow-lg transition-shadow">
                    
                    {/* ENCABEZADO TARJETA */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                            <span className="text-xl">📊</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">Reportes de Torneos</h3>
                            <p className="text-xs text-gray-500">Selecciona un torneo para filtrar los reportes.</p>
                        </div>
                    </div>

                    {/* SELECTOR MAESTRO (FILTRO GLOBAL) */}
                    <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 mb-6">
                        <label className="text-xs font-bold text-blue-800 uppercase ml-1 mb-1 block">
                            Torneo Seleccionado
                        </label>
                        <div className="relative">
                            <select 
                                className="w-full appearance-none bg-white border border-blue-200 text-gray-700 py-2 pl-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium cursor-pointer"
                                value={selectedTournamentId}
                                onChange={(e) => setSelectedTournamentId(e.target.value)}
                                disabled={loadingTournaments}
                            >
                                <option value="">Todos los Torneos (Histórico)</option>
                                {tournaments.map(t => (
                                    <option key={t.id} value={t.id}>{t.name}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-500">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>

                    {/* LISTA DE REPORTES DISPONIBLES */}
                    <div className="space-y-4 flex-1">
                        
                        {/* 1. General */}
                        <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl border border-gray-100 transition-colors">
                            <div>
                                <p className="text-sm font-bold text-gray-700">Resumen General</p>
                                <p className="text-xs text-gray-400">Estadísticas y conteos globales.</p>
                            </div>
                            <MagicButton url={getReportUrl('general')} isAvailable={true} />
                        </div>

                        {/* 2. Equipos */}
                        <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl border border-gray-100 transition-colors">
                            <div>
                                <p className="text-sm font-bold text-gray-700">Listado de Equipos</p>
                                <p className="text-xs text-gray-400">Equipos inscritos por disciplina.</p>
                            </div>
                            <MagicButton url={getReportUrl('teams')} isAvailable={true} />
                        </div>

                        {/* 3. Resultados */}
                        <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl border border-gray-100 transition-colors">
                            <div>
                                <p className="text-sm font-bold text-gray-700">Partidos y Resultados</p>
                                <p className="text-xs text-gray-400">Calendario de juegos y marcadores.</p>
                            </div>
                            <MagicButton url={getReportUrl('matches')} isAvailable={true} />
                        </div>

                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between hover:shadow-lg transition-shadow">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                                <span className="text-xl">🎓</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Constancia Deportiva</h3>
                        </div>
                        <p className="text-gray-500 mb-2 text-sm">
                            Genera un certificado PDF válido para un alumno.
                        </p>
                        
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-2">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Documento de Identidad</label>
                            
                            <div className="flex gap-3 h-12">
                                
                                <div className="flex-1 flex items-center bg-white border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-unimar focus-within:border-transparent transition-all overflow-hidden shadow-sm">
                                    
                                    <div className="relative">
                                        <select
                                            value={prefijo}
                                            onChange={(e) => setPrefijo(e.target.value)}
                                            className="appearance-none bg-transparent py-3 pl-4 pr-8 text-gray-700  focus:outline-none cursor-pointer hover:bg-gray-50 transition-colors"
                                        >
                                            <option value="V">V-</option>
                                            <option value="E">E-</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-1 text-gray-400">
                                            <Image
                                            src={'/flecha-hacia-abajo-para-navegar.png'}
                                            alt={'flecha'}
                                            className=' invert-50 '
                                            width={10}
                                            height={45}
                                            />
                                        </div>
                                    </div>

                                    {/* DIVISOR VERTICAL */}
                                    <div className="w-px h-6 bg-gray-200"></div>

                                    <Input 
                                        type="text"
                                        value={cedulaNumero}
                                        onChange={(e) => setCedulaNumero(e.target.value)}
                                        placeholder="12345678"
                                        className="flex-1 w-full  focus:outline-none border-none focus:ring-0 p-3 text-gray-800 placeholder:text-gray-400 bg-transparent"
                                        onKeyDown={(e) => e.key === 'Enter' && handleDownloadCertificate()}
                                    />
                                </div>

                                {/* BOTÓN DESCARGAR */}
                                <button
                                    onClick={handleDownloadCertificate}
                                    disabled={cedulaNumero.length < 5 || loadingCert}
                                    className="px-6 bg-unimar/8 hover:disabled:bg-gray-200 disabled:opacity-50 group text-white font-bold rounded-xl hover:bg-unimar  disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-md active:scale-95"
                                >
                                    {loadingCert ? (
                                        <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                                    ) : (
                                        <Image
                                            src={'/descarga.png'}
                                            alt={'descargar'}
                                            className='group-hover:invert  group-hover:grayscale'
                                            width={45}
                                            height={45}
                                        />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>

            <SignatureConfig />
            
            <div className="mt-10 p-6 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/50">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">💾</span>
                        <div>
                            <h3 className="text-lg font-bold text-gray-700">Copias de Seguridad</h3>
                            <p className="text-sm text-gray-500">Descarga snapshots de la base de datos.</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center gap-1">
                            <MagicButton url={`${API_URL}/reports/backup?type=structure`} isAvailable={true} />
                            <span className="text-[10px] uppercase font-bold text-gray-400">Estructura</span>
                        </div>
                        
                        <div className="w-px bg-gray-300 h-10 self-center mx-2 hidden md:block"></div>

                        <div className="flex flex-col items-center gap-1">
                            <MagicButton url={`${API_URL}/reports/backup?type=full`} isAvailable={true} />
                            <span className="text-[10px] uppercase font-bold text-gray-400">Completa</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
'use client'
import React, { useState, useEffect } from 'react'
import { Button, Modal, ContainModal, HeaderModal, Input as UiInput } from '@/types/ui_components'
import { toast } from 'react-hot-toast'

export default function TimeConfig() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    // Estados de Datos
    const [startTime, setStartTime] = useState('08:00');
    const [endTime, setEndTime] = useState('16:00');
    const [duration, setDuration] = useState(90);
    const [loadingTime, setLoadingTime] = useState(false);

    // Estados de Seguridad
    const [isLocked, setIsLocked] = useState(true);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [passwordAttempt, setPasswordAttempt] = useState('');
    const [verifying, setVerifying] = useState(false);

    useEffect(() => { fetchTimes(); }, []);

    const fetchTimes = async () => {
        try {
            const res = await fetch(`${API_URL}/infrastructure/time-settings`);
            if(res.ok) {
                const data = await res.json();
                setStartTime(data.work_start_time?.slice(0,5) || '08:00');
                setEndTime(data.work_end_time?.slice(0,5) || '16:00');
                setDuration(data.slot_duration_minutes || 90);
            }
        } catch (e) { console.error(e); }
    };

    // --- SEGURIDAD ---
    const handleUnlockRequest = () => { setShowAuthModal(true); setPasswordAttempt(''); };

    const confirmUnlock = async () => {
        setVerifying(true);
        try {
            const res = await fetch(`${API_URL}/verify-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ password: passwordAttempt })
            });

            if (res.ok) {
                setIsLocked(false);
                setShowAuthModal(false);
                toast.success("Edición habilitada");
            } else {
                toast.error("Contraseña incorrecta");
            }
        } catch (error) { toast.error("Error de conexión"); } 
        finally { setVerifying(false); }
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
            setIsLocked(true); // Bloquear al guardar
        } catch(e) { toast.error("Error al guardar"); }
        finally { setLoadingTime(false); }
    };

    return (
        <div className={`bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col hover:shadow-lg transition-all h-full relative ${isLocked ? 'opacity-90' : 'ring-2 ring-purple-100'}`}>
            
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${isLocked ? 'bg-gray-100 text-gray-500' : 'bg-purple-100 text-purple-600'}`}>
                        <span className="text-xl">{isLocked ? '🔒' : '⏰'}</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">Jornada y Tiempos</h3>
                        <p className="text-xs text-gray-500">{isLocked ? 'Modo Lectura (Protegido)' : 'Modo Edición Habilitado'}</p>
                    </div>
                </div>
                {isLocked && (
                    <Button onClick={handleUnlockRequest} className="bg-gray-800 font-semibold text-white px-5 py-2 rounded-lg text-sm hover:bg-black transition-colors">
                        Desbloquear
                    </Button>
                )}
            </div>
                    <p className="text-sm text-gray-500 mb-6 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        Define el horario laboral global y la duración estándar de los bloques (partidos/clases) para el calendario.
                    </p>
            
            {/* Bloqueo Visual */}
            {isLocked && <div className="absolute inset-0 z-10 bg-white/10 cursor-not-allowed mt-20" />}

            <div className="space-y-6 flex-1">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Apertura</label>
                        <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} disabled={isLocked} className="w-full p-3 bg-white border border-gray-300 rounded-xl font-bold text-gray-800 text-center focus:ring-2 focus:ring-purple-500 focus:outline-none disabled:bg-gray-100 disabled:text-gray-500" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Cierre</label>
                        <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} disabled={isLocked} className="w-full p-3 bg-white border border-gray-300 rounded-xl font-bold text-gray-800 text-center focus:ring-2 focus:ring-purple-500 focus:outline-none disabled:bg-gray-100 disabled:text-gray-500" />
                    </div>
                </div>

                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Duración de Bloque</label>
                    <div className={`flex items-center gap-3 p-4 rounded-xl border ${isLocked ? 'bg-gray-100 border-gray-200' : 'bg-purple-50 border-purple-100'}`}>
                        <input type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} disabled={isLocked} className="w-20 p-2 bg-white border border-gray-300 rounded-lg font-bold text-center text-gray-800 focus:ring-2 focus:ring-purple-500 focus:outline-none disabled:bg-gray-200" />
                        <div className="flex flex-col">
                            <span className="text-gray-700 font-bold text-sm">Minutos por Actividad</span>
                            <span className="text-xs text-gray-400">Equivale a {(duration/60).toFixed(1)} horas</span>
                        </div>
                    </div>
                </div>
            </div>

            {!isLocked && (
                <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end animate-in fade-in slide-in-from-bottom-2">
                    <Button onClick={handleSaveTime} disabled={loadingTime} className="bg-purple-600 text-white px-6 py-2.5 rounded-xl shadow-lg hover:bg-purple-700 transition-all active:scale-95 disabled:opacity-70 font-semibold flex items-center gap-2">
                        {loadingTime ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : 'Guardar y Bloquear'}
                    </Button>
                </div>
            )}

            {/* Modal Auth */}
            {showAuthModal && (
                <Modal state={showAuthModal}>
                    <ContainModal className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-4">
                        <HeaderModal onClose={() => setShowAuthModal(false)}>
                            <h3 className="text-lg font-bold text-gray-800">Seguridad Requerida</h3>
                        </HeaderModal>
                        <div className="mt-4 space-y-4">
                            <p className="text-sm text-gray-600">Para modificar el horario global, confirma tu contraseña de administrador.</p>
                            <UiInput type="password" placeholder="Contraseña..." className="w-full text-start text-black tracking-widest" value={passwordAttempt} onChange={(e) => setPasswordAttempt(e.target.value)} autoFocus />
                            <div className="flex justify-end gap-2 pt-2">
                                <Button onClick={() => setShowAuthModal(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">Cancelar</Button>
                                <Button onClick={confirmUnlock} disabled={verifying || !passwordAttempt} className="bg-gray-900 text-white px-4 py-2 rounded-lg">
                                    {verifying ? 'Verificando...' : 'Confirmar'}
                                </Button>
                            </div>
                        </div>
                    </ContainModal>
                </Modal>
            )}
        </div>
    )
}
'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Button, Input, Modal, ContainModal, HeaderModal } from '@/types/ui_components'
import Image from 'next/image'

export default function SignatureConfig() {

    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [preview, setPreview] = useState<string | null>(null);
    
    const [loading, setLoading] = useState(false);
    const [isLocked, setIsLocked] = useState(true); 
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [passwordAttempt, setPasswordAttempt] = useState('');
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        fetch(`${API_URL}/reports/config`)
            .then(res => res.json())
            .then(data => {
                setName(data.director_name || '');
                setPosition(data.director_position || '');
                setPreview(data.signature_url || '');
            })
            .catch(() => console.log("Sin config previa"));
            console.log('previsualizacion '+preview)
    }, []);

    const getCoordinates = (event: React.MouseEvent | React.TouchEvent) => {
        if (!canvasRef.current) return { x: 0, y: 0 };
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        let clientX, clientY;
        if ('touches' in event) { clientX = event.touches[0].clientX; clientY = event.touches[0].clientY; } 
        else { clientX = (event as React.MouseEvent).clientX; clientY = (event as React.MouseEvent).clientY; }
        return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        if (isLocked) return; 
        const { x, y } = getCoordinates(e);
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.strokeStyle = '#000000';
            ctx.beginPath(); ctx.moveTo(x, y); setIsDrawing(true);
        }
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing || isLocked) return;
        const { x, y } = getCoordinates(e);
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) { ctx.lineTo(x, y); ctx.stroke(); }
    };

    const stopDrawing = () => { setIsDrawing(false); canvasRef.current?.getContext('2d')?.beginPath(); };
    
    const clearSignature = () => {
        if (isLocked) return;
        const canvas = canvasRef.current;
        if (canvas) canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
    };

    const handleUnlockRequest = () => {
        setShowAuthModal(true);
        setPasswordAttempt('');
    };

    const confirmUnlock = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/verify-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ password: passwordAttempt })
            });

            if (res.ok) {
                setIsLocked(false);
                setShowAuthModal(false);
            } else {
                alert("⛔ Contraseña incorrecta");
            }
        } catch (error) {
            alert("Error de conexión");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        const dataToSend: any = { director_name: name, director_position: position };
        const canvas = canvasRef.current;
        
        if (canvas) {
             dataToSend.signature_base64 = canvas.toDataURL('image/png');
        }

        try {
            const res = await fetch(`${API_URL}/reports/config`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(dataToSend)
            });
            if (res.ok) {
                alert("✅ Configuración guardada");
                setIsLocked(true); // Volver a bloquear por seguridad
                if (canvas) setPreview(canvas.toDataURL('image/png'));
                clearSignature();
            } else {
                alert("Error al guardar");
            }
        } catch (e) {
            alert("Error de conexión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`bg-white p-6 rounded-2xl shadow-md border border-gray-100 mt-8 transition-all ${isLocked ? 'opacity-90' : 'opacity-100 ring-2 ring-purple-100'}`}>
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isLocked ? 'bg-gray-100 text-gray-500' : 'bg-purple-100 text-purple-600'}`}>
                        {isLocked ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 01-1.5 0V6.75a3.75 3.75 0 10-7.5 0v3a3 3 0 013 3v6.75a3 3 0 01-3 3H3.75a3 3 0 01-3-3v-6.75a3 3 0 013-3h9v-3c0-2.9 2.35-5.25 5.25-5.25z" />
                            </svg>
                        )}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">Configuración de Emisión</h3>
                        <p className="text-xs text-gray-500">
                            {isLocked ? "Modo Lectura (Protegido)" : "Modo Edición (Activo)"}
                        </p>
                    </div>
                </div>

                {isLocked && (
                    <Button onClick={handleUnlockRequest} className="bg-unimar/95 text-white px-4 py-2 rounded-lg text-sm hover:bg-unimar transition-colors">
                        Desbloquear para Editar
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                {isLocked && <div className="absolute inset-0 z-10 bg-white/10 cursor-not-allowed" />}

                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Responsable</label>
                        <Input 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            disabled={isLocked}
                            className="w-full mt-1 input disabled:bg-gray-100 disabled:text-gray-500 text-black input "
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Cargo</label>
                        <Input 
                            value={position} 
                            onChange={(e) => setPosition(e.target.value)} 
                            disabled={isLocked}
                            className="w-full mt-1 input disabled:bg-gray-100 disabled:text-gray-500 text-black input "
                        />
                    </div>
                    
                    {preview && (
                         <div className="mt-4 p-2 border rounded-xl bg-gray-50 input ">
                             <p className="text-xs font-bold text-gray-400 mb-2">Firma Vigente:</p>
                             <div className="relative h-16 w-full text-black">
                                <Image src={preview} alt="Firma" fill className="object-contain object-left" unoptimized />
                             </div>
                         </div>
                    )}
                </div>

                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Nueva Firma</label>
                    <div className={`border-2 border-dashed rounded-xl bg-white shadow-sm overflow-hidden touch-none ${isLocked ? 'border-gray-200' : 'border-purple-300'}`}>
                        <canvas
                            ref={canvasRef}
                            width={400}
                            height={200}
                            className={`w-full h-full touch-none ${isLocked ? 'cursor-not-allowed opacity-50' : 'cursor-crosshair'}`}
                            onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
                            onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing}
                        />
                    </div>
                    <div className="flex gap-2 mt-2 justify-end">
                        <Button 
                            onClick={clearSignature} 
                            disabled={isLocked}
                            className="bg-gray-200 text-gray-700 px-3 py-1 text-xs rounded-lg hover:bg-gray-300 disabled:opacity-50"
                        >
                            Borrar
                        </Button>
                    </div>
                </div>
            </div>

            {!isLocked && (
                <div className="mt-6 flex justify-end animate-in fade-in zoom-in duration-300">
                    <Button 
                        onClick={handleSave} 
                        disabled={loading}
                        className="bg-unimar text-white px-6 py-2 rounded-xl shadow-lg hover:bg-unimar/90"
                    >
                        {loading ? 'Guardando...' : 'Guardar y Bloquear'}
                    </Button>
                </div>
            )}

            {showAuthModal && (
                <Modal state={showAuthModal}>
                    <ContainModal className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-4">
                        <HeaderModal onClose={() => setShowAuthModal(false)}>
                            <h3 className="text-lg font-bold text-gray-800">Seguridad Requerida</h3>
                        </HeaderModal>
                        <div className="mt-4 space-y-4">
                            <p className="text-sm text-gray-600">Para editar la firma legal, por favor confirma tu contraseña de administrador.</p>
                            <Input 
                                type="password" 
                                placeholder="Contraseña..." 
                                className="w-full input placeholder:text-gray-500 text-black"
                                value={passwordAttempt}
                                onChange={(e) => setPasswordAttempt(e.target.value)}
                                autoFocus
                            />
                            <div className="flex justify-end gap-2 pt-2">
                                <Button onClick={() => setShowAuthModal(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">Cancelar</Button>
                                <Button onClick={confirmUnlock} disabled={loading || !passwordAttempt} className="bg-gray-900 text-white px-4 py-2 rounded-lg">
                                    {loading ? 'Verificando...' : 'Confirmar'}
                                </Button>
                            </div>
                        </div>
                    </ContainModal>
                </Modal>
            )}
        </div>
    )
}
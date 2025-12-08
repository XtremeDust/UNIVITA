'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/types/ui_components';
import Image from 'next/image';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const createEcho = () => {
if (typeof window !== 'undefined') {
       if (typeof window !== 'undefined') {
            (window as any).Pusher = Pusher;
        }
    }

    const reverbPort = process.env.NEXT_PUBLIC_REVERB_PORT 
        ? parseInt(process.env.NEXT_PUBLIC_REVERB_PORT) 
        : 8080;
    
    return new Echo({
        broadcaster: 'reverb', 
        key: 'X7mK9$vL2!pQ5zR',
        wsHost: process.env.NEXT_PUBLIC_REVERB_HOST || 'localhost',
        wsPort: reverbPort,
        wssPort: reverbPort,
        forceTLS: false,
        enabledTransports: ['ws', 'wss'],
        disableStats: true,
    });
};

interface Props {
    tournamentId: string;
    initialGames: any[];
}

export default function LiveTournamentGames({ tournamentId, initialGames }: Props) {
    const [games, setGames] = useState<any[]>(initialGames);
    const [status, setStatus] = useState('Desconectado 🔴');

useEffect(() => {
        const echo = createEcho();
        const channelName = `tournament.${tournamentId}`;
        
        console.log(`📡 [FRONTEND] Intentando escuchar canal: ${channelName}`);

        const channel = echo.channel(channelName);

        channel.listen('GameUpdated', (e: any) => {
            console.log("🔥 [FRONTEND] ¡EVENTO RECIBIDO!", e);
            console.log("   -> ID del juego que llegó:", e.game.id);
            console.log("   -> Marcador que llegó:", e.game.competidor_a.score, "-", e.game.competidor_b.score);

            setGames((prevGames) => {
                console.log("   -> Juegos actuales en pantalla:", prevGames.map(g => g.id));
                
                return prevGames.map((g) => {
                    if (g.id == e.game.id) {
                        console.log("   ✅ ¡ENCONTRÉ EL JUEGO! ACTUALIZANDO...");
                        return { 
                            ...g, 
                            ...e.game,
                            competidor_a: { ...g.competidor_a, ...e.game.competidor_a },
                            competidor_b: { ...g.competidor_b, ...e.game.competidor_b }
                        };
                    }
                    return g;
                });
            });
        });

        return () => echo.leave(channelName);
    }, [tournamentId]);

    const partidos = games.map(g => ({
        id: g.id,
        rawState: g.estado, 
        estadoVisual: (g.estado === 'live' || g.estado === 'en partido') ? 'En vivo' : 
                      g.estado.charAt(0).toUpperCase() + g.estado.slice(1), 
        fecha: g.fecha,
        deporte: g.disciplina_nombre,
        equipo1: g.competidor_a?.nombre || 'Local',
        marcador1: g.competidor_a?.score ?? 0,
        img1: g.competidor_a?.img || '/placeholder.png', 
        equipo2: g.competidor_b?.nombre || 'Visitante',
        marcador2: g.competidor_b?.score ?? 0,
        img2: g.competidor_b?.img || '/placeholder.png',
    }));

    const envivo = partidos.filter(p => p.rawState === 'en partido' || p.rawState === 'live');
    const otros = partidos.filter(p => p.rawState !== 'en partido' && p.rawState !== 'live');

    return (
        <section className='Partidos w-full flex flex-col text-2xl items-center justify-center'>
            
            <div className="bg-gray-800 text-white p-2 text-xs font-mono rounded mb-4">
                Estado WS: {status} | Canal: tournament.{tournamentId}
            </div>

            {envivo.length > 0 && (
                <section className='space-y-5 mt-5 p-2 w-full place-items-center animate-pulse'>
                    <h4 className="text-red-600 font-bold">🔴 JUGANDO AHORA</h4>
                    <div className='w-[95%]'>
                        {envivo.map((vivo) => (
                            <Card key={vivo.id} className='flex justify-around p-6 items-center border-2 border-red-100 mb-4 bg-white shadow-xl rounded-xl'>
                                <div className='text-center w-1/3'><h4 className='font-bold'>{vivo.equipo1}</h4></div>
                                <div className='text-center w-1/3'>
                                    <span className='font-black text-[4rem] text-red-600'>{vivo.marcador1} - {vivo.marcador2}</span>
                                    <p className='text-red-500 font-bold uppercase text-sm'>{vivo.estadoVisual}</p>
                                </div>
                                <div className='text-center w-1/3'><h4 className='font-bold'>{vivo.equipo2}</h4></div>
                            </Card>
                        ))}
                    </div>
                </section>
            )}

            <div className='w-[95%] space-y-4 mt-8'>
                {otros.map((partido) => (
                    <Card key={partido.id} className='flex justify-around p-4 items-center bg-white shadow rounded-lg'>
                        <div className='text-center w-1/3'>{partido.equipo1}</div>
                        <div className='text-center w-1/3'>
                            <span className='font-bold text-2xl'>{partido.marcador1} - {partido.marcador2}</span>
                            <p className='text-xs text-gray-400 uppercase'>{partido.estadoVisual}</p>
                        </div>
                        <div className='text-center w-1/3'>{partido.equipo2}</div>
                    </Card>
                ))}
            </div>
        </section>
    );
}
'use client';

import { useEffect, useState, use } from 'react';
import Footer from '@/components/common/footer/MainFooter';
import Header from '@/components/common/header/MainHeader';
import { Banner, Button, Card } from '@/types/ui_components';
import Image from 'next/image';
import EventRatingSection from '@/components/sections_Main/events/EventRatingSection';

interface PropsID {
    params: Promise<{
        id: string;
    }>;
}

interface TournamentData {
    id: number;
    nombre: string;
    descripcion: string;
    img: string | null;
    inicio: string;
    fin: string;
    estado: 'proximo' | 'activo' | 'finalizado';
}

interface ApiGame {
    id: number;
    estado: string;
    fecha: string;
    disciplina_nombre: string;
    competidor_a: { nombre: string; score: number | null; img?: string };
    competidor_b: { nombre: string; score: number | null; img?: string };
}

interface PartidoFrontend {
    id: number;
    estado: string;
    fecha: string;
    equipo1: string;
    marcador1: number;
    img1: string;
    equipo2: string;
    marcador2: number;
    img2: string;
    deporte: string;
}

async function getTournament(id: string): Promise<TournamentData | null> {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${API_URL}/tournaments/${id}`, { cache: 'no-store' });
        if (!res.ok) return null;
        const json = await res.json();
        return json.data || json;
    } catch (error) {
        console.error("Error fetching tournament:", error);
        return null;
    }
}

async function getGames(tournamentId: string): Promise<ApiGame[]> {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${API_URL}/tournaments/${tournamentId}/games`, { cache: 'no-store' });
        if (!res.ok) return [];
        const json = await res.json();
        return json.data || json;
    } catch (error) {
        console.error("Error fetching games:", error);
        return [];
    }
}

export default function ID({ params }: PropsID) {
    const { id } = use(params);

    const [actual, setActual] = useState<TournamentData | null>(null);
    const [apiGames, setApiGames] = useState<ApiGame[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initData = async () => {
            const [tData, gData] = await Promise.all([
                getTournament(id),
                getGames(id)
            ]);
            setActual(tData);
            setApiGames(gData);
            setLoading(false);
        };
        initData();
    }, [id]);


    const STORAGE_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8000';

    useEffect(() => {
        const intervalId = setInterval(async () => {
            const updatedGames = await getGames(id);
            setApiGames(updatedGames);
        }, 2000);

        return () => clearInterval(intervalId);
    }, [id]);
    const partidos: PartidoFrontend[] = apiGames.map(g => ({
        id: g.id,
        estado: g.estado === 'live' || g.estado === 'en partido' ? 'En vivo' :
                g.estado.charAt(0).toUpperCase() + g.estado.slice(1),
        fecha: g.fecha,
        equipo1: g.competidor_a.nombre,
        marcador1: g.competidor_a.score ?? 0,
        img1: g.competidor_a.img ? `${STORAGE_URL}${g.competidor_a.img}` : '/persona.png',
        equipo2: g.competidor_b.nombre,
        marcador2: g.competidor_b.score ?? 0,
        img2: g.competidor_b.img ? `${STORAGE_URL}${g.competidor_b.img}` : '/persona.png',
        deporte: g.disciplina_nombre
    }));

    const uniqueSports = Array.from(new Set(partidos.map(p => p.deporte)))
        .map((sport, index) => ({ id: index, sport }));

    const envivo = partidos.filter(p => p.estado === 'En vivo');
    const otros = partidos.filter(p => p.estado !== 'En vivo');

    const rawStatus = actual?.estado || '';
    const normalizedStatus = rawStatus.toLowerCase().trim();

    return (
        <div className='grid grid-rows-[auto_1fr_auto] min-h-dvh bg-white'>
            <Header />
            <main className='bg-gray-100'>
                <Banner
                    SRC='https://res.cloudinary.com/dnfvfft3w/image/upload/v1758470460/Lucid_Origin_A_dynamic_wideformat_cinematic_photo_in_the_style_0_qx2poq.jpg'
                    ALT='eventos'
                />
                <div className='space-y-5 my-5'>
                    <section className="text-partidos flex flex-col text-center place-items-center mt-6 md:mt-3">
                        <h3 className="title text-black">
                            {actual ? `Resultados: ${actual.nombre}` : (loading ? 'Cargando...' : 'Torneo no encontrado')}
                        </h3>
                        <p className="w-[90%] text-[18px] text-gray-600">
                            {actual?.descripcion || "Sigue los resultados en tiempo real."}
                        </p>
                    </section>

                    <section className='Partidos w-full flex flex-col text-2xl items-center justify-center overflow-hidden'>

                        {uniqueSports.length > 0 && (
                            <div className='filtro hidden gap-3 lg:flex justify-around w-[90%] border-b-2 border-gray-400'>
                                {uniqueSports.map((deport) => (
                                    <Button key={deport.id} className='text-slate-800 hover:text-univita cursor-pointer border-y-transparent border-b-2 text-center hover:border-b-2 hover:border-b-unimar w-full transition-all duration-150 ease-linear py-3'>
                                        {deport.sport}
                                    </Button>
                                ))}
                            </div>
                        )}
                        {envivo.length > 0 && (
                            <section className='space-y-5 mt-5 p-2 w-full place-items-center transition-all duration-300'>
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <span className="relative flex h-5 w-5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-5 w-5 bg-blue-500"></span>
                                    </span>
                                    <h4 className="text-blue-600 font-bold">
                                        JUGANDO AHORA
                                    </h4>
                                </div>
                                <div className='partido/present w-[95%] text-black bg-white shadow-2xl rounded-2xl'>
                                    {envivo.map((vivo) => (
                                        <Card key={vivo.id} className='space-y-5 flex flex-col lg:flex-row justify-around p-6 lg:h-[25rem] items-center border-2 border-blue-100'>
                                            <>
                                                <div className='flex flex-col space-y-5 items-center'>
                                                    <div className='p-4 bg-gray-100 rounded-full'>
                                                        <Image
                                                            className='p-4 size-[12rem]'
                                                            src={vivo.img1}
                                                            
                                                            alt={vivo.equipo1}
                                                            width={500}
                                                            height={500}
                                                        />
                                                    </div>
                                                    <h4 className='text-center'>{vivo.equipo1}</h4>
                                                </div>

                                                <div className='flex flex-col text-center'>
                                                    <span key={vivo.marcador1 + vivo.marcador2} className='font-bold text-[6rem] text-blue-600 animate-in fade-in duration-300'>
                                                        {vivo.marcador1} - {vivo.marcador2}
                                                    </span>
                                                    <p className='text-blue-500 font-bold'>{vivo.estado}</p>
                                                    <span className='text-sm text-gray-400'>{vivo.fecha}</span>
                                                    <span className='text-xs text-gray-400'>{vivo.deporte}</span>
                                                </div>

                                                <div className='flex flex-col space-y-5 items-center'>
                                                    <div className='p-4 bg-gray-100 rounded-full'>
                                                        <Image
                                                            className='p-4 size-[12rem]'
                                                            src={vivo.img2 }
                                                            alt={vivo.equipo2}
                                                            width={500}
                                                            height={500}
                                                        />
                                                    </div>
                                                    <h4 className='text-center'>{vivo.equipo2}</h4>
                                                </div>
                                            </>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        )}

                        <section className='finaliza/en_vivo gap-3 items-center justify-center space-y-5 mt-10 p-2 w-full'>
                            <div className='flex justify-around w-95%'>
                            </div>
                        </section>

                        <div className='filtro_Categoria/estado w-[90%] flex justify-end'>
                            <Button className='btn-secondary '>Filtro: Categoria</Button>
                        </div>

                        <div className='partidos w-[95%] space-y-5 mb-3'>
                            {otros.length > 0 ? (
                                otros.map((partido) => (
                                    <Card key={partido.id} className='w-full flex justify-around text-black bg-white shadow-2xl p-6'>
                                        <>
                                            <div className='flex flex-col space-y-5 items-center justify-center w-1/3'>
                                                <div className='p-4 bg-gray-100 rounded-full'>
                                                    <Image
                                                        className='p-4 size-[6rem] md:size-[8rem]'
                                                        src={partido.img1 }
                                                        alt={partido.equipo1}
                                                        width={500}
                                                        height={500}
                                                    />
                                                </div>
                                                <h4 className='text-center text-[18px] md:text-[1.5rem]'>{partido.equipo1}</h4>
                                            </div>

                                            <div className='flex flex-col text-center justify-center min-w-[150px]'>
                                                <span className='font-bold text-[3rem] md:text-[4rem]'>{partido.marcador1} - {partido.marcador2}</span>
                                                <p className='text-center text-[18px] md:text-[1.5rem] uppercase text-gray-500'>{partido.estado}</p>
                                                <span className='text-center text-[18px] md:text-[1.5rem] text-sm text-gray-400'>{partido.fecha}</span>
                                                <span className='text-xs text-gray-400 mt-1'>{partido.deporte}</span>
                                            </div>

                                            <div className='flex flex-col space-y-5 items-center justify-center w-1/3'>
                                                <div className='p-4 bg-gray-100 rounded-full'>
                                                    <Image
                                                        className='p-4 size-[6rem] md:size-[8rem]'
                                                        src={partido.img2 }
                                                        alt={partido.equipo2}
                                                        width={500}
                                                        height={500}
                                                    />
                                                </div>
                                                <h4 className='text-center text-[18px] md:text-[1.5rem]'>{partido.equipo2}</h4>
                                            </div>
                                        </>
                                    </Card>
                                ))
                            ) : (
                                <div className="text-center py-10 text-gray-500">
                                    {loading ? 'Cargando partidos...' : 'No hay otros partidos programados.'}
                                </div>
                            )}
                        </div>
                    </section>

                    {actual && (
                        <section className='w-full flex justify-center mb-10'>
                            <div className='w-[95%] md:w-[60%]'>
                                <EventRatingSection
                                    eventId={actual.id}
                                    eventStatus={(normalizedStatus as 'proximo' | 'activo' | 'finalizado') || 'finalizado'}
                                />
                            </div>
                        </section>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
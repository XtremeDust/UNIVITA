'use client'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/types/ui_components' 


const SPORT_RULES: Record<string, { points: number[]; label: string; autoWin?: number | null }> = {
  'Baloncesto': { points: [1, 2, 3], label: 'Puntos', autoWin: null },
  'Basket 3x3': { points: [1, 2], label: 'Puntos', autoWin: 21 },
  'Fútbol Sala': { points: [1], label: 'Goles', autoWin: null },
  'Voleibol': { points: [1], label: 'Sets', autoWin: 25 },
  'Tenis de Mesa': { points: [1], label: 'Puntos', autoWin: 11 },
  'default': { points: [1], label: 'Puntos', autoWin: null },
}

const useStopwatch = (isRunning: boolean) => {
    const [seconds, setSeconds] = useState(0)
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isRunning) {
            interval = setInterval(() => setSeconds(s => s + 1), 1000)
        } else if (!isRunning && interval) {
            clearInterval(interval)
        }
        return () => { if (interval) clearInterval(interval) }
    }, [isRunning])

    const formatTime = () => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return { seconds, setSeconds, formatTime }
}

function useDebouncedSave(callback: (...args: any[]) => void, delay = 1500) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const save = useCallback((...args: any[]) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => callback(...args), delay)
  }, [callback, delay])
  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }, [])
  return save
}

interface Props { gameId: number; onClose: () => void; onUpdate: () => void }

export default function MatchControlOverlay({ gameId, onClose, onUpdate }: Props) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

  const [game, setGame] = useState<any>(null)
  const [state, setState] = useState({ scoreA: 0, scoreB: 0, status: 'pendiente' })
  const [loading, setLoading] = useState(true)
  const [saveState, setSaveState] = useState<'saved' | 'saving' | 'unsaved'>('saved')
  const [showWOMenu, setShowWOMenu] = useState(false)
  
  const isFirstRun = useRef(true)
  const { formatTime } = useStopwatch(state.status === 'en partido')

  const handleCloseWithCheck = () => {
        if (saveState !== 'saved') {
            const confirmExit = window.confirm(
                " ¡Atención! Hay cambios pendientes o en proceso de guardado. ¿Está seguro de que desea salir y posiblemente perder los últimos cambios?"
            );
            if (confirmExit) {
                onClose();
            }
        } else {
            onClose();
            }
    }

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await fetch(`${API_URL}/games/${gameId}`)
        if (!res.ok) throw new Error('Error API')
        const json = await res.json()
        const g = json.data || json
        setGame(g)
        setState({
            scoreA: Number(g.competidor_a?.score ?? 0),
            scoreB: Number(g.competidor_b?.score ?? 0),
            status: g.estado ?? 'pendiente'
        })
      } catch (e) { console.error(e); onClose() } 
      finally { setLoading(false) }
    }
    fetchGame()
  }, [gameId, onClose])

  const rules = useMemo(() => {
    const name = (game?.disciplina_nombre || '').toString()
    const key = Object.keys(SPORT_RULES).find(k => name.includes(k)) || 'default'
    return SPORT_RULES[key] ?? SPORT_RULES['default']
  }, [game])

  const rawSave = useCallback(async (sA: number, sB: number, status: string) => {
    setSaveState('saving')
    try {
      await fetch(`${API_URL}/games/${gameId}/score`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score_a: sA, score_b: sB, estado: status }),
      })
      setSaveState('saved')
    } catch (e) { console.error(e); setSaveState('unsaved') }
  }, [gameId, onUpdate])

  const debouncedSave = useDebouncedSave(rawSave, 1500)

  useEffect(() => {
    if (isFirstRun.current) { isFirstRun.current = false; return }
    setSaveState('unsaved')
    debouncedSave(state.scoreA, state.scoreB, state.status)
  }, [state.scoreA, state.scoreB, state.status])

  const isMatchActive = state.status === 'en partido';

  const modifyScore = (team: 'A' | 'B', amount: number) => {
    if (!isMatchActive) return; 
    setState(prev => ({
        ...prev,
        [team === 'A' ? 'scoreA' : 'scoreB']: Math.max(0, (team === 'A' ? prev.scoreA : prev.scoreB) + amount)
    }))
  }

  const handleWalkover = (winner: 'A' | 'B' | 'CANCEL') => {
      if(!confirm("¿Confirmar acción irreversible?")) return;
      let newStatus = winner === 'CANCEL' ? 'cancelado' : 'finalizado';
      const newScoreA = winner === 'A' ? Math.max(state.scoreA, 3) : (winner === 'B' ? 0 : state.scoreA);
      const newScoreB = winner === 'B' ? Math.max(state.scoreB, 3) : (winner === 'A' ? 0 : state.scoreB);

      if (winner !== 'CANCEL') {
          setState({ ...state, status: newStatus, scoreA: newScoreA, scoreB: newScoreB });
          rawSave(newScoreA, newScoreB, newStatus);
      } else {
          setState({ ...state, status: newStatus });
          rawSave(state.scoreA, state.scoreB, newStatus);
      }
      onClose();
  }

  if (loading) return (
    <div className="fixed inset-0 z-50 bg-blue-50/50 backdrop-blur-sm flex items-center justify-center p-0 md:p-6 animate-in fade-in zoom-in-95 duration-200 font-sans h-[100dvh] w-screen">
        <div className="animate-spin h-8 w-8 border-4 border-slate-800 border-t-transparent rounded-full"/>
    </div>
  );

  return (
<div className="fixed inset-0 z-50 bg-blue-50/50 backdrop-blur-sm flex items-center justify-center p-0 md:p-6 animate-in fade-in zoom-in-95 duration-200 font-sans h-[100dvh] w-screen overflow-y-auto">
      
      <div className="w-full h-full md:h-auto md:max-h-[90vh] max-w-5xl bg-white md:rounded-xl shadow-2xl border-none md:border border-slate-200 overflow-hidden flex flex-col">
        
        <div className="px-4 py-3 md:px-8 md:py-6 flex justify-between items-start border-b border-slate-100 bg-white z-10 shrink-0">
            <div>
                <h1 className="text-lg md:text-2xl font-black text-slate-900 tracking-tight truncate max-w-[200px] md:max-w-none">
                    {game?.disciplina_nombre}
                </h1>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">RONDA {game?.ronda}</p>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
                <div className="bg-slate-100 px-3 py-1.5 md:px-5 md:py-2 rounded-lg text-xl md:text-3xl font-black text-slate-800 font-mono tracking-tight">
                    {formatTime()}
                </div>
                <button 
                    onClick={handleCloseWithCheck} 
                    className="bg-slate-100 cursor-pointer hover:bg-slate-200 text-slate-600 font-bold px-3 py-2 md:px-4 md:py-3 rounded-lg text-xs md:text-sm transition-colors"
                >
                    Salir
                </button>
            </div>
        </div>

        <div className="flex-1 p-3 md:p-8 overflow-y-auto overscroll-contain bg-slate-50/50 md:bg-white">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-stretch min-h-full pb-2">
                
                <div className={`md:col-span-4 bg-white border border-slate-200 rounded-xl p-4 md:p-8 shadow-sm relative transition-all flex flex-col justify-between h-full ${!isMatchActive ? 'opacity-75 md:opacity-50' : ''}`}>
                    <div className="absolute top-0 left-4 right-4 h-1 md:h-1.5 bg-unimar/90 rounded-b-md"></div>
                    
                    <div className="mt-2 md:mt-4 text-center shrink-0">
                        <h2 className="text-lg md:text-xl font-bold text-slate-800 truncate px-2">{game?.competidor_a?.nombre}</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">LOCAL</p>
                    </div>
                    
                    <div className="text-center py-4 md:py-8 flex-1 flex items-center justify-center">
                        <div className="text-6xl md:text-8xl font-black text-slate-900 leading-none tracking-tighter">
                            {state.scoreA}
                        </div>
                    </div>

                    <div className="flex gap-2 md:gap-3 mt-1 shrink-0">
                        <button 
                            disabled={!isMatchActive} 
                            onClick={() => modifyScore('A', -1)} 
                            className="w-12 h-12 md:w-14 md:h-14 flex shrink-0 items-center justify-center rounded-lg cursor-pointer bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 font-bold text-xl md:text-2xl transition-colors disabled:cursor-not-allowed"
                        >-</button>
                        
                        {rules.points.map(p => (
                             <button 
                                key={p} 
                                disabled={!isMatchActive} 
                                onClick={() => modifyScore('A', p)} 
                                className="flex-1 h-12 md:h-14 rounded-lg bg-slate-100 cursor-pointer text-slate-800 hover:bg-slate-200 font-black text-lg md:text-xl transition-colors flex items-center justify-center gap-0.5 disabled:cursor-not-allowed disabled:text-slate-300"
                            >
                                <span className="text-xs font-bold align-top mt-0.5">+</span>{p}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-4 flex flex-col items-center justify-center gap-3 md:gap-6 md:self-center h-full md:h-auto">
                    
                    <div className="w-full bg-white border border-slate-100 rounded-lg p-3 md:p-6 text-center shadow-sm md:shadow-none shrink-0">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 md:mb-2">ESTADO</p>
                        <div className="text-lg md:text-2xl font-black text-slate-700 uppercase">
                             {state.status.replace('_', ' ')}
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-3 shrink-0">
                        {state.status === 'pendiente' && (
                             <button 
                                onClick={() => {
                                    setState(s => ({...s, status: 'en partido'}));
                                    rawSave(state.scoreA, state.scoreB, 'en partido');
                                }}
                                className="w-full py-3 md:py-4 bg-unimar/90 cursor-pointer text-white rounded-lg font-bold hover:bg-unimar transition-all shadow-md shadow-slate-200 flex items-center justify-center gap-2 text-sm md:text-base"
                            >
                                ▶ INICIAR
                             </button>
                        )}
                        {state.status === 'en partido' && (
                             <button 
                                onClick={() => {
                                    setState(s => ({...s, status: 'pausado'}));
                                    rawSave(state.scoreA, state.scoreB, 'pausado');
                                }}
                                className="w-full py-3 md:py-4 bg-amber-500 cursor-pointer text-white rounded-lg font-bold hover:bg-amber-600 transition-all shadow-md shadow-slate-200 flex items-center justify-center gap-2 text-sm md:text-base"
                            >
                                ⏸ PAUSAR
                             </button>
                        )}
                        {state.status === 'pausado' && (
                             <button 
                                onClick={() => {
                                    setState(s => ({...s, status: 'en partido'}));
                                    rawSave(state.scoreA, state.scoreB, 'en partido');
                                }}
                                className="w-full py-3 md:py-4 bg-unimar/90 cursor-pointer text-white rounded-lg font-bold hover:bg-unimar transition-all shadow-md shadow-slate-200 flex items-center justify-center gap-2 text-sm md:text-base"
                            >
                                ▶ REANUDAR
                             </button>
                        )}

                        <div className="relative w-full">
                              <button 
                                onClick={() => setShowWOMenu(!showWOMenu)}
                                className="w-full bg-white border border-dashed cursor-pointer border-slate-300 text-slate-500 text-xs font-bold py-2.5 md:py-3 rounded-lg hover:text-slate-700 hover:border-slate-400 transition-colors"
                            >
                                 ⚠️ Opciones Avanzadas
                            </button>

                             {showWOMenu && (
                                <div className="absolute bottom-full mb-2 w-full bg-white border border-slate-200 shadow-xl rounded-lg p-2 z-20">
                                     <button onClick={() => handleWalkover('A')} className="w-full cursor-pointer text-left px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded">Gana {game?.competidor_a?.nombre}</button>
                                     <button onClick={() => handleWalkover('B')} className="w-full cursor-pointer text-left px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded">Gana {game?.competidor_b?.nombre}</button>
                                     <div className="border-t border-slate-100 my-1"></div>
                                     <button onClick={() => handleWalkover('CANCEL')} className="w-full text-left cursor-pointer px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 rounded">Cancelar Partido</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={`md:col-span-4 bg-white border border-slate-200 rounded-xl p-4 md:p-8 shadow-sm relative transition-all flex flex-col justify-between h-full ${!isMatchActive ? 'opacity-75 md:opacity-50' : ''}`}>
                    <div className="absolute top-0 left-4 right-4 h-1 md:h-1.5 bg-slate-400 rounded-b-md"></div>
                    
                    <div className="mt-2 md:mt-4 text-center shrink-0">
                        <h2 className="text-lg md:text-xl font-bold text-slate-800 truncate px-2">{game?.competidor_b?.nombre}</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">VISITANTE</p>
                    </div>
                    
                    <div className="text-center py-4 md:py-8 flex-1 flex items-center justify-center">
                        <div className="text-6xl md:text-8xl font-black text-slate-900 leading-none tracking-tighter">
                            {state.scoreB}
                        </div>
                    </div>

                    <div className="flex gap-2 md:gap-3 mt-1 shrink-0">
                        <button 
                            disabled={!isMatchActive} 
                            onClick={() => modifyScore('B', -1)} 
                            className="w-12 h-12 md:w-14 md:h-14 shrink-0 flex items-center justify-center rounded-lg cursor-pointer bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 font-bold text-xl md:text-2xl transition-colors disabled:cursor-not-allowed"
                        >-</button>
                        
                        {rules.points.map(p => (
                             <button 
                                key={p} 
                                disabled={!isMatchActive} 
                                onClick={() => modifyScore('B', p)} 
                                className="flex-1 h-12 md:h-14 rounded-lg bg-slate-100 cursor-pointer text-slate-800 hover:bg-slate-200 font-black text-lg md:text-xl transition-colors flex items-center justify-center gap-0.5 disabled:cursor-not-allowed disabled:text-slate-300"
                            >
                                <span className="text-xs font-bold align-top mt-0.5">+</span>{p}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>

        <div className="px-4 py-3 md:px-8 md:py-6 border-t border-slate-100 flex justify-between items-center bg-white shrink-0 z-10">
             <div className="flex flex-col">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 hidden md:block">SINCRONIZACIÓN</p>
                <div className="flex items-center gap-2 bg-slate-50 px-2 py-1 rounded md:bg-transparent md:p-0">
                    <span className={`w-2 h-2 rounded-full ${saveState === 'saved' ? 'bg-emerald-500' : 'bg-amber-400'}`}></span>
                    <span className="text-xs font-bold text-slate-700">{saveState === 'saved' ? 'Guardado' : 'Guardando...'}</span>
                </div>
             </div>
             
             <button 
                disabled={state.status === 'pendiente'}
                onClick={() => {
                    if(confirm("¿Finalizar partido?")) {
                        setState(s => ({...s, status: 'finalizado'}));
                        rawSave(state.scoreA, state.scoreB, 'finalizado');
                        onClose();
                    }
                }}
                className="bg-unimar/90 hover:bg-unimar cursor-pointer text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-bold text-xs md:text-sm transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
             >
                FINALIZAR
             </button>
        </div>

      </div>
    </div>
  )
}
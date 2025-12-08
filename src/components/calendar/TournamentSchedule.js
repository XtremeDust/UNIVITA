'use client';

import { useState, useEffect } from 'react';
import Holidays from 'date-holidays';
import Image from 'next/image';

export default function TournamentDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [now, setNow] = useState(new Date());

  const hd = new Holidays('VE');
  const MATCH_DURATION = 105; 

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true); 
        const response = await fetch('http://127.0.0.1:8000/api/calendar-games');
        if (!response.ok) throw new Error('Error API');

        const data = await response.json();
        const gamesList = data.data ? data.data : data;
        const formattedData = gamesList.map(game => transformData(game));
        
        setMatches(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const transformData = (game) => {
    const [datePart, timePart] = game.fecha.split(' ');
    const [d, m, y] = datePart.split('-');
    
    const dateObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    if (timePart) {
        const [hh, mm] = timePart.split(':');
        dateObj.setHours(parseInt(hh), parseInt(mm), 0, 0);
    }

    const padD = d.padStart(2, '0');
    const padM = m.padStart(2, '0');

    return {
      ...game,
      rawDate: dateObj,
      dateKey: `${y}-${padM}-${padD}`,
      time: timePart,
      home: game.competidor_a,
      away: game.competidor_b
    };
  };

  const upcomingSchedule = (() => {
      if (matches.length === 0) return [];

      const futureCandidates = matches.filter(m => {
          const endTime = new Date(m.rawDate.getTime() + MATCH_DURATION * 60000);
          return endTime > now;
      });

      if (futureCandidates.length === 0) return [];

      futureCandidates.sort((a, b) => a.rawDate - b.rawDate);

      const nextJournalDateKey = futureCandidates[0].dateKey;

      return matches
        .filter(m => m.dateKey === nextJournalDateKey)
        .sort((a, b) => a.rawDate - b.rawDate);
  })();

  const getMatchesForDay = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const key = `${y}-${m}-${d}`;
    return matches.filter(m => m.dateKey === key);
  };
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const changeMonth = (offset) => { setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)); setSelectedDate(null); };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate); 
    const daysArray = [];
    for (let i = 0; i < firstDay; i++) daysArray.push(<div key={`empty-${i}`} className="h-14 md:h-16"></div>);

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayMatches = getMatchesForDay(dateObj);
      const hasMatch = dayMatches.length > 0;
      const isSelected = selectedDate && dateObj.toDateString() === selectedDate.toDateString();
      const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;
      const isHoliday = hd.isHoliday(dateObj) && hd.isHoliday(dateObj)[0].type === 'public';

      let tileClass = "bg-white text-slate-700 hover:bg-blue-50 cursor-pointer border border-slate-100";
      if (isWeekend) tileClass = "bg-slate-50 text-slate-300"; 
      else if (isHoliday) tileClass = "bg-amber-50 text-amber-500 font-bold border-amber-100";
      
      if (hasMatch) tileClass = "bg-blue-50 text-blue-800 font-bold border-blue-200 shadow-sm";
      if (isSelected) tileClass = "bg-unimar text-white shadow-md scale-105 z-10 border-unimar ring-2 ring-blue-200";

      daysArray.push(
        <div key={day} onClick={() => setSelectedDate(dateObj)} className={`h-14 md:h-16 flex flex-col items-center justify-start pt-2 transition-all duration-200 relative rounded-xl mx-1 my-1 ${tileClass}`}>
          <span className="text-sm font-semibold">{day}</span>
          {hasMatch && !isSelected && (
            <div className="flex gap-0.5 mt-1">
               {dayMatches.slice(0,3).map((_, i) => <span key={i} className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>)}
            </div>
          )}
          {isHoliday && !hasMatch && <span className="text-[8px] mt-1">Festivo</span>}
        </div>
      );
    }
    return daysArray;
  };

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const selectedMatches = selectedDate ? getMatchesForDay(selectedDate) : [];

  return (
    <div className="max-w-6xl mx-auto font-sans p-4 col-span-2">
      <div className="flex lg:flex-row gap-6 items-start">

        <div className="w-full lg:w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
            <div className="bg-unimar p-6 text-white flex justify-between items-end">
                <div>
                    <h2 className="text-xl font-bold mb-1">Calendario</h2>
                    <p className="text-white/70 text-sm">Explora el mes.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-white/10 rounded-full transition">
                      <Image
                          src={'/flecha-correcta.png'}
                          alt='izquierda'
                          className=' rotate-180'
                          width={25}
                          height={25}
                      />
                    </button>
                    <span className="font-bold w-24 text-center capitalize">{monthNames[currentDate.getMonth()]}</span>
                    <button onClick={() => changeMonth(1)} className="p-2 hover:bg-white/10 rounded-full transition">
                      <Image
                          src={'/flecha-correcta.png'}
                          alt='izquierda'
                          width={25}
                          height={25}
                      />
                    </button>
                </div>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-7 mb-2">
                    {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'].map(d => <div key={d} className="text-center text-xs font-bold text-slate-400 uppercase">{d}</div>)}
                </div>
                <div className="grid grid-cols-7 mb-6">
                    {renderCalendarDays()}
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 relative overflow-hidden min-h-[140px]">
                    {!selectedDate ? (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400 py-2"><p className="text-sm font-medium">Selecciona un día</p></div>
                    ) : (
                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-3 border-b border-slate-200 pb-2">
                                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                                    {selectedDate.toLocaleDateString('es-VE', { weekday: 'long', day: 'numeric', month: 'long' })}
                                </p>
                                <span className="bg-unimar/12 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full">{selectedMatches.length} Eventos</span>
                            </div>
                            {selectedMatches.length === 0 ? <p className="text-sm text-slate-400 italic">No hay actividad.</p> : (
                                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                                    {selectedMatches.map((game) => (
                                        <div key={game.id} className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm flex justify-between items-center">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-700">{game.home.nombre} vs {game.away.nombre}</span>
                                                <span className="text-[9px] text-slate-400 uppercase">{game.disciplina_nombre}</span>
                                            </div>
                                            {game.estado === 'finalizado' ? 
                                                <span className="text-sm font-black text-slate-800">{game.home.score}-{game.away.score}</span> : 
                                                <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded">{game.time}</span>
                                            }
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>

        <div className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 sticky top-4">
            
            <div className="bg-unimar p-6 text-white relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-600 rounded-full opacity-20 blur-2xl"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-xl font-bold">Próximos Partidos</h2>
                    </div>
                    {upcomingSchedule.length > 0 ? (
                        <p className="text-white/80 text-sm capitalize">
                            {upcomingSchedule[0].rawDate.toLocaleDateString('es-VE', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </p>
                    ) : (
                        <p className="text-white/80 text-sm">Sin actividad pendiente.</p>
                    )}
                </div>
            </div>

            <div className="p-6 min-h-[300px] flex flex-col justify-start">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-full py-10">
                        <p className="text-center text-slate-400">Cargando...</p>
                    </div>
                ) : upcomingSchedule.length > 0 ? (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        
                        {upcomingSchedule.map((game) => {
                            const gameEnd = new Date(game.rawDate.getTime() + MATCH_DURATION * 60000);
                            const isLive = now >= game.rawDate && now <= gameEnd;

                            return (
                                <div key={game.id} className={`rounded-2xl border p-4 transition-all hover:shadow-md ${isLive ? 'bg-red-50 border-red-100 ring-1 ring-red-200' : 'bg-white border-slate-100'}`}>
                                    
                                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-50">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                                            {game.disciplina_nombre}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            {isLive && <span className="text-[10px] font-bold text-red-600 animate-pulse">EN VIVO</span>}
                                            <span className="text-sm font-bold text-slate-700 flex items-center gap-1">
                                                🕒 {game.time}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col items-center w-1/3 text-center">
                                            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-1 overflow-hidden border border-slate-200">
                                                <img src={game.home.img || '/persona.png'} className="w-full h-full object-cover"/>
                                            </div>
                                            <span className="text-xs font-bold text-slate-700 leading-tight">{game.home.nombre}</span>
                                        </div>

                                        <div className="text-xl font-black text-slate-200 italic">VS</div>

                                        <div className="flex flex-col items-center w-1/3 text-center">
                                            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-1 overflow-hidden border border-slate-200">
                                                <img src={game.away.img || '/persona.png'} className="w-full h-full object-cover"/>
                                            </div>
                                            <span className="text-xs font-bold text-slate-700 leading-tight">{game.away.nombre}</span>
                                        </div>
                                    </div>

                                    <div className="mt-2 text-center">
                                         {game.estado === 'finalizado' ? (
                                             <span className="text-sm font-black text-slate-800 bg-slate-100 px-3 py-1 rounded-full">
                                                 {game.home.score} - {game.away.score}
                                             </span>
                                         ) : (
                                             <p className="text-[10px] text-slate-400 uppercase tracking-widest">{game.tournament_nombre}</p>
                                         )}
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                ) : (
                    <div className="text-center text-slate-400 py-10">
                        <p>No hay más partidos programados por ahora.</p>
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
}
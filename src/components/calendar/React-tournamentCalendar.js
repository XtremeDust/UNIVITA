'use client';

import { useState, useEffect } from 'react';
import Holidays from 'date-holidays';

export default function TournamentDashboard() {
  // --- ESTADOS ---
  const [currentDate, setCurrentDate] = useState(new Date(2025, 1, 1)); // Fecha base para ver tus datos de ejemplo
  const [selectedDate, setSelectedDate] = useState(null);
  const [matches, setMatches] = useState([]);
  const [nextMatch, setNextMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const hd = new Holidays('VE');

  // --- 1. CARGA DE DATOS (SIMULACIÓN BDD) ---
  useEffect(() => {
    const fetchData = async () => {
      // AQUÍ TU FETCH REAL:
      // const res = await fetch('http://localhost:8000/api/games?discipline_id=1');
      // const apiJson = await res.json();
      
      // DATOS SIMULADOS BASADOS EN TU JSON:
      const apiJson = {
        "data": [
          {
            "id": 1,
            "estado": "finalizado",
            "fecha": "01-02-2025 00:00",
            "ronda": 1,
            "tournament_nombre": "Juegos Internos UNIMAR",
            "disciplina_nombre": "Fútbol Sala",
            "competidor_a": { "entry_id": 1, "nombre": "Los Pumas", "score": 5, "img": null },
            "competidor_b": { "entry_id": 2, "nombre": "Las Guerreras", "score": 3, "img": null }
          },
          // Agrego un partido futuro para probar la tarjeta "Próximo Partido"
          {
            "id": 2,
            "estado": "proximo",
            "fecha": "15-02-2025 14:00",
            "tournament_nombre": "Copa Rector",
            "disciplina_nombre": "Basket",
            "competidor_a": { "entry_id": 3, "nombre": "Sistemas", "score": 0, "img": null },
            "competidor_b": { "entry_id": 4, "nombre": "Derecho", "score": 0, "img": null }
          }
        ]
      };

      const formatted = apiJson.data.map(game => transformData(game));
      setMatches(formatted);
      calculateNextMatch(formatted);
      setLoading(false);
    };

    fetchData();
  }, []);

  // --- 2. LOGICA DE NEGOCIO ---
  
  // Transformar formato "DD-MM-YYYY HH:mm" a Objetos JS
  const transformData = (game) => {
    const [datePart, timePart] = game.fecha.split(' ');
    const [d, m, y] = datePart.split('-');
    
    // Objeto Date Real (Mes en JS es 0-11)
    const dateObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    const dateKey = `${y}-${m}-${d}`; // YYYY-MM-DD para comparar fácil

    return {
      ...game,
      rawDate: dateObj,
      dateKey: dateKey,
      time: timePart,
      home: game.competidor_a,
      away: game.competidor_b
    };
  };

  // Buscar el partido más próximo
  const calculateNextMatch = (data) => {
    const now = new Date();
    // Filtramos los que su fecha sea mayor a hoy y ordenamos ascendente
    const upcoming = data
      .filter(m => m.rawDate >= now || (m.rawDate.toDateString() === now.toDateString()))
      .sort((a, b) => a.rawDate - b.rawDate);

    if (upcoming.length > 0) setNextMatch(upcoming[0]);
  };

  const getMatchesForDay = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const key = `${y}-${m}-${d}`;
    return matches.filter(match => match.dateKey === key);
  };

  // --- 3. HELPERS DE FECHA ---
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const isHoliday = (date) => {
    const h = hd.isHoliday(date);
    return h && h[0].type === 'public';
  };
  const isWeekend = (date) => date.getDay() === 0 || date.getDay() === 6;

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    setSelectedDate(null);
  };

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  // --- 4. RENDERIZADO DEL GRID (Igual a tu diseño original) ---
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate); 
    const daysArray = [];

    // Espacios vacíos
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(<div key={`empty-${i}`} className="h-14 md:h-16"></div>);
    }

    // Días
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayMatches = getMatchesForDay(dateObj);
      const hasMatch = dayMatches.length > 0;
      const _isHoliday = isHoliday(dateObj);
      const _isWeekend = isWeekend(dateObj);
      const isSelected = selectedDate && dateObj.toDateString() === selectedDate.toDateString();

      // ESTILOS IDÉNTICOS A TU REFERENCIA
      let tileClass = "bg-white text-slate-700 hover:bg-blue-50 cursor-pointer border border-slate-100";
      
      if (_isWeekend) tileClass = "bg-slate-50 text-slate-400"; // Fin de semana suave
      else if (_isHoliday) tileClass = "bg-amber-50 text-amber-500 font-bold border-amber-100";
      
      // Si tiene partido (Prioridad visual)
      if (hasMatch) tileClass = "bg-blue-50 text-blue-800 font-bold border-blue-200 shadow-sm";
      
      // Si está seleccionado (Máxima prioridad)
      if (isSelected) tileClass = "bg-blue-600 text-white shadow-md scale-105 z-10 border-blue-600 ring-2 ring-blue-200";

      daysArray.push(
        <div 
          key={day}
          onClick={() => setSelectedDate(dateObj)}
          className={`
            h-14 md:h-16 flex flex-col items-center justify-start pt-2 transition-all duration-200 relative rounded-xl mx-1 my-1
            ${tileClass}
          `}
        >
          <span className="text-sm">{day}</span>
          
          {/* Indicador de Partido (Punto) */}
          {hasMatch && !isSelected && (
            <div className="flex gap-0.5 mt-1">
               {dayMatches.slice(0,3).map((_, i) => (
                 <span key={i} className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
               ))}
            </div>
          )}
          
          {/* Texto Festivo */}
          {_isHoliday && !hasMatch && <span className="text-[8px] mt-1 uppercase">Festivo</span>}
          
          {/* Texto Partido (si está seleccionado se ve limpio, si no, indicador) */}
          {isSelected && hasMatch && <span className="text-[8px] mt-1 font-normal opacity-80">{dayMatches.length} Juegos</span>}
        </div>
      );
    }
    return daysArray;
  };

  const selectedMatches = selectedDate ? getMatchesForDay(selectedDate) : [];

  return (
    <div className="max-w-6xl mx-auto font-sans p-4">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* --- COLUMNA 1: PRÓXIMO PARTIDO (Estética igual al calendario) --- */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 lg:col-span-1 sticky top-4">
            <div className="bg-slate-900 p-6 text-white relative overflow-hidden">
                {/* Efecto de fondo sutil */}
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500 rounded-full opacity-20 blur-2xl"></div>
                
                <div className="flex items-center gap-2 mb-1 relative z-10">
                    <span className="text-xl">🔥</span>
                    <h2 className="text-xl font-bold">Próximo Juego</h2>
                </div>
                <p className="text-slate-400 text-sm relative z-10">No te pierdas la acción.</p>
            </div>

            <div className="p-6">
                {loading ? (
                    <p className="text-center text-slate-400">Cargando...</p>
                ) : nextMatch ? (
                    <div className="flex flex-col gap-4">
                        <div className="text-center mb-2">
                             <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">
                                {nextMatch.disciplina_nombre}
                             </span>
                        </div>

                        {/* VS GRANDE */}
                        <div className="flex justify-between items-center px-2">
                             <div className="flex flex-col items-center w-1/3">
                                <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-2xl shadow-inner mb-2">
                                    {nextMatch.home.img ? <img src={nextMatch.home.img} className="rounded-full"/> : '🦁'}
                                </div>
                                <span className="text-xs font-bold text-center text-slate-700">{nextMatch.home.nombre}</span>
                             </div>

                             <div className="text-2xl font-black text-slate-300">VS</div>

                             <div className="flex flex-col items-center w-1/3">
                                <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-2xl shadow-inner mb-2">
                                    {nextMatch.away.img ? <img src={nextMatch.away.img} className="rounded-full"/> : '🐯'}
                                </div>
                                <span className="text-xs font-bold text-center text-slate-700">{nextMatch.away.nombre}</span>
                             </div>
                        </div>

                        {/* INFO FECHA */}
                        <div className="mt-4 bg-slate-50 rounded-xl p-4 border border-slate-100 text-center">
                            <p className="text-slate-800 font-bold text-lg capitalize">
                                {nextMatch.rawDate.toLocaleDateString('es-VE', { weekday: 'long', day: 'numeric' })}
                            </p>
                            <div className="flex justify-center items-center gap-2 text-sm text-slate-500 mt-1">
                                <span>⏰ {nextMatch.time}</span>
                                <span>•</span>
                                <span>🏆 {nextMatch.tournament_nombre}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-10 text-slate-400">
                        <p>No hay partidos próximos agendados.</p>
                    </div>
                )}
            </div>
        </div>

        {/* --- COLUMNA 2: CALENDARIO (Tu diseño original) --- */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 lg:col-span-2">
            
            {/* HEADER IGUAL AL ORIGINAL */}
            <div className="bg-slate-900 p-6 text-white flex justify-between items-end">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">📅</span>
                        <h2 className="text-xl font-bold">Calendario Oficial</h2>
                    </div>
                    <p className="text-slate-400 text-sm">Consulta fechas y resultados.</p>
                </div>
                
                {/* CONTROLES DE MES */}
                <div className="flex items-center gap-4 bg-slate-800 rounded-full px-4 py-2 border border-slate-700">
                    <button onClick={() => changeMonth(-1)} className="text-slate-400 hover:text-white transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <span className="font-bold text-sm min-w-[80px] text-center capitalize">
                        {monthNames[currentDate.getMonth()]}
                    </span>
                    <button onClick={() => changeMonth(1)} className="text-slate-400 hover:text-white transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>
            </div>

            <div className="p-6">
                
                {/* LEYENDA (Simplificada) */}
                <div className="flex gap-4 mb-6 text-xs justify-center md:justify-start">
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500"></span><span className="text-slate-500">Día de Juego</span></div>
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400"></span><span className="text-slate-500">Festivo</span></div>
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-300"></span><span className="text-slate-500">Fin de Semana</span></div>
                </div>

                {/* DÍAS SEMANA */}
                <div className="grid grid-cols-7 mb-2">
                    {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'].map(d => (
                    <div key={d} className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider">{d}</div>
                    ))}
                </div>

                {/* GRID CALENDARIO */}
                <div className="grid grid-cols-7 mb-6">
                    {renderCalendarDays()}
                </div>

                {/* DETALLES SELECCIONADOS (Estética Clean) */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 min-h-[140px] relative">
                     {!selectedDate ? (
                        <div className="flex flex-col items-center justify-center h-full py-4 text-slate-400">
                            <span className="text-2xl opacity-50 mb-2">👆</span>
                            <p className="text-sm">Toca un día para ver los detalles</p>
                        </div>
                     ) : (
                        <div className="animate-fade-in">
                            <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
                                <h3 className="font-bold text-slate-800 capitalize">
                                    {selectedDate.toLocaleDateString('es-VE', { weekday: 'long', day: 'numeric', month: 'long' })}
                                </h3>
                                <span className="text-xs font-bold bg-white px-2 py-1 rounded border border-slate-200 text-slate-500">
                                    {selectedMatches.length} Eventos
                                </span>
                            </div>

                            {selectedMatches.length === 0 ? (
                                <p className="text-sm text-slate-400 italic text-center py-2">No hay actividad este día.</p>
                            ) : (
                                <div className="space-y-3">
                                    {selectedMatches.map(game => (
                                        <div key={game.id} className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between hover:border-blue-200 transition">
                                            <div className="flex flex-col gap-1">
                                                <div className="text-xs font-bold text-slate-700">
                                                    {game.home.nombre} <span className="text-slate-400 font-normal">vs</span> {game.away.nombre}
                                                </div>
                                                <div className="flex gap-2 text-[10px] text-slate-400 uppercase font-bold tracking-wide">
                                                    <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">{game.disciplina_nombre}</span>
                                                    <span>{game.tournament_nombre}</span>
                                                </div>
                                            </div>

                                            {/* Estado del juego */}
                                            <div className="text-right">
                                                {game.estado === 'finalizado' ? (
                                                     <span className="text-lg font-black text-slate-800">{game.home.score}-{game.away.score}</span>
                                                ) : (
                                                    <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100">
                                                        {game.time}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                     )}
                </div>

            </div>
        </div>
      </div>
    </div>
  );
}
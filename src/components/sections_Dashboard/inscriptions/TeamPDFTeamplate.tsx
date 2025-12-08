'use client'

import React, { forwardRef } from 'react';
import Image from 'next/image';

// --- Interfaces se mantienen iguales ---
interface ApiUser {
    id: number;
    nombre: string | null;
    email: string | null;
    cedula: string | null;
    telefono: string | null;
    pivot?: { dorsal: string | null; };
}

interface ApiTeamData {
    torneo: string;
    nombre: string;
    disciplina: string;
    categoria: string;
    color: string;
    logo: string | null; 
    captain: { nombre: string; telefono: string | null; };
    integrantes_data: ApiUser[];
}

// --- Colores Hex fijos y seguros ---
const TEXT_BLACK = '#000000';
const BG_WHITE = '#FFFFFF';
const BG_GRAY_100 = '#f3f4f6'; 
const BORDER_GRAY_400 = '#9ca3af'; 

// URL base para los assets estáticos y del backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || '';

const teamLogoPath = (teamLogo: string | null) => {
    if (!teamLogo) return null;
    if (!teamLogo.startsWith('http') && !teamLogo.startsWith('/')) {
        return `/${teamLogo}`;
    }
    return teamLogo;
};

export const TeamPdfTemplate = forwardRef<HTMLDivElement, { teamData: ApiTeamData }>(({ teamData }, ref) => {
    const titles = [
        { id: 1, titulo: 'DORSAL', width: '10%' },
        { id: 2, titulo: 'NOMBRE Y APELLIDO', width: '30%' },
        { id: 3, titulo: 'CÉDULA', width: '15%' },
        { id: 4, titulo: 'TELÉFONO', width: '20%' },
        { id: 5, titulo: 'CORREO INSTITUCIONAL', width: '25%' },
    ];

    const MADRINA_EQUIPO = 'N/A'; 
    const DELEGADO_EQUIPO = teamData.captain.nombre;
    const TELEFONO_DELEGADO = teamData.captain.telefono;
    const TOTAL_ROWS = 10; 

    const teamLogoSrc = teamLogoPath(teamData.logo);
    // Usaremos el logo principal de la universidad
    const uniStaticLogoSrc = '/unimar-logo.png'; 
    // Usaremos el logo combinado o de aniversario para el otro lado.
    const aniversarioTextLogoSrc = '/logounimar-25-aniversario.png'; 

    return (
        <div 
            ref={ref} 
            style={{ 
                width: '210mm', 
                minHeight: '297mm', 
                padding: '25mm', 
                backgroundColor: BG_WHITE,
                color: TEXT_BLACK,
                fontSize: '10pt', 
                fontFamily: 'Arial, sans-serif'
            }}
        >
            
            {/* --- ENCABEZADO SUPERIOR CENTRADO --- */}
            <div style={{ textAlign: 'center', marginBottom: '15pt' }}>
                {/* Logo Estático de la Universidad */}
                <div style={{ width: '100%', height: '80pt', position: 'relative', marginBottom: '10pt' }}>
                    {/* Asumimos que este es el logo principal que quieres centrado sobre el título */}
                    <Image 
                        src={aniversarioTextLogoSrc} // Usamos la URL que definiste para el logo compuesto
                        alt="UNIMAR" 
                        fill 
                        style={{ objectFit: 'contain' }}
                        sizes="100%"
                    />
                </div>
                
                {/* Títulos Debajo del Logo */}
                <h1 style={{ fontSize: '14pt', fontWeight: 'bold', margin: '0 0 5pt 0' }}>CAMPEONATO INTERDISCIPLINAS DEPORTIVAS UNIMAR 2025 II</h1>
                <h2 style={{ fontSize: '12pt', fontWeight: '600', margin: '0' }}>COPA 25 ANIVERSARIO – II EDICIÓN</h2>
            </div>
            
            {/* --- CONTENEDOR DE LOGO DE EQUIPO (MÁS ABAJO, ALINEADO A LA DERECHA) --- */}
            <header style={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                alignItems: 'center', 
                marginTop: '-70pt', // Subimos el logo del equipo para alinearlo al costado del título
                marginBottom: '40pt' 
            }}>
                <div style={{ flexGrow: 1 }}></div> {/* Empujador izquierdo */}
                
                {/* Logo del Equipo (Derecha) 
                
                {teamLogoSrc ? (
                    <Image 
                        src={teamLogoSrc} 
                        alt={`Logo ${teamData.nombre}`} 
                        fill 
                        style={{ objectFit: 'contain' }}
                        sizes="80pt"
                    />
                ) : (
                    <span>Logo Equipo</span>
                )}
                
                
                
                
                */}
                <div style={{ 
                    border: '1pt solid ' + BG_WHITE, 
                    width: '80pt', height: '80pt', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    fontSize: '9pt', color: BG_WHITE, lineHeight: '1.2',
                    position: 'relative', overflow: 'hidden'
                }}>
                </div>
            </header>

            {/* --- INFO GENERAL --- */}
            <div style={{ marginBottom: '18pt', lineHeight: '1.5', fontSize: '10pt', fontWeight: '600' }}>
                <p style={{ margin: '0' }}>DEPORTE: <span style={{ textDecoration: 'underline' }} className="uppercase">{teamData.disciplina}</span></p>
                <p style={{ margin: '0' }}>• NOMBRE DEL EQUIPO: <span style={{ textDecoration: 'underline' }} className="uppercase">{teamData.nombre}</span></p>
            </div>

            {/* --- TABLA DE DATOS DE CONTACTO --- */}
            <div 
                style={{ border: '1pt solid ' + TEXT_BLACK, marginBottom: '30pt', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', textAlign: 'center', fontSize: '8pt', fontWeight: 'bold' }}
            >
                {/* Encabezados */}
                <div style={{ padding: '8pt 4pt', borderRight: '1pt solid ' + TEXT_BLACK, backgroundColor: BG_GRAY_100 }}>DELEGADO DE EQUIPO</div>
                <div style={{ padding: '8pt 4pt', borderRight: '1pt solid ' + TEXT_BLACK, backgroundColor: BG_GRAY_100 }}>TELÉFONO</div>
                <div style={{ padding: '8pt 4pt', borderRight: '1pt solid ' + TEXT_BLACK, backgroundColor: BG_GRAY_100 }}>MADRINA DEL EQUIPO</div>
                <div style={{ padding: '8pt 4pt', backgroundColor: BG_GRAY_100 }}>COLOR DE UNIFORME</div>
                
                {/* Datos */}
                <div className="truncate" style={{ padding: '8pt 4pt', borderTop: '1pt solid ' + TEXT_BLACK }}>{DELEGADO_EQUIPO}</div>
                <div className="truncate" style={{ padding: '8pt 4pt', borderTop: '1pt solid ' + TEXT_BLACK }}>{TELEFONO_DELEGADO || 'N/A'}</div>
                <div className="truncate" style={{ padding: '8pt 4pt', borderTop: '1pt solid ' + TEXT_BLACK }}>{MADRINA_EQUIPO}</div>
                <div style={{ padding: '8pt 4pt', borderTop: '1pt solid ' + TEXT_BLACK, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4pt' }}>
                    <span style={{ backgroundColor: teamData.color || '#000000', width: '8pt', height: '8pt', borderRadius: '50%', border: '1pt solid ' + TEXT_BLACK }}></span>
                    <span className='uppercase'>{teamData.color || 'N/A'}</span>
                </div>
            </div>

            {/* --- TABLA DE INTEGRANTES --- */}
            <div style={{ border: '1pt solid ' + TEXT_BLACK }}>
                
                {/* Encabezados de la Tabla */}
                <div 
                    style={{ 
                        display: 'grid', 
                        gridTemplateColumns: titles.map(t => t.width).join(' '), 
                        textAlign: 'center', 
                        fontSize: '9pt', 
                        fontWeight: 'bold', 
                        backgroundColor: BG_GRAY_100, 
                        borderBottom: '1pt solid ' + TEXT_BLACK 
                    }}
                >
                    {titles.map(t => (
                        <div key={t.id} style={{ padding: '6pt 4pt', borderRight: '1pt solid ' + TEXT_BLACK, whiteSpace: 'nowrap' }}>{t.titulo}</div>
                    ))}
                </div>
                
                {/* Filas */}
                {[...Array(TOTAL_ROWS)].map((_, index) => {
                    const member = teamData.integrantes_data[index];
                    const isDataRow = !!member;
                    
                    return (
                        <div 
                            key={index} 
                            style={{ 
                                display: 'grid',
                                gridTemplateColumns: titles.map(t => t.width).join(' '),
                                borderTop: '1pt solid ' + TEXT_BLACK,
                                fontSize: '8pt',
                                minHeight: '18pt',
                                backgroundColor: index % 2 === 1 ? BG_GRAY_100 : BG_WHITE, 
                            }}
                        >
                            {/* Dorsal */}
                            <div style={{ padding: '4pt', textAlign: 'center', borderRight: '1pt solid ' + TEXT_BLACK }}>{isDataRow ? (member.pivot?.dorsal || '') : ''}</div>
                            {/* Nombre */}
                            <div style={{ padding: '4pt', borderRight: '1pt solid ' + TEXT_BLACK }}>{isDataRow ? (member.nombre || '') : ''}</div>
                            {/* Cédula */}
                            <div style={{ padding: '4pt', textAlign: 'center', borderRight: '1pt solid ' + TEXT_BLACK }}>{isDataRow ? (member.cedula || '') : ''}</div>
                            {/* Teléfono */}
                            <div style={{ padding: '4pt', textAlign: 'center', borderRight: '1pt solid ' + TEXT_BLACK }}>{isDataRow ? (member.telefono || '') : ''}</div>
                            {/* Correo */}
                            <div style={{ padding: '4pt', fontSize: '7pt', borderRight: '1pt solid ' + TEXT_BLACK }}>{isDataRow ? (member.email || '') : ''}</div>
                        </div>
                    );
                })}
            </div>

            {/* --- FOOTER --- */}
            <footer style={{ marginTop: '30pt', textAlign: 'center', fontSize: '9pt' }}>
                <p style={{ fontWeight: 'bold' }}>
                    • Prof. José Luis Alejos Coordinador de Deportes UNIMAR.
                </p>
            </footer>
        </div>
    );
});

TeamPdfTemplate.displayName = 'TeamPdfTemplate';
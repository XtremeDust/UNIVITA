
    
    'use client';
import { useEffect, useRef, useState, useMemo } from "react"; 
import toast from 'react-hot-toast';
import { Button, ContainModal, HeaderModal, FooterModal, Input, InputGroup } from "@/types/ui_components";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import UploadLogo from "@/components/ui/UpLoad_IMG"; 
import CustomSearchSelect from "@/components/ui/CustomSearchSelect";
import MagicB from '@/components/ui/MagicButton';
import UserSearch from "@/components/ui/onUserSearch"; 

interface ModalProps {
  onCloseExternal: () => void;
}

interface ApiDiscipline {
  id: number;
  categoria: string;
  modo_juego: string;
  nombre_deporte: string;
    min_members_team:number;
    max_members_team:number;
}

interface ApiSportRegulation {
  id: number;
  deporte: {
    id: number;
    nombre: string;
  };
  reglamento: {
    id: number;
    titulo: string;
    archivo_url: string;
  };
}

interface ApiTournament {
  id: number;
  nombre: string;
  descripcion: string;
  estado: 'proximo' | 'activo' | 'finalizado';
  creador: any;
  total_disiplinas: number;
  inicio: string;
  fin: string;
  disciplinas: ApiDiscipline[];
  reglamentos_torneo: any[];

}

export default function ModalInscription({onCloseExternal}:ModalProps) {

    const [isSept, setStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tournament, setTournament] = useState<ApiTournament | null>(null);
    const [allRegulations, setAllRegulations] = useState<ApiSportRegulation[]>([]);
    
    const [selectedSportName, setSelectedSportName] = useState<string | null>(null); 
    const [selectedDiscipline, setSelectedDiscipline] = useState<ApiDiscipline | null>(null); 

    const [OpenDep, setMDep] = useState(false);
    const [OpenCat, setMCat] = useState(false);
    const menuOut = useRef<HTMLDivElement>(null);
    const menuOutC = useRef<HTMLDivElement>(null); 

    // --- ESTADOS PARA GESTIÓN DE EQUIPO (PASO 3) ---
    const [showForm, setShowForm] = useState(false);
    const [isExistingUser, setIsExistingUser] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null); 
    const [captainIndex, setCaptainIndex] = useState<number | null>(null);

    const [teamData, setTeamData] = useState({
        nombre: "",
        madrina: "",
        color: "",
        logo: null as File | null,
        integrantes: [] as { dorsal: string; correo: string; cedula: string; telefono: string; isCaptain?: boolean }[],
    });

    const [nuevo, setNuevo] = useState({ 
        dorsal: "", correo: "", cedula: "", telefono:"", nombre: "" 
    });

    const [integranteError, setIntegranteError] = useState({ dorsal: "", correo: "", cedula: "", telefono: "" });
    
    const [errors, setErrors] = useState({
        nombre: "", madrina: "", color: "", logo: "",
        integrantes: [] as any[],
    });

    const setVariant = {
        entre: { x: 50, opacity: 0, trasition: { duration: 0.5 } },
        center: { x: 0, opacity: 1, trasition: { duration: 0.5 } },
        exit: { x: -50, opacity: 0, trasition: { duration: 0.5 } }
    };

    const uniqueSports = useMemo(() => {
        if (!tournament) return [];
        const allSportNames = tournament.disciplinas.map(d => d.nombre_deporte);
        return [...new Set(allSportNames)];
    }, [tournament]); 

    const availableCategories = useMemo(() => {
        if (!tournament || !selectedSportName) return [];
        return tournament.disciplinas.filter(d => d.nombre_deporte === selectedSportName);
    }, [tournament, selectedSportName]); 

    useEffect(() => {
        async function fetchCurrentTournament() {
            setLoading(true);
            setError(null);
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
            try {
                const [tournamentRes, regulationsRes] = await Promise.all([
                    fetch(`${API_URL}/current-tournament`),
                    fetch(`${API_URL}/sport-regulations`) 
                ]);
                
                if (!tournamentRes.ok) throw new Error("Error cargando torneo");
                
                const tournamentData = await tournamentRes.json();
                setTournament(tournamentData.data);

                if (regulationsRes.ok) {
                    const regData = await regulationsRes.json();
                    setAllRegulations(regData.data);
                }

            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }
        fetchCurrentTournament();
    }, []);

    const activeRegulation = useMemo(() => {
        if (!selectedSportName) return null;
        return allRegulations.find(r => 
            r.deporte.nombre.toLowerCase() === selectedSportName.toLowerCase()
        );
    }, [selectedSportName, allRegulations]);

    useEffect(()=>{
        function handleOutClick(event: globalThis.MouseEvent) {
            const target = event.target as Node;
            if (OpenDep && menuOut.current && !menuOut.current.contains(target)) {
                setMDep(false);
            }
            if (OpenCat && menuOutC.current && !menuOutC.current.contains(target)) {
                setMCat(false);
            }
        }
        if (OpenDep || OpenCat) {
            document.addEventListener("mousedown", handleOutClick);
        }
        return () => {
            document.removeEventListener("mousedown", handleOutClick);
        };
    }, [OpenDep, OpenCat]); 

    const next = () => (setStep(isSept =>isSept+1));
    const prev = () => (setStep(isSept=>isSept-1));

    const handleCloseModal=()=>{
        onCloseExternal();
        setStep(1);
        setSelectedSportName(null);
        setSelectedDiscipline(null);
        setMDep(false);
        setMCat(false);

        // Reset completo
        setTeamData({ nombre: "", madrina: "", color: "", logo: null, integrantes: [] });
        setErrors({ nombre: "", madrina: "", color: "", logo: "", integrantes: [] });
        setNuevo({ dorsal: "", correo: "", cedula: "", telefono: "", nombre: "" });
        setIntegranteError({ dorsal: "", correo: "", cedula: "", telefono: "" });
        setEditIndex(null);
        setCaptainIndex(null);
        setShowForm(false);
        setIsExistingUser(false);
    };

    const handleSelectD = (sportName: string) => {
        if (selectedSportName === sportName) {
            setSelectedSportName(null);
            setSelectedDiscipline(null);
            setMDep(false);
        } else {
            setSelectedSportName(sportName); 
            setSelectedDiscipline(null);    
            setMDep(false);                  
            setMCat(true);                  
        }
    };

    const handleSelectC = (discipline: ApiDiscipline) => {
        setSelectedDiscipline(discipline); 
        setMCat(false);                    
    };

    const canAdvanceStep1 = selectedSportName !== null && selectedDiscipline !== null;

    const handleNextClick = () => {
        if (isSept === 1) {    
            if (!canAdvanceStep1) {        
                toast.error("Selecciona un deporte y una categoría para continuar.");
                return; 
            }
        }
        next();
    };

    const handleChange = (field: string, value: any) => {
        setTeamData((prev) => ({ ...prev, [field]: value }));
        if (errors[field as keyof typeof errors]) {
             setErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    const [minIntegrantes, maxIntegrantes] = useMemo(() => {
        if (!selectedDiscipline) return [1, 12];
        return [
        selectedDiscipline.min_members_team, 
        selectedDiscipline.max_members_team
        ];
    }, [selectedDiscipline]); 
    const handleUserFound = (user: any) => {
        const alreadyInTeam = teamData.integrantes.some(m => m.cedula === user.cedula || m.cedula === `V-${user.cedula}`);
        if (alreadyInTeam) {
            toast.error("Este jugador ya está en tu equipo.");
            return;
        }
        setNuevo({
            dorsal: '', 
            cedula: user.cedula ? user.cedula.replace(/^V-/, '') : '', 
            correo: user.email || user.correo || '', 
            telefono: user.telefono || '', 
            nombre: user.nombre || user.name || '',
        });
        setIsExistingUser(true); 
        setShowForm(true);
    };

    const handleNotFound = (cedulaSearched: string) => {
        setNuevo({
            dorsal: '',
            telefono: '',
            cedula: cedulaSearched, 
            correo: '',
            nombre: ''
        });
        setIsExistingUser(false);
        setShowForm(true);
    };

    const cancelForm = () => {
        setShowForm(false);
        setEditIndex(null);
        setNuevo({ dorsal: '', telefono: '', cedula: '', correo: '', nombre: '' });
        setIntegranteError({ dorsal: "", correo: "", cedula: "", telefono: "" });
        setIsExistingUser(false);
    };

    const validateIntegrante = (
        integrante: { dorsal: string, correo: string, cedula: string, telefono: string },
        currentIntegrantes: { dorsal: string, correo: string, cedula: string, telefono: string }[],
        currentIndex: number | null
    ) => {
        const newErrors = { dorsal: "", correo: "", cedula: "", telefono: "" };
        let isValid = true;
        
        const dorsal = integrante.dorsal.trim();
        const correo = integrante.correo.trim().toLowerCase();
        const cedula = integrante.cedula.trim(); 
        const telefono = integrante.telefono.trim();
        
        if (!/^[0-9]+$/.test(dorsal)) { newErrors.dorsal = "Solo números."; isValid = false; }
        if (!/^[0-9]{7,9}$/.test(cedula)) { newErrors.cedula = "Debe tener 7-9 dígitos."; isValid = false; }
        if (!/^[0-9]{10,11}$/.test(telefono)) { newErrors.telefono = "Teléfono inválido."; isValid = false; }
        if (!/^[^@\s]+@unimar\.edu\.ve$/i.test(correo)) { newErrors.correo = "Debe ser @unimar.edu.ve"; isValid = false; }

        if (isValid) {
            const nuevaCedulaNormalizada = `V-${cedula}`;
            currentIntegrantes.forEach((member, index) => {
                if (currentIndex !== null && index === currentIndex) return;
                if (member.dorsal === dorsal) { newErrors.dorsal = "Dorsal ocupado."; isValid = false; }
                if (member.cedula === nuevaCedulaNormalizada) { newErrors.cedula = "Ya en lista."; isValid = false; }
                if (member.correo === correo) { newErrors.correo = "Correo repetido."; isValid = false; }
            });
        }
        setIntegranteError(newErrors);
        return isValid;
    };

    const handleAddIntegrante = () => {
        if (!validateIntegrante(nuevo, teamData.integrantes, editIndex)) return;
       
        const integranteNormalizado = {
            dorsal: nuevo.dorsal.trim(),
            correo: nuevo.correo.trim().toLowerCase(),
            cedula: `V-${nuevo.cedula.trim()}`,
            telefono: nuevo.telefono.trim(),
            isCaptain: false,
        };

        if (editIndex !== null) {
            const nuevosIntegrantes = [...teamData.integrantes];
            const isEditingCaptain = teamData.integrantes[editIndex].isCaptain;
            nuevosIntegrantes[editIndex] = { ...integranteNormalizado, isCaptain: isEditingCaptain }; 
            setTeamData({ ...teamData, integrantes: nuevosIntegrantes });
            setEditIndex(null);
        } else {
            if (teamData.integrantes.length >= maxIntegrantes) {
                toast.error(`Máximo ${maxIntegrantes} integrantes.`);
                return;
            }
            setTeamData({ ...teamData, integrantes: [...teamData.integrantes, integranteNormalizado] });
        }
        
        setNuevo({ dorsal: "", correo: "", cedula: "", telefono: "", nombre: "" });
        setIntegranteError({ dorsal: "", correo: "", cedula: "", telefono:"" });
        setShowForm(false);
        setIsExistingUser(false);
    };

    const handleRemoveIntegrante = (index:number) => {
        if (index === captainIndex) setCaptainIndex(null);
        else if (captainIndex !== null && index < captainIndex) setCaptainIndex(captainIndex - 1);
        
        const nuevos = teamData.integrantes.filter((_, i) => i !== index);
        setTeamData({ ...teamData, integrantes: nuevos });
    };

    const handleEditIntegrante = (index:number) => {
        setEditIndex(index);
        const integranteAEditar = teamData.integrantes[index];
        setNuevo({
            dorsal: integranteAEditar.dorsal,
            correo: integranteAEditar.correo,
            telefono: integranteAEditar.telefono,
            cedula: integranteAEditar.cedula.replace(/^V-/, ''), 
            nombre: "" 
        });
        setIsExistingUser(true);
        setShowForm(true);
    };

    const handleSetCaptain = (index: number) => {
        setTeamData(prev => ({
            ...prev,
            integrantes: prev.integrantes.map((int, i) => ({
            ...int,
            isCaptain: i === index,
            }))
        }));
        setCaptainIndex(index);
    };

    // --- VALIDACIÓN FINAL ---
    const validateStep3 = () => {
        const newErrors: any = { integrantes: [] };
        let valid = true;
        
        if (!teamData.nombre) { newErrors.nombre = "El nombre es obligatorio."; valid = false; }
        if (!teamData.color) { newErrors.color = "Indica el color."; valid = false; }
        if (!teamData.madrina) { newErrors.madrina = "Indica la madrina."; valid = false; }
        if (!teamData.logo) { newErrors.logo = "Sube el logo."; valid = false; }
        
        if (captainIndex === null) {
            toast.error("Selecciona un capitán.");
            valid = false;
        }
        if (teamData.integrantes.length < minIntegrantes) { 
            toast.error(`Mínimo ${minIntegrantes} integrantes.`);
            valid = false; 
        }
        if (teamData.integrantes.length > maxIntegrantes) { 
            toast.error(`Máximo ${maxIntegrantes} integrantes.`);
            valid = false; 
        }
        
        setErrors(newErrors);
        return valid;
    };

    const handleFinalSubmit = async () => {
        if (!validateStep3()) return;
        
        const captain = teamData.integrantes.find(int => int.isCaptain);
        if (!captain) return;

        setLoading(true);
        const data = new FormData();
        data.append('discipline_id', selectedDiscipline!.id.toString());
        data.append('team_name', teamData.nombre);
        data.append('madrina', teamData.madrina);
        data.append('color', teamData.color);
        if (teamData.logo) data.append('logo', teamData.logo);
        data.append('delegado_correo', captain.correo);
        data.append('delegado_telefono', captain.telefono);
        data.append('integrantes', JSON.stringify(teamData.integrantes));

        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
        
        try {
            const res = await fetch(`${API_URL}/discipline-entries`, {
                method: 'POST',
                body: data,
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Error al crear la inscripción');
            }
            
            toast.success('¡Inscripción enviada con éxito!');
            handleCloseModal();
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !tournament) {
        return (
            <ContainModal className="w-full max-w-md p-6 flex items-center justify-center">
                <p>Cargando información del torneo...</p>
            </ContainModal>
        );
    }
    
    if (error) {
         return (
            <ContainModal className="w-full max-w-md p-6 bg-white">
                <HeaderModal onClose={handleCloseModal} >
                    <h3 className="text-xl font-bold text-red-600">Error</h3>
                </HeaderModal>
                <div className="p-4 text-center">
                    <p className="text-gray-700 mt-2">{error}</p>
                    <Button onClick={handleCloseModal} className="btn w-full mt-4 bg-unimar text-white">Cerrar</Button>
                </div>
            </ContainModal>
        );
    }

  return (
        <ContainModal className={`grid-flow-row-dense md:flex md:flex-col text-black ${ isSept===1 ? 'w-[95%] h-[80%] sm:h-[75%] md:w-[80%] md:h-[70%] lg:w-[75%] lg:h-[70%] xl:w-[60%] xl:h-[72%] 2xl:w-[50%] 2xl:h-[70%]':(isSept===2 ? 'w-[95%] h-[94%] sm:w-[95%] sm:h-[88%] md:w-[90%] md:h-[75%] lg:w-[65%] lg:h-[78%] xl:w-[55%] xl:h-[77%] 2xl:w-[45%] 2xl:h-[77%]':'size-[95%] md:w-[70%] md:h-[95%]  xl:w-[35%]') }  space-y-3 overflow-y-auto bg-gray-100`}>
            <HeaderModal className="flex-none" onClose={handleCloseModal}>
                <div className="text-start">
                    <h2 className="ml-5 title">Formulario de Inscripción</h2>
                    <p className="ml-5 text-[1.2rem]">Complete los detalles de su equipo para finalizar la inscripción.</p>
                </div>
            </HeaderModal>

            <div className="fases grid grid-cols-3">
                <div className="place-items-center space-y-2">
                    <h2 className={`rounded-full p-2 size-[48px] place-content-center ${isSept===1 ? 'bg-unimar text-white':'bg-gray-300 '}`}>1</h2>
                    <p className={`${isSept===1 ? 'text-unimar font-bold':'text-gray-700'}`}>Información Básica</p>
                </div>
                <div className="place-items-center space-y-2">
                    <h2 className={`rounded-full p-2 size-[48px] place-content-center ${isSept===2 ? 'bg-unimar text-white':'bg-gray-300 '}`}>2</h2>
                    <p className={`${isSept===2 ? 'text-unimar font-bold':'text-gray-700'}`}>Detalles del Torneo</p>
                </div>
                <div className="place-items-center space-y-2">
                    <h2 className={`rounded-full p-2 size-[48px] place-content-center ${isSept===3 ? 'bg-unimar text-white':'bg-gray-300 '}`}>3</h2>
                    <p className={`${isSept===3 ? 'text-unimar font-bold':'text-gray-700'}`}>Información del Equipo</p>
                </div>
            </div>

            <div className="relative flex-grow main-modal place-content-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isSept}
                        variants={setVariant}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className={` space-y-2 transition-opacity flex flex-col p-2 `}
                    >
                        
                        {isSept ===1 &&(
                            <section className="flex flex-col p-2 shadow rounded-xl bg-gray-100">
                                <div className="section-title mt-3 flex flex-row gap-2 ml-3 place-items-center">
                                    <div className="relative size-[52px] bg-unimar/8 rounded-full">
                                        <Image className=" absolute inset-0 object-contain scale-100" src={'/informe.png'} alt="lol" fill />
                                    </div>
                                    <div className="text-start">
                                        <h3 className="text-[1.3rem] font-bold">Información Básica</h3>
                                    </div>
                                </div>
                                <div className="flex flex-col md:grid md:grid-cols-2 gap-3 text-start p-3">
                                    <CustomSearchSelect
                                        label="Deporte"
                                        options={uniqueSports}
                                        value={selectedSportName}
                                        onChange={(val)=>handleSelectD(val)}
                                        placeholder="Buscar deporte"
                                    />    
                                    <InputGroup For="Categoria" label="Categoría" labelClass=" mb-1.5 text-gray-700">
                                        <div className="relative" ref={menuOutC} onClick={() => selectedSportName && setMCat(!OpenCat)}>
                                            <Input type='text' id="Categoria" className="cursor-pointer input w-full pl-6 pr-3 py-3 disabled:text-gray-500 text-black" placeholder="Seleccione una Categoría" readOnly value={selectedDiscipline?.categoria ?? "Seleccione una Categoría"} required disabled={!selectedSportName} />
                                            <Button type="button" className=" cursor-pointer absolute top-1/2 right-1 lg:right-4 flex justify-center -translate-y-1/2 -translate-x-1/2">
                                                <Image className={`size-[1rem] transition-transform duration-300 ease-in-out ${OpenCat && selectedSportName ? 'rotate-180' : ' rotate-360'}`} src={'https://res.cloudinary.com/dnfvfft3w/image/upload/v1759101273/flecha-hacia-abajo-para-navegar_zixe1b.png'} alt="desplegar" width={100} height={100} />
                                            </Button>
                                            <div className={`absolute z-20 bg-white shadow-lg mt-1 rounded-xl overflow-hidden overflow-y-auto ${OpenCat ? 'w-full h-auto' : 'max-h-0 opacity-0 pointer-events-none'}`} >
                                                {availableCategories.map((discipline) => (
                                                    <div key={discipline.id} className={`px-4 py-2 cursor-pointer text-sm transition-colors hover:bg-blue-50 hover:text-blue-700 ${selectedDiscipline?.categoria === discipline.categoria ?'bg-blue-100 font-semibold text-blue-800' : 'text-gray-700'}`} onClick={() => handleSelectC(discipline)} >
                                                        <span className={`ml-2 `}>{discipline.categoria}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </InputGroup> 
                                    <InputGroup For="Torneo" label="Nombre del Torneo" labelClass="text-gray-700" className="md:col-span-2">
                                        <div className="relative">
                                            <Input type="text" id="Torneo" className="input w-full pl-6 pr-3 py-3 placeholder:text-black" value={tournament?.nombre || 'Cargando...'} disabled />
                                        </div>
                                    </InputGroup>
                                    <div className=" border-l-4 border-blue-600 col-span-2 p-4 bg-blue-100 text-blue-800 rounded-xl mb-3">
                                        <span>La fecha límite de inscripción: {tournament?.inicio ?? '...'}</span>
                                    </div>
                                </div>
                            </section>
                        )}
                        
                        {isSept ===2 &&(
                            <section className="flex flex-col py-2 px-3 shadow rounded-xl bg-gray-100/75">
                                <div className="section-title  flex flex-col space-y-3">
                                    <div className="flex flex-col place-items-start mt-3 ml-5">
                                        <div className="text-start">
                                            <h3 className="text-[1.5rem] font-bold ">{tournament?.nombre}</h3>
                                        </div>
                                        <p className="text-gray-500">"Uniendo comunidades a través del deporte"</p>
                                    </div>
                                    <div className="py-1 px-2 place-content-center text-start gap-3 mb-3 flex flex-col">
                                        <div className="bg-white p-4 rounded-2xl shadow-md flex gap-3">
                                            <div className=" relative size-[48px] bg-unimar/15 rounded-full">
                                                <Image className=" absolute inset-0 object-contain scale-85" src={'/fecha.png'} alt="lol" fill />
                                            </div>
                                            <div className=" items-center">
                                                <h3 className="text-[1rem] font-semibold">Fechas Clave</h3>
                                                <div className="text-gray-400">
                                                    <p>Inscripciones: 15 de Agosto - 25 de Agosto </p>
                                                    <p>Inicio del Torneo: {tournament?.inicio}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-3">
                                            <div className="bg-white p-4 rounded-2xl shadow-md">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative size-[48px] bg-unimar/15 rounded-full">
                                                        <Image className=" absolute inset-0 object-contain scale-80" src={'/deporte.png'} alt="lol" fill />
                                                    </div>
                                                    <div className="text-start">
                                                        <h3 className=" text-gray-400">Deporte</h3>
                                                        <p className="text-[1rem] font-semibold  text-black">{selectedDiscipline?.nombre_deporte}</p>
                                                    </div>
                                                </div>
                                            </div> 
                                            <div className="bg-white p-4 rounded-2xl shadow-md">
                                                <div className="flex items-center  text-gray-700  gap-3">
                                                    <div className="relative size-[48px] bg-unimar/15 rounded-full">
                                                        <Image className=" absolute inset-0 object-contain scale-85" src={'/categoria.png'} alt="lol" fill />
                                                    </div>
                                                    <div className="text-start">
                                                        <h3 className="text-gray-400">Categoría</h3>
                                                        <p className="text-[1rem] font-semibold text-black">Categoría {selectedDiscipline?.categoria}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white px-4 py-2 rounded-2xl shadow-md  items-center gap-3 space-y-1">
                                            <h3 className="my-2 font-semibold text-lg">Reglamentos</h3>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative size-[48px] bg-gray-200 rounded-full flex items-center justify-center">
                                                        <Image className=" absolute inset-0 object-contain" src={'/informe.png'} alt="lol" fill />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-[1rem] font-semibold ">Reglamento de la Disciplina</h3>
                                                        <p className="text-gray-400">consulte las reglas antes de inscribirse.</p>
                                                    </div>
                                                </div>
                                                {activeRegulation ? (
                                                    <MagicB url={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/regulations/${activeRegulation.reglamento.id}/download`} isAvailable={true} />
                                                ) : (
                                                    <div className="text-xs text-gray-400 italic bg-gray-50 px-3 py-1 rounded border border-dashed">No disponible</div>
                                                )}
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </section>
                        )}

                        {isSept === 3 && (
                            <section className="flex flex-col space-y-5 py-4 px-3">
                                <div className="section-title flex flex-col space-y-4 px-3 bg-gray-100 shadow rounded-xl">
                                    <div className="flex place-items-center mt-3 gap-2 ml-2">
                                        <div className="relative size-[52px] bg-unimar/5 rounded-full">
                                            <Image className=" absolute inset-0 object-contain grayscale-20" src={'/personas.png'} alt="lol" fill />
                                        </div>
                                        <div className="text-start">
                                            <h3 className="text-[1.3rem] font-bold">Información del Equipo</h3>
                                        </div>
                                    </div>

                                    <div className="flex flex-col px-2">
                                        <div className="mb-6 px-2 gap-3 place-content-center">
                                            <div className="text-start space-y-3">
                                                <InputGroup label="Nombre del equipo" labelClass="text-gray-500" For="nombre">
                                                    <Input className="input w-full" type="text" value={teamData.nombre} onChange={(e) => handleChange("nombre", e.target.value)} placeholder="Ej: Los Campeones" /> 
                                                    {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
                                                </InputGroup> 
                                                <InputGroup label="Madrina del equipo" labelClass="text-gray-500" For="madrina">
                                                    <Input className="input" type="text" value={teamData.madrina} onChange={(e) => handleChange("madrina", e.target.value)} placeholder="Ej: María Villarroel" /> 
                                                    {errors.madrina && <p className="text-red-500 text-sm mt-1">{errors.madrina}</p>}
                                                </InputGroup> 
                                                <InputGroup label="Color del uniforme" labelClass="text-gray-500" For="color">
                                                    <Input className="input" type="text" value={teamData.color} onChange={(e) => handleChange("color", e.target.value)} placeholder="Ej: Azul y Blanco" /> 
                                                    {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color}</p>}
                                                </InputGroup>  
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col p-3 bg-gray-100 shadow rounded-xl">
                                    <UploadLogo label={'Logo del equipo'} file={teamData.logo} previewUrl={null} error={errors.logo} onFileChange={(file) => {
                                        setTeamData(prev => ({ ...prev, logo: file }));
                                        if (file) setErrors(prev => ({ ...prev, logo: "" }));
                                    }} />
                                    {errors.logo && <p className="text-red-500 text-sm mb-0.5">{errors.logo}</p>}
                                </div>

                                <section className="flex flex-col space-y-4 p-4 bg-gray-100 shadow rounded-xl">
                                    <div className="flex items-center gap-2">
                                        <div className="relative size-[52px] bg-unimar/8 rounded-full">
                                            <Image className="absolute inset-0 object-contain" src="/deporte.png" alt="Integrantes" fill />
                                        </div>
                                        <h3 className="text-[1.3rem] font-bold">Integrantes del Equipo</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm font-medium">
                                        Integrantes: {teamData.integrantes.length} / {maxIntegrantes}
                                        (Mínimo requerido: {minIntegrantes})
                                    </p>
                                    <div className="overflow-hidden min-h-[100px]">
                                        <AnimatePresence mode="wait">
                                            {teamData.integrantes.map((int, i) => (
                                                <div key={i} className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm mb-2">                                
                                                    <div className="flex items-center gap-3">
                                                        <div className="size-10 flex items-center justify-center bg-blue-100 text-blue-600 font-bold rounded-full">
                                                            {int.dorsal}
                                                        </div>
                                                        <div className="text-start">
                                                            <p className="font-semibold text-gray-900">{int.cedula}</p>
                                                            <p className="text-gray-500 text-sm">{int.correo}</p>
                                                            <p className="text-gray-500 text-sm">{int.telefono}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-1.5">
                                                        <button onClick={() => handleSetCaptain(i)} title="Designar como Capitán" className={`p-2 rounded-full cursor-pointer transition-colors ${captainIndex === i ? 'bg-yellow-100/75 text-white' : 'grayscale hover:bg-yellow-200/75'}`}>
                                                            <Image src={`/favorito.png`} width={28} height={36} alt="capitan" />
                                                        </button>
                                                        <button onClick={() => handleEditIntegrante(i)} className=" hover:bg-gray-200 p-2 rounded-full cursor-pointer">
                                                            <Image src="/lapiz (1).png" alt="Editar" width={24} height={16} />
                                                        </button>
                                                        <button disabled={editIndex !== null} onClick={() => handleRemoveIntegrante(i)} className={` hover:bg-rose-200 p-2 rounded-full cursor-pointer disabled:grayscale `}>
                                                            <Image src="/basura (1).png" alt="Eliminar" width={24} height={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}

                                            {!showForm ? (
                                                <motion.div key="search-component" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="p-2">
                                                    {teamData.integrantes.length < maxIntegrantes &&(
                                                        <UserSearch onStudentFound={handleUserFound} onStudentNotFound={handleNotFound} />  
                                                    )}
                                                </motion.div>
                                            ) : (
                                                <motion.div key="add-form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3, ease: "easeOut" }} className="relative flex flex-col mt-3 gap-3 p-4 bg-white rounded-xl border-2 border-unimar/20 shadow-lg">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h4 className="font-bold text-unimar flex items-center gap-2">
                                                            {isExistingUser ? (
                                                                <>
                                                                    <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Encontrado</span>
                                                                    {nuevo.nombre}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full">Nuevo Ingreso</span>
                                                                    Completar Registro
                                                                </>
                                                            )}
                                                        </h4>
                                                        <button onClick={cancelForm} className="text-gray-400 hover:text-red-500 text-sm font-bold transition-colors">
                                                            Cancelar ✕
                                                        </button>
                                                    </div>

                                                    <div className="flex flex-wrap items-start gap-4">
                                                        <div className="w-24"> 
                                                            <label className="text-xs font-bold text-gray-500 ml-1">Dorsal</label>
                                                            <Input autoFocus placeholder="N°" value={nuevo.dorsal} onChange={(e) => setNuevo({ ...nuevo, dorsal: e.target.value })} className="input w-full text-center text-lg border-unimar ring-2 ring-unimar/10 focus:ring-unimar/50" />
                                                            {integranteError.dorsal && <p className="text-red-500 text-xs mt-1 animate-pulse">{integranteError.dorsal}</p>}
                                                        </div>
                                                        <div className="flex-1 min-w-[140px]">
                                                            <label className="text-xs font-bold text-gray-500 ml-1">Cédula</label>
                                                            <div className="relative flex items-center opacity-100"> 
                                                                <span className="absolute left-3 text-gray-500 text-sm z-10">V-</span>
                                                                <Input readOnly={isExistingUser} value={nuevo.cedula} onChange={(e) => setNuevo({ ...nuevo, cedula: e.target.value })} className={`input w-full pl-8 font-medium ${isExistingUser ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-white border-orange-200'}`} />
                                                            </div>
                                                            {integranteError.cedula && <p className="text-red-500 text-xs mt-1 animate-pulse">{integranteError.cedula}</p>}
                                                        </div>
                                                        <div className="flex-[2] min-w-[200px]"> 
                                                            <label className="text-xs font-bold text-gray-500 ml-1">Correo Institucional</label>
                                                            <Input readOnly={isExistingUser} placeholder="usuario@unimar.edu.ve" value={nuevo.correo} onChange={(e) => setNuevo({ ...nuevo, correo: e.target.value })} className={`input w-full ${isExistingUser ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-white'}`} />
                                                            {integranteError.correo && <p className="text-red-500 text-xs mt-1 animate-pulse">{integranteError.correo}</p>}
                                                        </div>
                                                        <div className="flex-1 min-w-[140px] "> 
                                                            <label className="text-xs font-bold text-gray-500 ml-1">Teléfono</label>
                                                            <Input readOnly={isExistingUser && nuevo.telefono.length > 5} placeholder="0414..." value={nuevo.telefono} onChange={(e) => setNuevo({ ...nuevo, telefono: e.target.value })} className={`input w-full ${isExistingUser && nuevo.telefono.length > 5 ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-white'}`} />
                                                            {integranteError.telefono && <p className="text-red-500 text-xs mt-1 animate-pulse">{integranteError.telefono}</p>}
                                                        </div>
                                                        <Button onClick={handleAddIntegrante} className="w-full md:w-auto bg-unimar text-white font-bold rounded-xl px-8 py-2 cursor-pointer mt-1 hover:bg-unimar/90 self-end shadow-md active:scale-95 transition-transform">
                                                            {isExistingUser ? "Añadir Jugador" : "Registrar"}
                                                        </Button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </section>
                            </section>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <FooterModal
                className="flex-none"
                BTmain={isSept > 2 ? 'Finalizar Inscripción' : 'Siguiente'}
                BTSecond={isSept > 1 ? 'Atrás' : 'Cerrar'}
                onClose={isSept > 1 ? prev : handleCloseModal}
                onSumit={isSept === 1 ? handleNextClick : isSept === 2 ? next : handleFinalSubmit}
                disabled={loading}
            />
        </ContainModal>
  )
}

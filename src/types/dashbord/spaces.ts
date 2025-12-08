export interface Schedule {
    id: number;
    space_id: number;
    day: string;       
    start_time: string; 
    end_time: string;  
}

export interface Space {
    id: number;
    name: string;
    location: string | null;
    status: 'activo' | 'mantenimiento';
    schedules: Schedule[];
}
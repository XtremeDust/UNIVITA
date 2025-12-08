export interface RatingList {
    id: number;
    tournament_id: number;
    tournament_name: string; 
    email: string;
    autor_nombre: string;
    score: number; 
    comment: string; 
    fecha: string;
}

export interface RatingStats {
    average: number;
    total: number;
    count_5_stars: number;
    count_1_star: number;
}
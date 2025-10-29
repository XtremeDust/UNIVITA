<?php

namespace Database\Seeders;

use App\Models\ActivityRegulation;
use App\Models\DisciplineRegulation;
use App\Models\SportRegulation;
use App\Models\TournamentRegulation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RegulationAssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Asignar Regla General a Torneo Juegos 
        TournamentRegulation::create(['tournament_id' => 1, 'regulation_id' => 1]);
        // Asignar Regla General a Torneo Aniversario
        TournamentRegulation::create(['tournament_id' => 2, 'regulation_id' => 1]);

        // Asignar Regla Futsal a Deporte Futsal
        SportRegulation::create(['sport_id' => 1, 'regulation_id' => 2]);
        // Asignar Regla Futsal también a Disciplina Futsal Masc 
        DisciplineRegulation::create(['discipline_id' => 1, 'regulation_id' => 2]);

        // Asignar Regla Cultural a Actividad Concierto
        ActivityRegulation::create(['activity_id' => 1, 'regulation_id' => 3]);
        // Asignar Regla Cultural a Actividad Expo
        ActivityRegulation::create(['activity_id' => 3, 'regulation_id' => 3]);

         // Asignar Regla Tenis de Mesa a Disciplina Tenis de Mesa
        DisciplineRegulation::create(['discipline_id' => 3, 'regulation_id' => 4]);
    }
}

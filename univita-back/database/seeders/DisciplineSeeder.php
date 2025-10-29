<?php

namespace Database\Seeders;

use App\Models\Discipline;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DisciplineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Disciplinas para Juegos Internos
        Discipline::create([
            'tournament_id' => 1,
            'sport_id' => 1, // Futbol Sala
            'category' => 'masculina',
            'game_mode' => 'en grupo',
            'state' => 'abierto',
            'max_inscrits' => 16,
            'formato' => 'grupos'
        ]); 

        Discipline::create([
            'tournament_id' => 1,
            'sport_id' => 2, // Basquet
            'category' => 'femenina',
            'game_mode' => 'en grupo',
            'state' => 'abierto',
            'max_inscrits' => 12,
            'formato' => 'eliminatoria'
        ]);

        Discipline::create([
            'tournament_id' => 1,
            'sport_id' => 4, // Tenis de Mesa
            'category' => 'mixta',
            'game_mode' => 'individual',
            'state' => 'cerrado', // Ejemplo cerrado
            'max_inscrits' => 32,
            'formato' => 'liga'
        ]); 

        // Disciplina para Copa Aniversario 
        Discipline::create([
            'tournament_id' => 2,
            'sport_id' => 3, // Voleibol
            'category' => 'mixta',
            'game_mode' => 'en grupo',
            'state' => 'proximo', // Aún no abierto
            'max_inscrits' => 24,
            'formato' => 'liga'
        ]); 
    }
}

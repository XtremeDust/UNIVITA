<?php

namespace Database\Seeders;

use App\Models\Game;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Game::create([
            'entry_id_team_a' => 1,
            'score_a' => null,
            'entry_id_team_b' => 2,
            'score_b' => null,
            'discipline_id' => 1,
            'state' => 'pendiente',
            'date_matches' => now()->addMonth()->addDays(2)->setHour(18)->setMinutes(0)->setSeconds(0),
            'ronda' => 1,
            'next_match_id' => null, // Suponiendo que no hay siguiente definido aún
        ]);

        Game::create([
            'entry_id_team_a' => 4,
            'score_a' => 2, 
            'entry_id_team_b' => 5,
            'score_b' => 1,
            'discipline_id' => 3,
            'state' => 'finalizado',
            'date_matches' => now()->addMonth()->addDays(3)->setHour(10)->setMinutes(0)->setSeconds(0),
            'ronda' => 1,
            'next_match_id' => null,
        ]); 

         Game::create([
            'entry_id_team_a' => 6,
            'score_a' => null,
            'entry_id_team_b' => null,
            'score_b' => null,
            'discipline_id' => 3,
            'state' => 'pendiente',
            'date_matches' => now()->addMonth()->addDays(4)->setHour(11)->setMinutes(0)->setSeconds(0),
            'ronda' => 2,
            'next_match_id' => null,
        ]); 
    }
}

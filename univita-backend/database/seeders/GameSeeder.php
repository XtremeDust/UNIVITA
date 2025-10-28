<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Game;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Game::create([
            'event_id' => 1,
            'entryId_team_a' => 1,
            'score_a' => 0,
            'entryId_team_b' => 2,
            'score_b' => 0,
            'state' => 'pendiente',
            'date_games' => now()->addMonths(1)->addDays(1),
            'ronda' => 1,
        ]);

        // Partido de Tenis de Mesa
        Game::create([
            'event_id' => 1,
            'entryId_team_a' => 3,
            'score_a' => 0,
            'entryId_team_b' => 4,
            'score_b' => 0,
            'state' => 'pendiente',
            'date_games' => now()->addMonths(1)->addDays(2),
            'ronda' => 1,
        ]);
    }
}

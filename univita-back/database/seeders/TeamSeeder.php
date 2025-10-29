<?php

namespace Database\Seeders;

use App\Models\Team;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $team1 = Team::create([
            'team_name' => 'Las Innombrables',
            'logo' => 'logo_innombrables.png',
            'color' => '#FF0000',
            'captain_id' => 6 // Moises Gomez
        ]);
        $team1->users()->attach([6, 7]); // Moises y Jorge

        // ID: 2
        $team2 = Team::create([
            'team_name' => 'Los que la meten?',
            'logo' => 'logo_qla.png',
            'color' => '#00FF00',
            'captain_id' => 8 // Samuel Marcano
        ]);
        $team2->users()->attach([8, 9]); // Samuel y Angel

        // ID: 3
        $team3 = Team::create([
            'team_name' => 'Los Bombasticos',
            'logo' => 'logo_bombas.png',
            'color' => '#0000FF',
            'captain_id' => 10 // Abdl Taktak
        ]);
        $team3->users()->attach([10, 11]); // Abdl y Daniel

        // Identidades Individuales

        $t4 = Team::create(['team_name' => 'Walas (Individual)', 'logo' => 'logo_walas.png', 'color' => '#FFFFFF', 'captain_id' => 1]);
        $t4->users()->attach(1);

        $t5 = Team::create(['team_name' => 'Wilmarys Brizuela (Individual)', 'logo' => 'logo_wb.png', 'color' => '#F0F0F0', 'captain_id' => 2]);
        $t5->users()->attach(2);

        $t6 = Team::create(['team_name' => 'Carlos Alas (Individual)', 'logo' => 'logo_calas.png', 'color' => '#E0E0E0', 'captain_id' => 3]);
        $t6->users()->attach(3);

        $t7 = Team::create(['team_name' => 'Flavio Rosales (Individual)', 'logo' => 'logo_frosales.png', 'color' => '#D0D0D0', 'captain_id' => 4]);
        $t7->users()->attach(4);

        $t8 = Team::create(['team_name' => 'Yemnel Torcal (Individual)', 'logo' => 'logo_ytorcal.png', 'color' => '#C0C0C0', 'captain_id' => 5]);
        $t8->users()->attach(5);
    }
}

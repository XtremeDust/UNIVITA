<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Team;
use App\Models\User;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Equipos Grupales (ID del User = ID del Capitán)
        // IDs de usuario: Moises (6), Jorge (7), Samuel (8), Angel (9), Abdl (10), Daniel (11)
        
        $team1 = Team::create(['team_name' => 'Las Innombrables', 'logo' => 'logo_innombrables.png', 'color' => '#FF0000', 'captain_id' => 6]);
        $team1->users()->attach(7); // Jorge
        $team1->users()->attach(6);

        
        $team2 = Team::create(['team_name' => 'Los que la meten?', 'logo' => 'logo_qla.png', 'color' => '#00FF00', 'captain_id' => 8]);
        $team2->users()->attach(9); // Angel
        $team2->users()->attach(8);
        
        $team3 = Team::create(['team_name' => 'Los Bombasticos', 'logo' => 'logo_bombas.png', 'color' => '#0000FF', 'captain_id' => 10]);
        $team3->users()->attach(11); // Añadimos a Daniel Alarcon
        $team3->users()->attach(10);
        
        
        $team4 = Team::create(['team_name' => 'Williams Alas (Ind)', 'logo' => 'logo_walas.png', 'color' => '#FFFFFF', 'captain_id' => 1]);
        $team4->users()->attach(1);
        
        $team5=Team::create(['team_name' => 'Wilmarys Brizuela (Ind)', 'logo' => 'logo_wb.png', 'color' => '#FFFFFF', 'captain_id' => 2]);
        $team5->users()->attach(2);
        
        $team6=Team::create(['team_name' => 'Carlos Alas (Ind)', 'logo' => 'logo_calas.png', 'color' => '#FFFFFF', 'captain_id' => 3]);
        $team6->users()->attach(3);
        
        $team7=Team::create(['team_name' => 'Flavio Rosales (Ind)', 'logo' => 'logo_frosales.png', 'color' => '#FFFFFF', 'captain_id' => 4]);
        $team7->users()->attach(4);
        
        $team8=Team::create(['team_name' => 'Yemnel Torcal (Ind)', 'logo' => 'logo_ytorcal.png', 'color' => '#FFFFFF', 'captain_id' => 5]);
        $team8->users()->attach(5);
    }
}

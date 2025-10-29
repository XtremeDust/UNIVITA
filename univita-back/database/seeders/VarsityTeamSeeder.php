<?php

namespace Database\Seeders;

use App\Models\VarsityTeam;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VarsityTeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Selección Futsal Masculino (Sport ID 1), Coach Walas (User ID 1)
        VarsityTeam::create([
            'sport_id' => 1,
            'category' => 'masculina',
            'coach_user_id' => 1,
        ]); 

        // Selección Voleibol Femenino (Sport ID 3), Coach Carlos (User ID 3)
        VarsityTeam::create([
            'sport_id' => 3,
            'category' => 'femenina',
            'coach_user_id' => 3,
        ]); 

         // Selección Basquet Masculino (Sport ID 2), Coach Walas (User ID 1)
        VarsityTeam::create([
            'sport_id' => 2,
            'category' => 'masculina',
            'coach_user_id' => 1,
        ]); 
    }
}

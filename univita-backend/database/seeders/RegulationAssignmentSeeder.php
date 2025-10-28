<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\EventRegulation;
use App\Models\SportRegulation;
use App\Models\DisciplineRegulation;

class RegulationAssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EventRegulation::create(['event_id' => 1, 'regulation_id' => 1]);
        
        SportRegulation::create(['sport_id' => 1, 'regulation_id' => 2]);
        
        DisciplineRegulation::create(['discipline_id' => 3, 'regulation_id' => 3]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\DisciplineEntry;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DisciplineEntrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DisciplineEntry::create([
            'discipline_id' => 1,
            'team_id' => 1,
            'state' => 'Aceptado'
        ]); 
        
        DisciplineEntry::create([
            'discipline_id' => 1,
            'team_id' => 3,
            'state' => 'Pendiente'
        ]);
        DisciplineEntry::create([
            'discipline_id' => 1,
            'team_id' => 2,
            'state' => 'Rechazado' 
        ]); 

        DisciplineEntry::create([
             'discipline_id' => 3,
             'user_id' => 1,
             'state' => 'Aceptado'
        ]);

        DisciplineEntry::create([
             'discipline_id' => 3,
             'user_id' => 4,
             'state' => 'Pendiente'
        ]); 

        DisciplineEntry::create([
             'discipline_id' => 3,
             'user_id' => 5,
             'state' => 'Pendiente'
        ]);
    }
}

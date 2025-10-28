<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Activity;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Activity::create([
            'event_id' => 1,
            'name' => 'Concierto de Apertura',
            'state' => 'abierto',
            'date' => now()->addMonths(1),
        ]);

        Activity::create([
            'event_id' => 1,
            'name' => 'Feria Gastronómica',
            'state' => 'cerrado',
            'date' => now()->addMonths(1)->addDays(3),
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Event;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            'Copa Unimar Diciembre 2025',
            'Copa Unimar Primavera 2025',
            'Copa Unimar Aniversario 2025',
            'Copa Unimar Interdisciplinaria 2024',
        ];

        foreach ($events as $eventName) {
            Event::create([
                'created_by_user' => 1, // ID del Admin
                'name' => $eventName,
                'description' => 'Descripción de prueba para ' . $eventName,
                'type' => 'deportivo',
                'state' => 'proximo',
                'img' => 'default_event_image.jpg', 
                'formato' => 'grupos',
                'init_date' => now()->addMonths(1), 
                'end_date' => now()->addMonths(1)->addDays(7), 
            ]);
        }
    }
}

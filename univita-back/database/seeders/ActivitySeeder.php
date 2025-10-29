<?php

namespace Database\Seeders;

use App\Models\Activity;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Activity::create([
            'created_by_user' => 1, // Admin
            'title' => 'Concierto Inaugural Juegos 2025',
            'body' => 'Presentación de bandas locales en la cancha techada para dar inicio a los Juegos Internos.',
            'img' => '/images/activities/concierto_inaugural.jpg',
            'type' => 'cultural',
            'state' => 'proximo',
            'activity_date' => now()->addMonth()->subDay(),
            'location' => 'Cancha Techada UNIMAR',
        ]); 

        Activity::create([
            'created_by_user' => 1, // Admin
            'title' => 'Charla: Nutrición para Atletas',
            'body' => 'Consejos prácticos sobre alimentación deportiva dictada por expertos.',
            'img' => '/images/activities/charla_nutricion.jpg',
            'type' => 'general',
            'state' => 'proximo',
            'activity_date' => now()->addMonth()->addDays(5),
            'location' => 'Auditorio Principal',
        ]); 

        Activity::create([
            'created_by_user' => 1, // Admin
            'title' => 'Exposición Fotográfica Aniversario',
            'body' => 'Recorrido visual por la historia de la universidad.',
            'img' => '/images/activities/expo_aniversario.jpg',
            'type' => 'cultural',
            'state' => 'finalizado',
            'activity_date' => now()->subMonths(2),
            'location' => 'Sala de Exposiciones',
        ]); 
    }
}

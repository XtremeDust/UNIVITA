<?php

namespace Database\Seeders;

use App\Models\Regulation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RegulationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Regulation::create([
            'created_by_user' => 1, 
            'title' => 'Reglamento General Torneos UNIMAR 2025',
            'file_url' => '/storage/regulations/general_torneos_2025.pdf', // Ruta de ejemplo
            'scope' => 'general_evento',
            'published' => now()->subDays(10)->toDateString()
        ]); 

        Regulation::create([
            'created_by_user' => 1,
            'title' => 'Reglamento Específico Futbol Sala',
            'file_url' => '/storage/regulations/especifico_futsal.pdf',
            'scope' => 'deporte_base',
            'published' => now()->subDays(5)->toDateString()
        ]); 

         Regulation::create([
            'created_by_user' => 1,
            'title' => 'Normativa Actividades Culturales Campus',
            'file_url' => '/storage/regulations/normativa_cultural.pdf',
            'scope' => 'actividad_cultural',
            'published' => now()->subDays(2)->toDateString()
        ]); 

         Regulation::create([
            'created_by_user' => 1,
            'title' => 'Reglas Tenis de Mesa Individual Mixto',
            'file_url' => '/storage/regulations/tenis_mesa_mixto.pdf',
            'scope' => 'disciplina_especifica',
            'published' => now()->subDay()->toDateString()
        ]); 
    }
}

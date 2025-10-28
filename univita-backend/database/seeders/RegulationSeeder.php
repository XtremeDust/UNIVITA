<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Regulation;

class RegulationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Regulation::create([
            'created_by_user' => 1, // Admin
            'title' => 'Reglamento General de Eventos UNIMAR',
            'file_url' => 'http://example.com/reglamento_general.pdf',
            'scope' => 'general_evento',
            'published' => now()->toDateString()
        ]);

        Regulation::create([
            'created_by_user' => 1, // Admin
            'title' => 'Reglamento Específico de Futbol Sala',
            'file_url' => 'http://example.com/reglamento_futsal.pdf',
            'scope' => 'deporte_base',
            'published' => now()->toDateString()
        ]);

        Regulation::create([
            'created_by_user' => 1, // Admin
            'title' => 'Reglamento Tenis de Mesa Mixto',
            'file_url' => 'http://example.com/reglamento_tenis_mixto.pdf',
            'scope' => 'disciplina_especifica',
            'published' => now()->toDateString()
        ]);
    }
}

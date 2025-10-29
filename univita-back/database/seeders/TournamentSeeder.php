<?php

namespace Database\Seeders;

use App\Models\Tournament;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TournamentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tournament::create([
            'created_by_user' => 1, 
            'name' => 'Juegos Internos UNIMAR 2025',
            'descrip' => 'La competencia deportiva anual de la universidad.',
            'state' => 'proximo',
            'img' => '/images/juegos_internos_banner.jpg', // Ruta de ejemplo
            'init_date' => now()->addMonth(),
            'end_date' => now()->addMonth()->addDays(14),
        ]); 

        Tournament::create([
            'created_by_user' => 1,
            'name' => 'Copa Aniversario UNIMAR 2025',
            'descrip' => 'Torneo especial por el aniversario.',
            'state' => 'proximo',
            'img' => '/images/copa_aniversario_banner.jpg',
            'init_date' => now()->addMonths(3),
            'end_date' => now()->addMonths(3)->addDays(7),
        ]);
    }
}

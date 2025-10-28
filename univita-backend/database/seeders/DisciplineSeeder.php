<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Discipline;

class DisciplineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        // Sport IDs: Futbol Sala (1), Basquet (2), Tenis de Mesa (5)
        //hacer mas deportes por categoria // opcional hacer una tabla categorias_deport
        //y categoria para evitar repetir el nombre del mismo deporte y categoria pero igual 
        //en el front se veria el mismo deporte 3 veces suponiendo q tiene las tres categorias

        Discipline::create([
            'event_id' => 1,
            'sport_id' => 1, 
            'category' => 'masculina',
            'game_mode' => 'en grupo',
            'state' => 'abierto',
            'max_inscrits' => 16
        ]);

        // ID: 2
        Discipline::create([
            'event_id' => 1,
            'sport_id' => 2, 
            'category' => 'femenina',
            'game_mode' => 'en grupo',
            'state' => 'abierto',
            'max_inscrits' => 12
        ]);

        // ID: 3
        Discipline::create([
            'event_id' => 1,
            'sport_id' => 5, 
            'category' => 'mixta',
            'game_mode' => 'individual',
            'state' => 'abierto',
            'max_inscrits' => 32
        ]);

        // ID: 4
        Discipline::create([
            'event_id' => 1,
            'sport_id' => 7, 
            'category' => 'mixta',
            'game_mode' => 'individual',
            'state' => 'abierto',
            'max_inscrits' => 32
        ]);
    }
}

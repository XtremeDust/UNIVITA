<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Sport;

class SportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sports = [
            ['title' => 'Futbol Sala', 'mode' => 'equipo'],
            ['title' => 'Basquet', 'mode' => 'equipo'],
            ['title' => 'Voleibol', 'mode' => 'equipo'],
            ['title' => 'Beisbol 5', 'mode' => 'equipo'],
            ['title' => 'Tenis de Mesa', 'mode' => 'individual'],
            ['title' => 'Kickingball', 'mode' => 'equipo'],
            ['title' => 'Karate-Do', 'mode' => 'individual'],
            ['title' => 'Softball', 'mode' => 'equipo'],
            ['title' => 'Pickleball', 'mode' => 'duplas'],
        ];

        foreach ($sports as $sport) {
            Sport::create([
                'created_by_user' => 1, // ID del Admin (que es 1)
                'title' => $sport['title'],
                'descrip' => 'Descripción de prueba para ' . $sport['title'],
                'mode' => $sport['mode'], // De tu lista
                'benef' => 'Beneficios de prueba',
                'levels' => 'Niveles de prueba',
                'equip' => 'Equipamiento de prueba',
            ]);
        }

    }
}

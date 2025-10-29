<?php

namespace Database\Seeders;

use App\Models\Sport;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

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
            ['title' => 'Tenis de Mesa', 'mode' => 'individual'], 
            ['title' => 'Beisbol 5', 'mode' => 'equipo'],       
            ['title' => 'Kickingball', 'mode' => 'equipo'],    
            ['title' => 'Karate-Do', 'mode' => 'individual'],  
            ['title' => 'Softball', 'mode' => 'equipo'],        
            ['title' => 'Pickleball', 'mode' => 'duplas'],      
        ];

        foreach ($sports as $sport) {
            Sport::create([
                'created_by_user' => 1, 
                'title' => $sport['title'],
                'descrip' => 'Descripción de prueba para ' . $sport['title'] . '.',
                'mode' => $sport['mode'],
            ]);
        }
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Post::create([
            'title' => '¡Inscripciones Abiertas!',
            'body' => 'Ya están abiertas las inscripciones para la Copa Unimar Diciembre 2025...',
            'user_id' => 1, // Admin
            'status' => 'publico',
        ]);

        Post::create([
            'title' => 'Nuevos Deportes Confirmados',
            'body' => 'Se confirman Karate-Do y Pickleball para el próximo evento...',
            'user_id' => 1, // Admin
            'status' => 'privado', // Borrador
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Post::create([
            'title' => 'Abiertas Inscripciones Juegos Internos 2025',
            'body' => 'Ya puedes inscribir a tu equipo o registrarte individualmente para los Juegos Internos UNIMAR 2025. ¡No te quedes fuera!',
            'user_id' => 1, 
            'status' => 'publico',
        ]);

        Post::create([
            'title' => 'Próximamente: Festival de Cine Universitario',
            'body' => 'Se está organizando un festival de cine para el próximo semestre. Más detalles pronto.',
            'user_id' => 1, 
            'status' => 'privado', 
        ]);
    }
}

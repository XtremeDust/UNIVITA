<?php

namespace Database\Seeders;

use App\Models\AcademicOffering;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AcademicOfferingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AcademicOffering::create([
            'sport_id' => 3,
            'coach_user_id' => 3,
            'semester' => '2025-2',
            'state' => 'abierto',
            'max_students' => 25,
        ]); 

         AcademicOffering::create([
            'sport_id' => 2,
            'coach_user_id' => 1,
            'semester' => '2025-2',
            'state' => 'cerrado',
            'max_students' => 20,
        ]); 

         AcademicOffering::create([
            'sport_id' => 1,
            'coach_user_id' => 1,
            'semester' => '2025-1',
            'state' => 'cerrado',
            'max_students' => 30,
        ]);
    }
}

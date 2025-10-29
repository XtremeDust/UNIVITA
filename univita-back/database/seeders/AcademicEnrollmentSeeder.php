<?php

namespace Database\Seeders;

use App\Models\AcademicEnrollment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AcademicEnrollmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // (User ID 2) inscrita en Voleibol (Offering ID 1)
        AcademicEnrollment::create([
            'offering_id' => 1,
            'student_user_id' => 2,
            'state' => 'inscrito',
        ]);

        // (User ID 4) aprobó Voleibol (Offering ID 1)
        AcademicEnrollment::create([
            'offering_id' => 1,
            'student_user_id' => 4,
            'state' => 'aprobado',
        ]);

        // (User ID 5) se retiró de Basquet (Offering ID 2)
        AcademicEnrollment::create([
            'offering_id' => 2,
            'student_user_id' => 5,
            'state' => 'retirado',
        ]);

         // (User ID 3) reprobó Futbol Sala (Offering ID 3)
        AcademicEnrollment::create([
            'offering_id' => 3,
            'student_user_id' => 3,
            'state' => 'reprobado',
        ]);
    }
}

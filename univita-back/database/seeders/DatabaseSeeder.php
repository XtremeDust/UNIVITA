<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       $this->call([
            
            UserSeeder::class,
            SportSeeder::class,     
            RegulationSeeder::class, 
         
            TeamSeeder::class,      
            TournamentSeeder::class,
            ActivitySeeder::class,
            PostSeeder::class,    
            UserSubscriptionSeeder::class,
            AcademicOfferingSeeder::class,
            VarsityTeamSeeder::class,
       
            DisciplineSeeder::class, 
            AcademicEnrollmentSeeder::class, 
            VarsityTeamMemberSeeder::class,
     
            DisciplineEntrySeeder::class,

            GameSeeder::class, 

            RegulationAssignmentSeeder::class,
        ]);
    }
}

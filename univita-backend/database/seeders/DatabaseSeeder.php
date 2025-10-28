<?php

namespace Database\Seeders;

use App\Models\EventSubscription;
use App\Models\Post;
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
        // User::factory(10)->create();

        /*
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        */

        $this->call([
            UserSeeder::class,
            SportSeeder::class,
            EventSeeder::class,
            TeamSeeder::class,      
            DisciplineSeeder::class, 
            TournamentEntrySeeder::class,
            ActivitySeeder::class,
            EventSubscriptionSeeder::class,
            GameSeeder::class,
            RegulationSeeder::class,
            RegulationAssignmentSeeder::class,
            PostSeeder::class,
        ]);

    }
}

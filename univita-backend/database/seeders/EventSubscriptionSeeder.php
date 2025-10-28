<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\EventSubscription;

class EventSubscriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EventSubscription::create(['user_id' => 2]);
        EventSubscription::create(['user_id' => 3]);
        EventSubscription::create(['user_id' => 4]);
    }
}

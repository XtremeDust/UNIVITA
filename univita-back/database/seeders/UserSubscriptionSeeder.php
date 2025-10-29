<?php

namespace Database\Seeders;

use App\Models\UserSubscription;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSubscriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserSubscription::create(['user_id' => 2]);
        UserSubscription::create(['user_id' => 3]);
        UserSubscription::create(['user_id' => 4]);
    }
}

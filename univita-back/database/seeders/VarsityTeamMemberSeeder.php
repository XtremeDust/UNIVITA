<?php

namespace Database\Seeders;

use App\Models\VarsityTeamMember;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VarsityTeamMemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        VarsityTeamMember::create(['user_id' => 4, 'varsity_team_id' => 1, 'season' => '2025']);
        VarsityTeamMember::create(['user_id' => 5, 'varsity_team_id' => 1, 'season' => '2025']);

        
        VarsityTeamMember::create(['user_id' => 2, 'varsity_team_id' => 2, 'season' => '2025']);

        
        VarsityTeamMember::create(['user_id' => 3, 'varsity_team_id' => 3, 'season' => '2025']);
    }
}

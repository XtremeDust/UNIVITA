<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TournamentEntry;

class TournamentEntrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Inscribir equipos de Futbol Sala (Discipline ID 1)
        
        TournamentEntry::create(['team_id' => 2, 'discipline_id' => 1, 'state' => 'Aceptado']);
        TournamentEntry::create(['team_id' => 3, 'discipline_id' => 1, 'state' => 'Aceptado']);
        TournamentEntry::create(['team_id' => 1, 'discipline_id' => 1, 'state' => 'Rechazado']);

        // Inscribir individuales en Tenis de Mesa (Discipline ID 3)
        
        TournamentEntry::create(['team_id' => 4, 'discipline_id' => 3, 'state' => 'Aceptado']);
        TournamentEntry::create(['team_id' => 7, 'discipline_id' => 3, 'state' => 'Pendiente']);
        TournamentEntry::create(['team_id' => 8, 'discipline_id' => 3, 'state' => 'Pendiente']);

        //baloncesto
        TournamentEntry::create(['team_id' => 3, 'discipline_id' => 2, 'state' => 'Aceptado']);
        TournamentEntry::create(['team_id' => 1, 'discipline_id' => 2, 'state' => 'Rechazado']);

        TournamentEntry::create(['team_id' => 5, 'discipline_id' => 4, 'state' => 'Aceptado']);
        TournamentEntry::create(['team_id' => 6, 'discipline_id' => 4, 'state' => 'Rechazado']);


    }
}

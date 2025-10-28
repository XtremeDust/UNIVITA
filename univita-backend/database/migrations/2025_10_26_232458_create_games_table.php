<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained('events')->onDelete('cascade');
            $table->foreignId('entryId_team_a')->constrained('tournament_entries')->onDelete('cascade');
            $table->foreignId('entryId_team_b')->constrained('tournament_entries')->onDelete('cascade');
            $table->integer('score_a')->nullable();
            $table->integer('score_b')->nullable();
            $table->enum('state', ['en partido', 'finalizado', 'pendiente', 'cancelado'])->default('pendiente');
            $table->date('date_games');
            $table->integer('ronda')->nullable();
            $table->foreignId('next_match_id')->nullable()->constrained('games');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};

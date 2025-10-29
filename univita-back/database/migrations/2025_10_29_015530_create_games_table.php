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
       
            $table->foreignId('entry_id_team_a')->nullable()->constrained('discipline_entries')->onDelete('cascade');
            $table->integer('score_a')->nullable();
            $table->foreignId('entry_id_team_b')->nullable()->constrained('discipline_entries')->onDelete('cascade');
            $table->integer('score_b')->nullable();
       
            $table->foreignId('discipline_id')->constrained('disciplines')->onDelete('cascade');
            $table->enum('state', ['en partido', 'finalizado', 'pendiente', 'cancelado'])->default('pendiente');
            $table->dateTime('date_matches')->nullable();
            $table->integer('ronda')->nullable();
       
            $table->foreignId('next_match_id')->nullable()->constrained('games')->onDelete('set null');
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

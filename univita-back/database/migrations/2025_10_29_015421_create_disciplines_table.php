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
        Schema::create('disciplines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tournament_id')->constrained('tournaments')->onDelete('cascade');
            $table->foreignId('sport_id')->constrained('sports');
            $table->enum('category', ['masculina', 'mixta', 'femenina']);
            $table->enum('game_mode', ['en grupo', 'individual', 'duplas']);
            $table->enum('state', ['abierto', 'cerrado', 'proximo', 'en juego', 'finalizado'])->default('cerrado');
            $table->unsignedInteger('max_inscrits')->nullable();
            $table->enum('formato', ['liga', 'eliminatoria', 'grupos'])->nullable();
            $table->timestamps(); // Adds created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('disciplines');
    }
};

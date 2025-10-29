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
        Schema::create('varsity_teams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sport_id')->constrained('sports');
            $table->enum('category', ['masculina', 'mixta', 'femenina']);
            $table->foreignId('coach_user_id')->constrained('users');
            $table->timestamps();

           
            $table->unique(['sport_id', 'category']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('varsity_teams');
    }
};

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
        Schema::create('academic_offerings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sport_id')->constrained('sports');
            $table->foreignId('coach_user_id')->constrained('users');
            $table->string('semester'); // e.g., "2025-1"
            $table->enum('state', ['abierto', 'cerrado', 'lleno'])->default('cerrado');
            $table->unsignedInteger('max_students')->nullable();
            $table->timestamps(); // Adds created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('academic_offerings');
    }
};

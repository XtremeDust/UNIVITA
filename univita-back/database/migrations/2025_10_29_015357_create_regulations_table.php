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
        Schema::create('regulations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('created_by_user')->constrained('users');
            $table->string('title');
            $table->string('file_url');
            $table->enum('scope', ['general_evento', 'deporte_base', 'disciplina_especifica', 'actividad_cultural']);
            $table->date('published')->nullable();
            $table->timestamps(); // Adds created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('regulations');
    }
};

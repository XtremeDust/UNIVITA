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
        Schema::create('tournaments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('created_by_user')->constrained('users');
            $table->string('name');
            $table->text('descrip')->nullable();
            $table->enum('state', ['proximo', 'finalizado', 'activo'])->default('proximo');
            $table->string('img')->nullable();
            $table->date('init_date');
            $table->date('end_date');
            $table->timestamps(); // Adds created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tournaments');
    }
};

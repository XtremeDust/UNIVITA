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
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('created_by_user')->constrained('users');
            $table->string('title');
            $table->text('body')->nullable();
            $table->string('img')->nullable();
            $table->enum('type', ['cultural', 'general']);
            $table->enum('state', ['proximo', 'finalizado', 'activo'])->default('proximo');
            $table->date('activity_date');
            $table->string('location')->nullable();
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};

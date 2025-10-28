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
        Schema::create('sports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('created_by_user')->constrained('users')->onDelete('cascade');
            $table->string('title');
            $table->string('descrip');
            $table->enum('mode', ['equipo', 'duplas', 'individual']);
            $table->string('benef');
            $table->string('levels');
            $table->string('equip');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sports');
    }
};

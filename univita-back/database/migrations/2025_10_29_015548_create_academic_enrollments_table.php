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
        Schema::create('academic_enrollments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('offering_id')->constrained('academic_offerings')->onDelete('cascade');
            $table->foreignId('student_user_id')->constrained('users')->onDelete('cascade');
            $table->enum('state', ['inscrito', 'retirado', 'aprobado', 'reprobado'])->default('inscrito');
            $table->timestamps(); 

           
            $table->unique(['offering_id', 'student_user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('academic_enrollments');
    }
};

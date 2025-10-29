<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AcademicEnrollmentResource;
use App\Http\Resources\UserResource;
use App\Models\AcademicEnrollment;
use App\Models\AcademicOffering;
use Illuminate\Http\Request;

class AcademicEnrollmentController extends Controller
{
    
    public function index(){
        $enrollments = AcademicEnrollment::with(['student', 'offering.sport'])->get(); 
        return AcademicEnrollmentResource::collection($enrollments);
    }
    
    /**
     * Listar los estudiantes inscritos en UNA oferta académica específica.
     */
    public function indexForOffering(AcademicOffering $offering){
        // Cargamos las inscripciones de ESTA oferta, incluyendo el estudiante
        $enrollments = $offering->enrollments()->with('student')->get();

        // Extraemos solo los objetos User (estudiantes)
        $students = $enrollments->pluck('student')->filter();

        // Devolvemos la lista de estudiantes formateada
        return UserResource::collection($students);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(AcademicEnrollment $academicEnrollment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AcademicEnrollment $academicEnrollment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AcademicEnrollment $academicEnrollment)
    {
        //
    }
}

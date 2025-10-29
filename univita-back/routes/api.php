<?php

use App\Http\Controllers\Api\AcademicEnrollmentController;
use App\Http\Controllers\Api\DisciplineEntryController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\TeamController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\SubscriptionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/users', [UserController::class, 'index']);
Route::get('/user/{user}',[UserController::class, 'show']);

Route::get('/teams', [TeamController::class, 'index']);
Route::get('/teams-inscription', [DisciplineEntryController::class, 'index']);

Route::get('/subscribed-users', [SubscriptionController::class, 'index']);

Route::get('/academic-offerings', [AcademicEnrollmentController::class, 'index']);
Route::get('/academic-offerings/{offering}/enrollments', [AcademicEnrollmentController::class, 'indexForOffering']);

Route::apiResource('/posts', PostController::class);

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\TeamController;
use App\Http\Controllers\Api\TournamentEntryController;
use App\Http\Controllers\Api\EventsSubscriptionController;
use App\Http\Controllers\Api\RegulationController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/users', [UserController::class, 'index']);
Route::get('/posts', [PostController::class, 'index']);
Route::get('/teams', [TeamController::class, 'index']);
Route::get('/inscripciones', [TournamentEntryController::class, 'index']);
Route::get('/subscription', [EventsSubscriptionController::class, 'index']);
Route::get('/regulations', [RegulationController::class, 'index']);

<?php

use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/addtask',[TaskController::class, 'store']);
Route::get('/gettasks',[TaskController::class, 'index']);
Route::delete('deletetask/{id}', [TaskController::class, 'destroy']);
Route::put('updatetaskstatus/{id}', [TaskController::class, 'updateStatus']);
Route::get('gettask/{id}', [TaskController::class, 'show']);



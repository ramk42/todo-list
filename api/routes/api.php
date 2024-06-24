<?php

use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/addtask',[TaskController::class, 'store']);
Route::get('/gettasks',[TaskController::class, 'index']);

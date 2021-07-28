<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home')
    ->with('app_folder',env('APP_FOLDER'));
});

Route::get('home','HomeController@home');
Route::get('home/fetchUtenti','HomeController@fetchUtenti');
Route::get('vetrina/{username}','VetrinaController@vetrina');
Route::get('vetrina/fetchLayouts/{username}','VetrinaController@fetchLayouts');
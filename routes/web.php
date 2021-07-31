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

Route::get('/','HomeController@home');
Route::get('login', 'LoginController@login');
Route::post('login', 'LoginController@checkLogin');
Route::post('login/check', 'LoginController@checkLoginJS');
Route::get('logout', 'LoginController@logout');
Route::get('home','HomeController@home');
Route::get('home/fetchLayouts','HomeController@fetchLayouts');
Route::get('newLayout','NewLayoutController@newLayout');
Route::post('newLayout/saveLayout','NewLayoutController@saveLayout');
Route::get('layout/{username}/{layoutID}', 'LayoutController@layout');
Route::get('layout/loadLayout/{username}/{layoutID}', 'LayoutController@loadLayout');
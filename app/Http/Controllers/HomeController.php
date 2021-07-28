<?php

use Illuminate\Routing\Controller as BaseController;

class HomeController extends BaseController
{
    public function home(){
        return view('home')
        ->with('app_folder',env('APP_FOLDER'));
    }

    public function fetchUtenti(){
        $utenti=User::all();
        return $utenti;
    }
}

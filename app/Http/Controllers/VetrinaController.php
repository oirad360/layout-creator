<?php

use Illuminate\Routing\Controller as BaseController;

class VetrinaController extends BaseController
{
    public function vetrina($username){
        return view('vetrina')
        ->with('username',$username)
        ->with('app_folder',env('APP_FOLDER'));
    }

    public function fetchLayouts($username){
        $layouts=User::where('username',$username)->first()->layouts;
        return $layouts;
    }
}

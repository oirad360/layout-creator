<?php

use Illuminate\Routing\Controller as BaseController;

class NewLayoutController extends BaseController
{
    public function newLayout(){
        if(session('id')===null){
            return redirect('login');
        }
        return view('newLayout')
        ->with('app_folder',env('APP_FOLDER'))
        ->with('csrf_token', csrf_token());
    }
    public function saveLayout(){
        
    }
}

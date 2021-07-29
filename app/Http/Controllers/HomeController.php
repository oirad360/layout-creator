<?php

use Illuminate\Routing\Controller as BaseController;

class HomeController extends BaseController
{
    public function home(){
        if(session('id')===null){
            return redirect('login');
        }
        $user=User::find(session('id'));
        return view('home')
        ->with('app_folder',env('APP_FOLDER'))
        ->with('username',$user->username)
        ->with('csrf_token', csrf_token());
    }

    public function fetchLayouts(){
        $layouts=User::find(session('id'))->layouts;
        return $layouts;
    }
}

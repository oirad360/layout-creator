<?php

use Illuminate\Routing\Controller as BaseController;

class HomeController extends BaseController
{
    public function home(){
        if(session('id')===null){
            return view('home')
            ->with('app_folder',env('APP_FOLDER'))
            ->with('status',"login");
        } else {
            $username=User::find(session('id'))->username;
            return view('home')
            ->with('app_folder',env('APP_FOLDER'))
            ->with('status',"logout")
            ->with('username',$username);
        }
    }

    public function fetchLayouts(){
        $users=User::all();
        foreach($users as $user){
            $layouts=$user->layouts;
            foreach($layouts as $layout){
                $result[$user->username][]=$layout->id;
            }
        }
        return $result;
    }
}

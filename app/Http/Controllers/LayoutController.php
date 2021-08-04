<?php

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

class LayoutController extends BaseController
{
    public function layout($layoutID){
        $username=Layout::find($layoutID)->user->username;
        if(session('id')===null){
            return view('layout')
            ->with('app_folder',env('APP_FOLDER'))
            ->with('username',$username)
            ->with('layoutID', $layoutID);
        } else if($username===User::find(session('id'))->username){
            return view('layout')
            ->with('app_folder',env('APP_FOLDER'))
            ->with('username',$username)
            ->with('layoutID', $layoutID)
            ->with('modify', true);
        } else {
            return view('layout')
            ->with('app_folder',env('APP_FOLDER'))
            ->with('username',$username)
            ->with('layoutID', $layoutID);
        }
    }

    public function loadLayout($layoutID){
        $layout=Layout::find($layoutID);
        $childs=$layout->childs;
        return $layout;
    }
}

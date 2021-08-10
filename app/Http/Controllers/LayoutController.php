<?php

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

class LayoutController extends BaseController
{
    public function layout($layoutID){
        $username=Layout::find($layoutID)->user->username;
        if(session('id')===null || $username!==User::find(session('id'))->username){
            return view('layout')
            ->with('app_folder',env('APP_FOLDER'))
            ->with('username',$username)
            ->with('layoutID', $layoutID)
            ->with('csrf_token', csrf_token());
        } else {
            return view('layout')
            ->with('app_folder',env('APP_FOLDER'))
            ->with('username',$username)
            ->with('layoutID', $layoutID)
            ->with('modify', true)
            ->with('csrf_token', csrf_token());
        }
    }

    public function loadLayout($layoutID){
        $layout=Layout::find($layoutID);
        $childs=$layout->childs;
        return $layout;
    }
}

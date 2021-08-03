<?php

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

class LayoutController extends BaseController
{
    public function layout($username, $layoutID){
        return view('layout')
        ->with('app_folder',env('APP_FOLDER'))
        ->with('username',$username)
        ->with('layoutID', $layoutID);
    }

    public function loadLayout($layoutID){
        $layout=Layout::find($layoutID);
        $childs=$layout->childs;
        return $layout;
    }
}

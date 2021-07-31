<?php

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

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

    public function saveLayout(Request $request){
        $newLayout = new Layout;
        $newLayout->user_id=session('id');
        $newLayout->display=$request["layout"]["display"];
        $newLayout->flexDirection=$request["layout"]["flexDirection"];
        $newLayout->flexWrap=$request["layout"]["flexWrap"];
        $newLayout->height=$request["layout"]["height"];
        $newLayout->width=$request["layout"]["width"];
        $newLayout->save();
        $layout_id=$newLayout->id;
        foreach($request["childs"] as $child){
            $newChild = new Child;
            $newChild->layout_id=$layout_id;
            $newChild->data_gen=$child["gen"];
            $newChild->data_id=$child["id"];
            $newChild->data_parent_gen=$child["parent_gen"];
            $newChild->data_parent_id=$child["parent_id"];
            $newChild->display=$child["display"];
            $newChild->flexDirection=$child["flexDirection"];
            $newChild->flexWrap=$child["flexWrap"];
            $newChild->height=$child["height"];
            $newChild->width=$child["width"];
            $newChild->margin=$child["margin"];
            $newChild->save();
        }
        return true;
    }
}

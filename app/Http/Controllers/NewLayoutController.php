<?php

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

class NewLayoutController extends BaseController
{
    public function newLayout($layoutID){
        if($layoutID!=="new" && (session('id')===null || Layout::find($layoutID)->user->id!==session('id'))){
            redirect('layout/'.$layoutID);
        } else {
            return view('newLayout')
            ->with('layoutID',$layoutID)
            ->with('app_folder',env('APP_FOLDER'))
            ->with('csrf_token', csrf_token());
        }
    }

    public function saveLayout(Request $request){
        $layout;
        if(session('id')===null){
            return false;
        } else if($request["layout"]["id"]==="new"){
            $layout = new Layout;
            $layout->user_id=session('id');
        } else {
            $layout=Layout::find($request["layout"]["id"]);
            foreach($layout->childs as $child){
                $child->delete();
            }
        }
        $layout->display=$request["layout"]["display"];
        $layout->flexDirection=$request["layout"]["flexDirection"];
        $layout->height=$request["layout"]["height"];
        $layout->width=$request["layout"]["width"];
        $layout->save();
        foreach($request["childs"] as $child){
            $newChild = new Child;
            $newChild->layout_id=$layout->id;
            $newChild->data_gen=$child["gen"];
            $newChild->data_id=$child["id"];
            $newChild->data_parent_gen=$child["parent_gen"];
            $newChild->data_parent_id=$child["parent_id"];
            $newChild->hasChilds=$child["hasChilds"];
            if($child["hasChilds"]==0) {
                $newChild->title=$child["title"];
                $newChild->fontSize=$child["fontSize"];
            }
            $newChild->display=$child["display"];
            $newChild->flexDirection=$child["flexDirection"];
            $newChild->height=$child["height"];
            $newChild->width=$child["width"];
            $newChild->margin=$child["margin"];
            $newChild->save();
        }
        return true;
    }
}
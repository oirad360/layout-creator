<?php

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

class NewLayoutController extends BaseController
{
    public function newLayout(){
        if(session('id')===null)
        return view('newLayout')
        ->with('app_folder', env('APP_FOLDER'))
        ->with('csrf_token', csrf_token());
        else
        return view('newLayout')
        ->with('logged', true)
        ->with('app_folder', env('APP_FOLDER'))
        ->with('csrf_token', csrf_token());
    }

    public function saveUsersLayout($layoutID){
        if(UsersLayout::find($layoutID)===null){
            $usersLayout = new UsersLayout();
            $usersLayout->user_id=session('id');
            $usersLayout->layout_id=$layoutID;
            $usersLayout->save();
        }
    }

    /* public function saveLayout(Request $request){
        $layout;
        if($request["id"]==="new"){
            $layout = new Layout;
        } else {
            $layout=Layout::find($request["id"]);
            foreach($layout->childs as $child){
                $child->delete();
            }
        }
        $layout->display=$request["display"];
        $layout->flexDirection=$request["flexDirection"];
        $layout->height=$request["height"];
        $layout->width=$request["width"];
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
        return $layout->id;
    } */
}
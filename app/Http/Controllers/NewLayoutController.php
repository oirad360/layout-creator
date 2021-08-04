<?php

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

class NewLayoutController extends BaseController
{
    public function newLayout($layoutID){
        if($layoutID!=="new"){
            if(session('id')===null){
                redirect('layout/'.$layoutID);
            } else if(Layout::find($layoutID)->user->id===session('id')){
                return view('newLayout')
                ->with('layoutID',$layoutID)
                ->with('app_folder',env('APP_FOLDER'))
                ->with('csrf_token', csrf_token());
            } else redirect('layout/'.$layoutID);
        } else {
            return view('newLayout')
            ->with('layoutID',"new")
            ->with('app_folder',env('APP_FOLDER'))
            ->with('csrf_token', csrf_token());
        }
    }

    public function saveLayout(Request $request){
        $layout_id=0;
        if(session('id')===null){
            return false;
        } else if($request["layout"]["id"]==="new"){
            $newLayout = new Layout;
            $newLayout->user_id=session('id');
            $newLayout->display=$request["layout"]["display"];
            $newLayout->flexDirection=$request["layout"]["flexDirection"];
            $newLayout->flexWrap=$request["layout"]["flexWrap"];
            $newLayout->height=$request["layout"]["height"];
            $newLayout->width=$request["layout"]["width"];
            $newLayout->save();
            $layout_id=$newLayout->id;
        } else {
            $layout_id=$request["layout"]["id"];
            $layout=Layout::find($layout_id);
            $layout->display=$request["layout"]["display"];
            $layout->flexDirection=$request["layout"]["flexDirection"];
            $layout->flexWrap=$request["layout"]["flexWrap"];
            $layout->height=$request["layout"]["height"];
            $layout->width=$request["layout"]["width"];
            $layout->save();
            foreach($layout->childs as $child){
                $child->delete();
            }
        }
        foreach($request["childs"] as $child){
            $newChild = new Child;
            $newChild->layout_id=$layout_id;
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
            $newChild->flexWrap=$child["flexWrap"];
            $newChild->height=$child["height"];
            $newChild->width=$child["width"];
            $newChild->margin=$child["margin"];
            $newChild->save();
        }
        return true;
    }
}

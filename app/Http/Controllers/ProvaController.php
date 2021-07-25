<?php

use Illuminate\Routing\Controller as BaseController;

class ProvaController extends BaseController
{
    public function home(){
        return view('home');
    }
}

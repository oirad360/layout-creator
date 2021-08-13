<?php

use Illuminate\Database\Eloquent\Model;

class Layout extends Model
{
    public $timestamps=false;

   public function user(){
        return $this->hasOne("UsersLayout");
    }

    public function childs(){
        return $this->hasMany("Child");
    }
}

?>
<?php

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $hidden = ['password'];
    public $timestamps=false;

    public function layouts(){
        return $this->hasMany("Layout");
    }
}

?>
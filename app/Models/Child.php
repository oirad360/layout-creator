<?php

use Illuminate\Database\Eloquent\Model;

class Child extends Model
{
    public $timestamps=false;
    protected $table="childs";
    
    public function layout(){
        return $this->belongsTo("Layout");
    }
}

?>
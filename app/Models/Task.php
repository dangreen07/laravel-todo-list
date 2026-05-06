<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Task extends Pivot
{
    protected $fillable = ['name', 'description', 'checked'];
}

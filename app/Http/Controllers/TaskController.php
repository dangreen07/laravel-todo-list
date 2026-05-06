<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index() {
        $tasks = \DB::table("task")->latest()->get();
        return Inertia::render("todo-list", ['tasks' => $tasks]);
    }
}

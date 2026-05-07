<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

if (env("APP_ENV") === "production") {
    URL::forceHttps();
}

Route::inertia('/', 'home', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    [Route::inertia('dashboard',
        'dashboard')->name('dashboard'),

        Route::get('/todo-list', [
                TaskController::class, 'index',
            ])->name('todo-list'),

        Route::post('/task', [
                TaskController::class,
                'newTask',
            ])->name('new-task'),

        Route::post('/task/{id}', [
            TaskController::class,
            'updateTask'
        ])->name('update-task'),

        Route::post('/task/{id}/delete',[
            TaskController::class,
            'deleteTask'
        ])->name('delete-task')
    ];
});
require __DIR__.'/settings.php';

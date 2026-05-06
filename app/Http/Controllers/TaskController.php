<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        if ($user === null) {
            return to_route('login');
        }
        $userId = $user->id;
        $tasks = \DB::table('task')->latest()->where('user_id', $userId)->get()->toArray();

        return Inertia::render('todo-list', ['tasks' => $tasks]);
    }

    public function newTask(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'max:255'],
            'description' => ['required', 'max:2048'],
        ]);
        $user = $request->user();
        if ($user === null) {
            return to_route('login');
        }
        $userId = $user->id;
        \DB::table('task')->insert([
            'user_id' => $userId,
            'name' => $validated['name'],
            'description' => $validated['description'],
            'checked' => false,
        ]);
        $tasks = \DB::table('task')->latest()->where('user_id', $userId)->get()->toArray();

        return to_route('todo-list', ['tasks' => $tasks]);
    }

    public function updateTask(Request $request, int $id): Response | RedirectResponse {
        $user = $request->user();
        if ($user === null) {
            return response('Unauthorized', 401);
        }
        $userId = $user->id;
        $name = $request->input('name');
        $description = $request->input('description');
        $checked = $request->input('checked');
        if ($name === null && $description === null && $checked === null) {
            return response('Bad Request', 400);
        }
        \DB::table('task')
            ->where('id', $id)
            ->where('user_id', $userId)
            ->update($request->all());
        return response()->redirectToRoute('/');
    }
}

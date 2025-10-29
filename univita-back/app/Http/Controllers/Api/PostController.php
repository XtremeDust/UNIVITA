<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Carga la relación 'user' (autor) para el Resource
        $posts = Post::with('user')
                 // ->where('status', 'publico')
                 // ->latest() // Ordena por created_at descendente
                 ->get();

        return PostResource::collection($posts);
    }

    /**
     * Muestra un post específico.
     * GET /api/posts/{post}
     */
    public function show(Post $post)
    {
        // Carga la relación 'user'
        $post->load('user');
        return new PostResource($post);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}

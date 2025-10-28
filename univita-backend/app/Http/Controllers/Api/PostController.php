<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function index(){
        
        $posts = Post::with('user')->get();

        $result = $posts->map(fn($p)=>[
            'id'=>$p->id,
            'title'=>$p->title,
            'body'=>$p->body,
            'status'=>$p->status,
            'author'=>$p->user ? ['id'=>$p->user->id, 'name'=>$p->user->name, 'email'=>$p->user->email]:null,
            'created_at'=>$p->created_at,
        ]);

        return response()->json($result);
    }
}

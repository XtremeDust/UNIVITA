<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SubscriptionResource;
use App\Http\Resources\UserResource;
use App\Models\UserSubscription;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function index(){
        // Cargamos las suscripciones CON sus usuarios
        $subscriptions = UserSubscription::with('user')->get();
        // Extraemos solo los objetos User
        

        // Devolvemos una colección de UserResource
        return SubscriptionResource::collection($subscriptions);
    }
}

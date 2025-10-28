<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EventsSubscriptionResource;
use App\Models\EventSubscription;
use Illuminate\Http\Request;

class EventsSubscriptionController extends Controller
{
    public function index(){
        $subscriptions = EventSubscription::with('user')->get();
    
        return EventsSubscriptionResource::collection($subscriptions);
    }
}

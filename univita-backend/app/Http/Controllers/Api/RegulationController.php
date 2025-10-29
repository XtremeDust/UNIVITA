<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RegulationResource;
use App\Models\Regulation;
use Illuminate\Http\Request;
use Carbon\Carbon;

class RegulationController extends Controller
{
    public function index(Request $request){
        $scope = $request->query('scope');          
        $dateFilter = $request->query('published_after'); 
        $searchTerm = $request->query('search');

       

        $query = Regulation::query()->with('creator');

        if($scope && in_array($scope,['general_evento', 'deporte_base', 'disciplina_especifica'])){
            $query->where('scope', $scope);
        }

        if ($dateFilter) {
            try {
                $query->where('published', '>=', Carbon::parse($dateFilter)->startOfDay());
            } catch (\Exception $e) { /* Ignora si la fecha es inválida */ }
        }

        if ($searchTerm) {
             $query->where('title', 'LIKE', '%' . $searchTerm . '%');
        }

        $regulations = $query->get();

        return RegulationResource::collection($regulations);
    }
    
}

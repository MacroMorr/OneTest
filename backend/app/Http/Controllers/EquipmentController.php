<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\JsonResponse;

class EquipmentController extends BaseController

{
    use DispatchesJobs, ValidatesRequests;
    public function list(Request $request): \Illuminate\Http\JsonResponse
    {
/*        $equipments = [
            ['id' => 1, 'type' => 'Type 1', 'mask' => 'Mask 1'],
            ['id' => 2, 'type' => 'Type 2', 'mask' => 'Mask 2'],
            ['id' => 3, 'type' => 'Type 3', 'mask' => 'Mask 3'],
        ];
        return response()->json([ 'request' => $request->all(), 'mydata' => $equipments]);*/
        $equipments = DB::table('equipment_name')->get();
        return response()->json(['request' => $request->all(), 'mydata' => $equipments]);
    }


}

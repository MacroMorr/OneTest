<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

class EquipmentController extends BaseController
{
    use DispatchesJobs, ValidatesRequests;

    public function list(): JsonResponse
    {
        $equipments = DB::table('equipment')->get();
        return response()->json($equipments);
    }

    public function save(int $equipmentId, Request $request): JsonResponse
    {
        $result = Equipment::where('id', $equipmentId)->update($request->all()['params']);
        return response()->json($result);
    }

    public function delete(int $equipmentId): JsonResponse
    {
        $result = Equipment::where('id', $equipmentId)->delete();
        return response()->json($result);
    }

    public function add(Request $request): JsonResponse
    {
        Equipment::insert($request->all()['params']);
        return response()->json(DB::getPdo()->lastInsertId());
    }

}

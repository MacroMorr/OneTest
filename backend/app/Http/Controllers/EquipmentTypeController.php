<?php

namespace App\Http\Controllers;

use App\Models\EquipmentType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EquipmentTypeController
{
    public function list(): JsonResponse
    {
        $equipmentTypeList = DB::table('equipment_type')->get();
        return response()->json($equipmentTypeList);
    }

    public function save(int $equipmentId, Request $request): JsonResponse
    {
        $result = EquipmentType::where('id', $equipmentId)->update($request->all()['params']);
        return response()->json($result);
    }

    public function delete(int $equipmentId): JsonResponse
    {
        $result = EquipmentType::where('id', $equipmentId)->delete();
        return response()->json($result);
    }

    public function add(Request $request): JsonResponse
    {
        EquipmentType::insert($request->all()['params']);
        return response()->json(DB::getPdo()->lastInsertId());
    }
}

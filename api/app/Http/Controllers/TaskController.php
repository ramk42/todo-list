<?php

namespace App\Http\Controllers;

use App\Services\TaskService;
use App\Models\Status;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    protected TaskService $taskservice;

    public function __construct(
        TaskService $taskservice,
    ) {
        $this->taskservice = $taskservice;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Task::with("status")->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $success = $this->taskservice->createTask($request);
        if (true === $success){
            return response()->json(["message" => "saved"]);
        }
        return response()->json(["message" => 'error'] , 500);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $task = $this->taskservice->getTask($id);
            return response()->json($task);
        } catch (\Exception $exception) {
            return response()->json(["message" => $exception->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateStatus(Request $request, string $id)
    {
        $success = $this->taskservice->updateStatus($request, $id);
        if (true === $success){
            return response()->json(["message" => "updated"]);
        }
        return response()->json(["message" => 'error'] , 500);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $success = $this->taskservice->destroy($id);
        if (true === $success){
            return response()->json(["message" => "deleted"]);
        }
        return response()->json(["message" => 'error'] , 500);
    }
}

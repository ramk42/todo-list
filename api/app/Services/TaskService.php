<?php

namespace App\Services;
use Illuminate\Http\Request;
use App\Models\Task;

class TaskService
{

    public function createTask(Request $request):bool {
        $request->validate([
            'name'=>'required',
        ]);
        $task = new Task();

        $task->name = $request->name;
        $task->status_id = 1;

        try {
            $task->save();
            return true;
        }

        catch(\Exception $exception){
            return false;
        }
    }
    function updateStatus(Request $request, string $id):bool{
        $request->validate([
            'status_id' => 'required|exists:statuses,id',
        ]);

        try {
            $task = Task::findOrFail($id);
            $task->status_id = $request->status_id;
            $task->save();
            return true;
        } catch (\Exception $exception) {
            return false;
        }
    }

    function getTask($id):Task {
        return Task::with('status')->findOrFail($id)->makeHidden(['created_at']);

    }

    function destroy(int $id):bool
    {
        try{
            $task = Task::findOrFail($id);
            $task->delete();
            return true;
        }
        catch(\Exception $exception){
            return false;
        }

    }
}

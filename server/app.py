from flask import Flask, request, jsonify
from gemini_query import query_gemini
import os
from priority_queue import PriorityTaskQueue



app = Flask(__name__)

@app.route("/api/assign_priorities", methods=["POST"])
def assign_priorities():
    data = request.json
    tasks = data["tasks"]

    task_queue = PriorityTaskQueue()

    for task in tasks:
        promptPrio = f"""
        Assign a priority number (1 = highest priority, 5 = lowest priority)
        for this task based on urgency and importance.

        Task: {task['title']}
        Description: {task['description']}

        Return ONLY a number.
        """


        try:
            response = query_gemini(promptPrio)
            priority = int(response.strip())
        except Exception as e:
            print("Gemini failed", e)
            priority = 3

        task_queue.add_task(task, priority)
    ordered_tasks = task_queue.get_all_tasks()

    return jsonify({"ordering": ordered_tasks})

if __name__ == "__main__":
    app.run(debug=True, port=5000)

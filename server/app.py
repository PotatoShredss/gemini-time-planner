from flask import Flask, request, jsonify
from gemini_query import query_gemini
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
        promptTime = f"""
        Assign a time to work in minutes for this task based on how long one might expect it to take, proportional to the total time alloted.

        Task: {task['title']}
        Description: {task['description']}
        Total Time Alloted: {data['totalHours']}

        Return ONLY a number.
        """
        
        try:
            response1 = query_gemini(promptPrio)
            priority = int(response1.strip())
            time_to_work = int(query_gemini(promptTime).strip())
        except Exception as e:
            print("Gemini failed", e)
            priority = 3
            time_to_work = 30

        task_queue.add_task(task, priority)
    

    ordered_tasks = task_queue.get_all_tasks()

    return jsonify({"ordering": ordered_tasks})




if __name__ == "__main__":
    app.run(debug=True, port=5000)

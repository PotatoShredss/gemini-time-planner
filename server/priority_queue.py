import heapq
import time

class PriorityTaskQueue:
    def __init__(self):
        self.queue = []
        self.counter = 0  # keeps order for same priority

    def add_task(self, task, priority):
        """
        Lower number = higher priority
        1 = High
        2 = Medium
        3 = Low
        """
        timestamp = time.time()
        heapq.heappush(self.queue, (priority, timestamp, self.counter, task))
        self.counter += 1

    def get_next_task(self):
        if not self.queue:
            return None
        return heapq.heappop(self.queue)[3]

    def get_all_tasks(self):
        return [item[3] for item in sorted(self.queue)]

    def is_empty(self):
        return len(self.queue) == 0

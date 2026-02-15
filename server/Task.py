
class Task:

    def __init__(self, name, extra_notes, time_to_do, priority):
        self.name = name
        self.extra_notes = extra_notes
        self.time_to_do = time_to_do
        self.priority = priority
        
    def get_name(self):
        return self.name
    
    def set_name(self, name):
        self.name = name
    
    def get_extra_notes(self):
        return self.extra_notes
    
    def set_extra_notes(self, extra_notes):
        self.extra_notes = extra_notes
    
    def get_time_to_do(self):
        return self.time_to_do
    
    def set_time_to_do(self, time_to_do):
        self.time_to_do = time_to_do
    
    def get_priority(self):
        return self.priority
    
    def set_priority(self, priority):
        self.priority = priority

    
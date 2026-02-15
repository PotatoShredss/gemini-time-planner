aeiou

TODO:
1: decide on tech stack: python+react
2: set up file structure w/ ai
3: code lol
    3.1:frontend

    3.2:backend
    
    3.3:integrate google gemini
4: make readme
5: make presentation


TODO:
PAGE 1: SELECTION AND ALLOCATION
    Input for task
    Input for extra task notes(low grade, due in x time, etc.)
    Input for components of task(ie: can split “essay” into research and writing)
    Input for total time
    Start button
PAGE 2: WORKFLOW
    Bar that covers total time left
        Split proportionally into tasks
        Each task has their own time left to work at
        Ordered by priority
        “Extra time” block at the bottom if there is any
        (colour coded?)
    If task time runs out, ask the user if they’re done. 
        If they are, do nothing
        If they aren’t, ask for progress(query ai) and use extra time if it exists, or remove time from other tasks.
    Each section/task in the bar can be clicked, bringing up a menu.
        Menu has 3 options:
            Finish early(delete it)
                This prompts to reallocate the time or to simply add extra time at the bottom.
            Change priority(up or down)
            Change difficulty
    Button to end session(will ask for confirmation)
EXTRA FEATURES GIVEN TIME:
    Audible voice notifications of time left
    Key navigation(arrow keys and enter instead of mouse) (accessibility)


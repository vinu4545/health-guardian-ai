# simple in-memory store (can upgrade to DB later)

chat_memory = {}

def get_history(session_id):
    return chat_memory.get(session_id, [])

def update_history(session_id, user_msg, bot_msg):
    if session_id not in chat_memory:
        chat_memory[session_id] = []

    chat_memory[session_id].append({
        "user": user_msg,
        "bot": bot_msg
    })

    # limit memory (last 5 chats)
    chat_memory[session_id] = chat_memory[session_id][-5:]
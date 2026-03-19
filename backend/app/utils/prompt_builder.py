def build_prompt(user_input, history):

    history_text = ""
    for chat in history:
        history_text += f"User: {chat['user']}\nAI: {chat['bot']}\n"

    return f"""
You are an advanced AI medical assistant.

Rules:
- Give safe medical advice
- Do NOT give critical diagnosis
- Suggest doctor if needed
- Keep answers clear

Conversation History:
{history_text}

User: {user_input}
AI:
"""
from google import genai
from app.config import GEMINI_API_KEY
from app.services.memory_service import get_history, update_history
from app.utils.prompt_builder import build_prompt

# Configure client
client = genai.Client(api_key=GEMINI_API_KEY)


def stream_gemini_response(user_input, session_id):
    history = get_history(session_id)

    prompt = build_prompt(user_input, history)

    # Streaming response
    response = client.models.generate_content_stream(
        model="gemini-2.5-flash",
        contents=prompt
    )

    full_text = ""

    for chunk in response:
        if chunk.text:
            full_text += chunk.text
            yield chunk.text  # 🔥 send chunk to frontend

    update_history(session_id, user_input, full_text)
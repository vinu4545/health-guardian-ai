from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse
from app.services.gemini_service import stream_gemini_response
from app.models.chat_model import ChatRequest
from app.middleware.rate_limiter import limiter

router = APIRouter()

@router.post("/")
@limiter.limit("10/minute")
async def chat(request: Request, body: ChatRequest):

    def generator():
        for chunk in stream_gemini_response(body.message, body.session_id):
            yield chunk

    return StreamingResponse(generator(), media_type="text/plain")
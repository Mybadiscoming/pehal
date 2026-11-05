# File: backend/app/modules/safe_space_companion/routes.py

from fastapi import APIRouter, HTTPException

from app.modules.safe_space_companion.schemas import (
    ChatRequest,
    ChatResponse
)

from app.modules.safe_space_companion.services import (
    SafeSpaceService
)


router = APIRouter(
    prefix="/safe-space",
    tags=["Safe Space Companion"]
)

safe_space_service = SafeSpaceService()


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):

    try:
        reply = safe_space_service.generate_reply(
            session_id=request.session_id,
            message=request.message
        )

        history = safe_space_service.conversation_manager.get_history(
            request.session_id
        )

        return ChatResponse(
            session_id=request.session_id,
            reply=reply,
            conversation_history=history
        )

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Something went wrong while processing your message."
        )
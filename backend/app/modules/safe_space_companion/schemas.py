from pydantic import BaseModel, Field
from typing import Literal


class ChatRequest(BaseModel):
    session_id: str = Field(
        min_length=1,
        description="Identifies the current chat session"
    )

    message: str = Field(
        min_length=1,
        max_length=5000,
        description="The message sent by the user"
    )


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatResponse(BaseModel):
    session_id: str
    reply: str
    conversation_history: list[ChatMessage] = Field(
        default_factory=list
    )
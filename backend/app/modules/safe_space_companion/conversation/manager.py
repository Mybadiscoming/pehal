from app.modules.safe_space_companion.schemas import ChatMessage


class ConversationManager:

    def __init__(self):
        self.conversations = {}

    def get_history(self, session_id: str) -> list[ChatMessage]:
        return self.conversations.get(session_id, [])

    def add_message(
        self,
        session_id: str,
        role: str,
        content: str
    ):
        if session_id not in self.conversations:
            self.conversations[session_id] = []

        message = ChatMessage(
            role=role,
            content=content
        )

        self.conversations[session_id].append(message)

    def clear_history(self, session_id: str):
        self.conversations.pop(session_id, None)
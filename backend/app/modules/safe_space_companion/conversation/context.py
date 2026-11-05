from app.modules.safe_space_companion.schemas import ChatMessage


class ContextManager:

    def __init__(self, max_messages: int = 10):
        self.max_messages = max_messages

    def prepare_context(
        self,
        history: list[ChatMessage]
    ) -> list[dict]:

        recent_history = history[-self.max_messages:]

        return [
            {
                "role": message.role,
                "content": message.content
            }
            for message in recent_history
        ]
# File: backend/app/modules/safe_space_companion/services.py

import os
from pathlib import Path

from dotenv import load_dotenv
from adaption import Adaption

from app.modules.safe_space_companion.conversation.manager import (
    ConversationManager
)

from app.modules.safe_space_companion.conversation.context import (
    ContextManager
)

from app.modules.safe_space_companion.prompts import (
    SAFE_SPACE_SYSTEM_PROMPT
)

from app.modules.safe_space_companion.safety.detector import (
    assess_message
)

from app.modules.safe_space_companion.safety.responses import (
    get_safety_response
)

from app.modules.safe_space_companion.retrieval.retriever import (
    retrieve_resources
)


# Load the .env file from C:\pehal\
PROJECT_ROOT = Path(__file__).resolve().parents[4]
load_dotenv(PROJECT_ROOT / ".env")


class SafeSpaceService:

    def __init__(self):

        api_key = os.getenv("ADAPTION_API_KEY")

        if not api_key:
            raise RuntimeError(
                "ADAPTION_API_KEY not found. "
                "Check your project-root .env file."
            )

        self.client = Adaption(api_key=api_key)

        self.conversation_manager = ConversationManager()
        self.context_manager = ContextManager(max_messages=10)

    def generate_reply(self, session_id: str, message: str) -> str:

        # 1. Check the message for possible safety signals
        assessment = assess_message(message)

        # 2. Handle detected safety signals before calling the AI
        if assessment.detected:

            safety_reply = get_safety_response(
                assessment.categories
            )

            self.conversation_manager.add_message(
                session_id, "user", message
            )

            self.conversation_manager.add_message(
                session_id, "assistant", safety_reply
            )

            return safety_reply

        # 3. Retrieve relevant support resources
        resources = retrieve_resources(message)

        resource_context = "\n\n".join(
            [
                (
                    f"Resource: {resource['title']}\n"
                    f"Information: {resource['content']}\n"
                    f"Contact: {resource['contact'] or 'Not specified'}\n"
                    f"Source: {resource['source']}\n"
                    f"Source URL: {resource['source_url']}\n"
                    f"Jurisdiction: {resource['jurisdiction']}"
                )
                for resource in resources
            ]
        )

        if not resource_context:
            resource_context = (
                "No directly relevant support resources "
                "were found in the knowledge base."
            )

        # 4. Retrieve previous conversation history
        history = self.conversation_manager.get_history(session_id)

        # 5. Prepare conversation context
        context = self.context_manager.prepare_context(history)

        # 6. Add the latest user message
        context.append({
            "role": "user",
            "content": message
        })

        # 7. Add verified resources to the AI instructions
        instructions = (
            f"{SAFE_SPACE_SYSTEM_PROMPT}\n\n"
            "VERIFIED SUPPORT RESOURCES:\n"
            f"{resource_context}\n\n"
            "RESOURCE USAGE RULES:\n"
            "- Use the supplied resources only when relevant.\n"
            "- Do not invent helpline numbers, services or URLs.\n"
            "- Do not claim a service is available in a location "
            "unless its availability has been verified.\n"
            "- Explain that availability may vary by location "
            "when appropriate.\n"
            "- Never pressure the user to report or seek help.\n"
            "- Respect the user's choices and autonomy.\n"
            "- Do not present this information as legal or "
            "medical advice."
        )

        # 8. Generate the AI response
        response = self.client.responses.create(
            model="qwen3.5-397b",
            instructions=instructions,
            input=context
        )

        reply = response.output_text

        # 9. Save conversation messages
        self.conversation_manager.add_message(
            session_id, "user", message
        )

        self.conversation_manager.add_message(
            session_id, "assistant", reply
        )

        return reply
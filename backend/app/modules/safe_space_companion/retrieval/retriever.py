# File: backend/app/modules/safe_space_companion/retrieval/retriever.py

from app.modules.safe_space_companion.retrieval.knowledge_base import (
    get_all_resources
)


# Keywords associated with different support needs
RESOURCE_KEYWORDS = {
    "emergency_support": [
        "emergency",
        "danger",
        "unsafe",
        "threat",
        "hurt",
        "immediate help",
        "police",
        "112"
    ],

    "emotional_and_emergency_support": [
        "helpline",
        "support",
        "distress",
        "afraid",
        "scared",
        "violence",
        "someone to talk to",
        "181"
    ],

    "professional_support": [
        "counselling",
        "counseling",
        "legal aid",
        "medical help",
        "shelter",
        "one stop centre",
        "professional help"
    ]
}


def retrieve_resources(message: str, limit: int = 3):
    """
    Find resources relevant to a user's message
    using simple keyword matching.
    """

    message = message.lower()
    matched_resources = []

    for resource in get_all_resources():
        keywords = RESOURCE_KEYWORDS.get(
            resource["category"], []
        )

        score = sum(
            1 for keyword in keywords
            if keyword in message
        )

        if score > 0:
            matched_resources.append((score, resource))

    # Sort resources by relevance, highest score first
    matched_resources.sort(
        key=lambda item: item[0],
        reverse=True
    )

    return [
        resource
        for score, resource in matched_resources[:limit]
    ]
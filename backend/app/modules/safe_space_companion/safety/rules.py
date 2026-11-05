# File: backend/app/modules/safe_space_companion/safety/rules.py

import re


SAFETY_PATTERNS = {
    "immediate_danger": [
        r"\bi am in immediate danger\b",
        r"\bi am not safe right now\b",
        r"\bsomeone is threatening me\b",
        r"\bthey are threatening to hurt me\b",
        r"\bsomeone is trying to hurt me\b",
        r"\bi am being followed\b",
    ],

    "self_harm": [
        r"\bi want to kill myself\b",
        r"\bi want to end my life\b",
        r"\bi am going to hurt myself\b",
        r"\bi plan to hurt myself\b",
        r"\bi do not want to live anymore\b",
        r"\bi might kill myself\b",
    ],

    "emotional_distress": [
        r"\bi feel overwhelmed\b",
        r"\bi am having a panic attack\b",
        r"\bi cannot stop crying\b",
        r"\bi feel terrified\b",
        r"\bi feel completely helpless\b",
        r"\bi cannot cope anymore\b",
    ],
}


def detect_safety_signals(message: str) -> list[str]:
    """
    Detect possible safety-related signals in a message.

    This is a basic prototype detector, not a reliable
    crisis assessment or substitute for human support.
    """

    detected_categories = []

    normalised_message = message.lower()

    for category, patterns in SAFETY_PATTERNS.items():

        for pattern in patterns:

            if re.search(pattern, normalised_message):
                detected_categories.append(category)
                break

    return detected_categories
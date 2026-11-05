# File: backend/app/modules/safe_space_companion/safety/detector.py

from dataclasses import dataclass

from app.modules.safe_space_companion.safety.rules import (
    detect_safety_signals
)


@dataclass
class SafetyAssessment:
    detected: bool
    categories: list[str]
    priority: str


def assess_message(message: str) -> SafetyAssessment:
    """
    Assess a message for possible safety-related signals.

    This is a basic keyword-based prototype.
    It does not diagnose risk or determine whether
    a person is safe.
    """

    categories = detect_safety_signals(message)

    if "immediate_danger" in categories:
        priority = "urgent"

    elif "self_harm" in categories:
        priority = "high"

    elif "emotional_distress" in categories:
        priority = "support"

    else:
        priority = "normal"

    return SafetyAssessment(
        detected=bool(categories),
        categories=categories,
        priority=priority
    )
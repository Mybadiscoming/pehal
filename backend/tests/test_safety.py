# File: backend/tests/test_safety.py

from app.modules.safe_space_companion.safety.detector import (
    assess_message
)

from app.modules.safe_space_companion.safety.responses import (
    get_safety_response
)


def test_immediate_danger():
    result = assess_message("I am not safe right now")

    assert result.detected is True
    assert result.priority == "urgent"

    response = get_safety_response(result.categories)
    assert response is not None


def test_self_harm():
    result = assess_message("I want to end my life")

    assert result.detected is True
    assert result.priority == "high"

    response = get_safety_response(result.categories)
    assert response is not None


def test_emotional_distress():
    result = assess_message("I feel overwhelmed")

    assert result.detected is True
    assert result.priority == "support"

    response = get_safety_response(result.categories)
    assert response is not None


def test_normal_message():
    result = assess_message("I want to understand my feelings")

    assert result.detected is False
    assert result.priority == "normal"
# File: backend/app/modules/safe_space_companion/safety/responses.py

SAFETY_RESPONSES = {

    "immediate_danger": (
        "I'm sorry you're facing this. Your immediate safety "
        "matters most right now.\n\n"
        "If you are in immediate danger in India, you can call "
        "112 for emergency assistance. If possible, consider "
        "moving to a place where you feel safer, if doing so "
        "does not put you at greater risk.\n\n"
        "If you are a woman seeking support related to violence "
        "or distress, Women Helpline 181 may also be an option. "
        "Its availability varies by state and union territory.\n\n"
        "You do not have to contact family or friends if they "
        "do not feel safe. You deserve support from someone "
        "you feel comfortable approaching.\n\n"
        "Would you like help exploring a safe next step?"
    ),

    "self_harm": (
        "I'm really sorry things feel so difficult right now. "
        "I'm glad you told me. You deserve care and support, "
        "and you do not have to face this alone.\n\n"
        "Can I ask: are you in immediate danger of hurting "
        "yourself right now, or have you made a plan to do so?\n\n"
        "If you feel you might act on these thoughts soon, "
        "please seek immediate help. In India, you can call "
        "112 or go to the nearest emergency department. "
        "If possible, move away from anything you might use "
        "to hurt yourself and consider being somewhere safer "
        "with a person or professional you feel comfortable with.\n\n"
        "You do not have to involve someone who makes you "
        "feel unsafe. We can take this one step at a time."
    ),

    "emotional_distress": (
        "That sounds like a lot to carry. I'm here to listen, "
        "and you do not have to explain anything you're not "
        "comfortable sharing.\n\n"
        "You deserve support, whether that means talking "
        "through what happened, exploring professional "
        "support options, or simply taking a moment to breathe.\n\n"
        "Would you prefer to talk about what you're feeling, "
        "or try a gentle grounding exercise?"
    )
}


def get_safety_response(categories: list[str]) -> str | None:
    """
    Return an appropriate predefined response for a detected signal.

    Immediate danger takes priority over other categories.
    """

    priority_order = [
        "immediate_danger",
        "self_harm",
        "emotional_distress"
    ]

    for category in priority_order:
        if category in categories:
            return SAFETY_RESPONSES[category]

    return None
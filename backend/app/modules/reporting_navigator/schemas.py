# File: backend/app/modules/reporting_navigator/schemas.py

from pydantic import BaseModel, Field
from typing import Literal


class NavigatorRequest(BaseModel):

    concern_type: Literal[
        "workplace_harassment",
        "domestic_violence",
        "sexual_violence",
        "cyber_harassment",
        "other"
    ]

    barrier: Literal[
        "fear_of_retaliation",
        "family_pressure",
        "lack_of_information",
        "privacy_concerns",
        "financial_dependence",
        "emotional_distress",
        "unsure"
    ]

    preferred_outcome: Literal[
        "understand_options",
        "prepare_to_report",
        "find_support_without_reporting"
    ] = "understand_options"

    state: str | None = Field(
        default=None,
        max_length=100,
        description="Indian state or union territory, if provided"
    )


class NavigatorResponse(BaseModel):

    concern_type: str
    barrier: str
    guidance: str
    possible_options: list[str]
    suggested_next_steps: list[str]
    support_note: str
    disclaimer: str
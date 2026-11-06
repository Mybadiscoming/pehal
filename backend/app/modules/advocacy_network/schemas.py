# File: backend/app/modules/advocacy_network/schemas.py

from pydantic import BaseModel, Field
from typing import Literal


SupportType = Literal[
    "legal_aid",
    "legal_information",
    "counselling",
    "emotional_support",
    "shelter",
    "emergency_support",
    "practical_support",
    "workplace_advocacy",
    "medical_support",
    "healthcare_referral",
]


class OrganisationMatchRequest(BaseModel):
    """Information used to find relevant support organisations."""

    support_types: list[SupportType] = Field(
        default_factory=list,
        description="Types of support the person is looking for.",
    )

    city: str | None = Field(
        default=None,
        max_length=100,
        description="Preferred city, if any.",
    )

    state: str | None = Field(
        default=None,
        max_length=100,
        description="Preferred state or union territory, if any.",
    )

    include_other_locations: bool = Field(
        default=False,
        description="Include matching organisations outside the requested location.",
    )


class OrganisationResponse(BaseModel):
    """Organisation information returned to the user."""

    id: str
    name: str
    description: str
    services: list[str]

    city: str
    state: str

    address: str | None = None
    phone: str | None = None
    email: str | None = None
    contact_hours: str | None = None

    latitude: float
    longitude: float

    verification_status: str
    is_demo: bool
    source_url: str | None = None


class OrganisationMatchResponse(BaseModel):
    """Matching results, including map-ready organisation locations."""

    total_results: int
    search_city: str | None = None
    search_state: str | None = None
    matched_support_types: list[str]
    organisations: list[OrganisationResponse]
    notice: str
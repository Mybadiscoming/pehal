# File: backend/app/modules/accountability_tracker/schemas.py

from datetime import date
from typing import Literal

from pydantic import BaseModel, Field


CaseStatus = Literal[
    "submitted",
    "acknowledged",
    "under_review",
    "resolved",
    "overdue",
]

MilestoneStatus = Literal[
    "pending",
    "in_progress",
    "completed",
    "overdue",
]

DateSource = Literal[
    "official_deadline",
    "institution_promise",
    "survivor_estimate",
]


class CaseCreateRequest(BaseModel):
    title: str = Field(min_length=1, max_length=150)
    institution_name: str = Field(min_length=1, max_length=150)
    complaint_date: date
    reference_number: str | None = Field(default=None, max_length=100)
    current_status: CaseStatus = "submitted"
    description: str | None = Field(default=None, max_length=2000)


class MilestoneCreateRequest(BaseModel):
    title: str = Field(min_length=1, max_length=150)
    description: str | None = Field(default=None, max_length=1000)
    due_date: date | None = None
    date_source: DateSource | None = None


class MilestoneUpdateRequest(BaseModel):
    status: MilestoneStatus
    completed_date: date | None = None
    update_note: str | None = Field(default=None, max_length=1000)


class FollowUpCreateRequest(BaseModel):
    contact_date: date
    contact_method: Literal[
        "email",
        "phone",
        "in_person",
        "written_letter",
        "other",
    ]
    description: str = Field(min_length=1, max_length=2000)
    response_received: bool = False
    response_summary: str | None = Field(default=None, max_length=2000)


class CaseResponse(BaseModel):
    id: str
    title: str
    institution_name: str
    complaint_date: date
    reference_number: str | None
    current_status: CaseStatus
    description: str | None
    created_at: date


class MilestoneResponse(BaseModel):
    id: str
    title: str
    description: str | None
    due_date: date | None
    date_source: DateSource | None
    status: MilestoneStatus
    completed_date: date | None
    update_note: str | None


class FollowUpResponse(BaseModel):
    id: str
    contact_date: date
    contact_method: str
    description: str
    response_received: bool
    response_summary: str | None


class CaseDetailResponse(BaseModel):
    case: CaseResponse
    milestones: list[MilestoneResponse]
    follow_ups: list[FollowUpResponse]
    overdue_milestones: int
    next_due_date: date | None
    notice: str
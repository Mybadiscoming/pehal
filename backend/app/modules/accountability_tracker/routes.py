# File: backend/app/modules/accountability_tracker/routes.py

from fastapi import APIRouter, HTTPException, status

from app.modules.accountability_tracker.schemas import (
    CaseCreateRequest,
    CaseResponse,
    CaseDetailResponse,
    MilestoneCreateRequest,
    MilestoneUpdateRequest,
    MilestoneResponse,
    FollowUpCreateRequest,
    FollowUpResponse,
)

from app.modules.accountability_tracker.services import (
    AccountabilityService,
)


router = APIRouter(
    prefix="/accountability",
    tags=["Institutional Accountability Tracker"],
)

accountability_service = AccountabilityService()


@router.get("/cases", response_model=list[CaseResponse])
def get_cases():
    """List cases maintained by the user."""

    return accountability_service.get_all_cases()


@router.post(
    "/cases",
    response_model=CaseResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_case(request: CaseCreateRequest):
    """Create a new personal complaint record."""

    return accountability_service.create_case(request.dict())


@router.get(
    "/cases/{case_id}",
    response_model=CaseDetailResponse,
)
def get_case_details(case_id: str):
    """View case status, milestones, follow-ups and overdue items."""

    result = accountability_service.get_case_details(case_id)

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Case not found.",
        )

    return result


@router.post(
    "/cases/{case_id}/milestones",
    response_model=MilestoneResponse,
    status_code=status.HTTP_201_CREATED,
)
def add_milestone(
    case_id: str,
    request: MilestoneCreateRequest,
):
    """Add an expected milestone to a case."""

    result = accountability_service.add_milestone(
        case_id,
        request.dict(),
    )

    if result is None:
        raise HTTPException(status_code=404, detail="Case not found.")

    return result


@router.patch(
    "/cases/{case_id}/milestones/{milestone_id}",
    response_model=MilestoneResponse,
)
def update_milestone(
    case_id: str,
    milestone_id: str,
    request: MilestoneUpdateRequest,
):
    """Record progress or completion of a milestone."""

    result = accountability_service.update_milestone(
        case_id,
        milestone_id,
        request.dict(),
    )

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Case or milestone not found.",
        )

    return result


@router.post(
    "/cases/{case_id}/follow-ups",
    response_model=FollowUpResponse,
    status_code=status.HTTP_201_CREATED,
)
def add_follow_up(
    case_id: str,
    request: FollowUpCreateRequest,
):
    """Record a communication or follow-up attempt."""

    result = accountability_service.add_follow_up(
        case_id,
        request.dict(),
    )

    if result is None:
        raise HTTPException(status_code=404, detail="Case not found.")

    return result
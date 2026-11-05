# File: backend/app/modules/reporting_navigator/routes.py

from fastapi import APIRouter

from app.modules.reporting_navigator.schemas import (
    NavigatorRequest,
    NavigatorResponse
)

from app.modules.reporting_navigator.services import (
    ReportingNavigatorService
)


router = APIRouter(
    prefix="/reporting-navigator",
    tags=["Reporting Barrier Navigator"]
)

navigator_service = ReportingNavigatorService()


@router.post("/guidance", response_model=NavigatorResponse)
def get_reporting_guidance(request: NavigatorRequest):

    result = navigator_service.generate_guidance(
        concern_type=request.concern_type,
        barrier=request.barrier,
        preferred_outcome=request.preferred_outcome
    )

    return NavigatorResponse(**result)
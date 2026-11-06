# File: backend/app/modules/advocacy_network/routes.py

from fastapi import APIRouter, HTTPException

from app.modules.advocacy_network.schemas import (
    OrganisationMatchRequest,
    OrganisationMatchResponse,
    OrganisationResponse,
)
from app.modules.advocacy_network.services import AdvocacyNetworkService


router = APIRouter(
    prefix="/advocacy-network",
    tags=["Survivor Advocacy Network"],
)

advocacy_service = AdvocacyNetworkService()


@router.post(
    "/match",
    response_model=OrganisationMatchResponse,
)
def match_organisations(request: OrganisationMatchRequest):
    """Find organisations based on support needs and location."""

    return advocacy_service.match_organisations(
        support_types=request.support_types,
        city=request.city,
        state=request.state,
        include_other_locations=request.include_other_locations,
    )


@router.get(
    "/organisations",
    response_model=list[OrganisationResponse],
)
def get_all_organisations():
    """Return all organisations in the demo directory."""

    return advocacy_service.get_all_organisations()


@router.get(
    "/organisations/{organisation_id}",
    response_model=OrganisationResponse,
)
def get_organisation(organisation_id: str):
    """Return details of one organisation."""

    organisation = advocacy_service.get_organisation_by_id(
        organisation_id
    )

    if organisation is None:
        raise HTTPException(
            status_code=404,
            detail="Organisation not found.",
        )

    return organisation
# File: backend/app/modules/advocacy_network/services.py

from app.modules.advocacy_network.data import ORGANISATIONS


class AdvocacyNetworkService:
    """Finds organisations based on support needs and location."""

    def __init__(self):
        self.organisations = ORGANISATIONS

    def match_organisations(
        self,
        support_types: list[str],
        city: str | None = None,
        state: str | None = None,
        include_other_locations: bool = False,
    ) -> dict:

        city = city.strip() if city else None
        state = state.strip() if state else None

        city = city or None
        state = state or None

        matching_organisations = []

        for organisation in self.organisations:

            # Match requested support categories.
            if support_types:
                if not any(
                    service in organisation["services"]
                    for service in support_types
                ):
                    continue

            # Match the requested city or state.
            location_matches = True

            if city:
                location_matches = (
                    organisation["city"].casefold() == city.casefold()
                )

            if state:
                state_matches = (
                    organisation["state"].casefold() == state.casefold()
                )

                location_matches = location_matches and state_matches

            if not location_matches and not include_other_locations:
                continue

            matching_organisations.append(organisation)

        # Sort exact city matches first, then state matches.
        if city or state:
            matching_organisations.sort(
                key=lambda organisation: (
                    0 if city and organisation["city"].casefold() == city.casefold()
                    else 1,
                    0 if state and organisation["state"].casefold() == state.casefold()
                    else 1,
                )
            )

        return {
            "total_results": len(matching_organisations),
            "search_city": city,
            "search_state": state,
            "matched_support_types": support_types,
            "organisations": matching_organisations,
            "notice": (
                "These are fictional demonstration organisations. "
                "Their contact details and locations are not real. "
                "Do not use these entries to seek actual assistance."
            ),
        }

    def get_organisation_by_id(self, organisation_id: str) -> dict | None:
        """Find one organisation using its unique ID."""

        for organisation in self.organisations:
            if organisation["id"] == organisation_id:
                return organisation

        return None

    def get_all_organisations(self) -> list[dict]:
        """Return all organisations for the demo directory."""

        return self.organisations
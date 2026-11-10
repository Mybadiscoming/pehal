# File: backend/app/modules/accountability_tracker/services.py

from copy import deepcopy
from datetime import date
from uuid import uuid4

from app.modules.accountability_tracker.data import DEMO_CASES


def parse_date(value):
    """Convert stored ISO date strings into date objects."""
    if value is None or isinstance(value, date):
        return value

    return date.fromisoformat(value)


class AccountabilityService:

    def __init__(self):
        self.cases = deepcopy(DEMO_CASES)

    def _find_case(self, case_id: str):
        for case in self.cases:
            if case["id"] == case_id:
                return case
        return None

    def get_all_cases(self):
        return self.cases

    def create_case(self, details: dict):
        case = {
            "id": f"CASE-{uuid4().hex[:8].upper()}",
            **details,
            "created_at": date.today(),
            "milestones": [],
            "follow_ups": [],
        }

        self.cases.append(case)
        return case

    def get_case_details(self, case_id: str):
        case = self._find_case(case_id)

        if case is None:
            return None

        today = date.today()
        milestones = []

        for original in case["milestones"]:
            milestone = deepcopy(original)

            due_date = parse_date(milestone.get("due_date"))

            if (
                due_date
                and milestone["status"] != "completed"
                and due_date < today
            ):
                milestone["status"] = "overdue"

            milestone["due_date"] = due_date
            milestone["completed_date"] = parse_date(
                milestone.get("completed_date")
            )

            milestones.append(milestone)

        overdue_count = sum(
            1 for item in milestones
            if item["status"] == "overdue"
        )

        upcoming_dates = [
            item["due_date"]
            for item in milestones
            if item["due_date"]
            and item["status"] != "completed"
            and item["due_date"] >= today
        ]

        return {
            "case": case,
            "milestones": milestones,
            "follow_ups": case["follow_ups"],
            "overdue_milestones": overdue_count,
            "next_due_date": min(upcoming_dates) if upcoming_dates else None,
            "notice": (
                "This record is maintained by the user. "
                "It does not connect to or verify institutional systems. "
                "Dates and updates are based on information entered "
                "by the user and should be checked against original records."
            ),
        }

    def add_milestone(self, case_id: str, details: dict):
        case = self._find_case(case_id)

        if case is None:
            return None

        milestone = {
            "id": f"MILESTONE-{uuid4().hex[:8].upper()}",
            **details,
            "status": "pending",
            "completed_date": None,
            "update_note": None,
        }

        case["milestones"].append(milestone)
        return milestone

    def update_milestone(
        self,
        case_id: str,
        milestone_id: str,
        details: dict,
    ):
        case = self._find_case(case_id)

        if case is None:
            return None

        for milestone in case["milestones"]:
            if milestone["id"] == milestone_id:
                milestone.update(details)
                return milestone

        return None

    def add_follow_up(self, case_id: str, details: dict):
        case = self._find_case(case_id)

        if case is None:
            return None

        follow_up = {
            "id": f"FOLLOWUP-{uuid4().hex[:8].upper()}",
            **details,
        }

        case["follow_ups"].append(follow_up)
        return follow_up
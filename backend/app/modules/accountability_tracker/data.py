# File: backend/app/modules/accountability_tracker/data.py

"""
Synthetic demonstration records only.

These records are fictional and must never be represented
as real survivor cases or actual institutional performance.
"""

DEMO_CASES = [
    {
        "id": "CASE-DEMO-001",
        "title": "Workplace harassment complaint",
        "institution_name": "Example Institutional Committee",
        "complaint_date": "2026-10-01",
        "reference_number": "DEMO-REF-001",
        "current_status": "under_review",
        "description": "Synthetic case for demonstrating personal case tracking.",
        "created_at": "2026-10-01",
        "milestones": [
            {
                "id": "MILESTONE-001",
                "title": "Complaint submitted",
                "description": "Submission recorded by the survivor.",
                "due_date": None,
                "date_source": None,
                "status": "completed",
                "completed_date": "2026-10-01",
                "update_note": "Demo submission record.",
            },
            {
                "id": "MILESTONE-002",
                "title": "Acknowledgement received",
                "description": "Record the institution's acknowledgement.",
                "due_date": "2026-10-05",
                "date_source": "institution_promise",
                "status": "completed",
                "completed_date": "2026-10-04",
                "update_note": "Demo acknowledgement.",
            },
            {
                "id": "MILESTONE-003",
                "title": "Investigation update",
                "description": "An update was expected from the institution.",
                "due_date": "2026-10-20",
                "date_source": "institution_promise",
                "status": "overdue",
                "completed_date": None,
                "update_note": "No update recorded in this demo case.",
            },
        ],
        "follow_ups": [
            {
                "id": "FOLLOWUP-001",
                "contact_date": "2026-10-22",
                "contact_method": "email",
                "description": "A follow-up was sent requesting a status update.",
                "response_received": False,
                "response_summary": None,
            }
        ],
    }
]
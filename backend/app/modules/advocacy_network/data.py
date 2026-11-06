# File: backend/app/modules/advocacy_network/data.py

"""
Synthetic organisation dataset for the Survivor Advocacy Network MVP.

All entries are fictional demonstrations.
They are NOT real service providers and must not be used
to seek actual assistance.
"""

ORGANISATIONS = [
    {
        "id": "demo-001",
        "name": "Sakhi Legal Support Centre",
        "description": (
            "Demo organisation offering information about legal options "
            "and access to legal-aid services."
        ),
        "services": ["legal_aid", "legal_information"],
        "city": "Ambala",
        "state": "Haryana",
        "address": None,
        "phone": None,
        "email": None,
        "contact_hours": None,
        "latitude": 30.3782,
        "longitude": 76.7767,
        "verification_status": "demo",
        "is_demo": True,
        "source_url": None,
    },
    {
        "id": "demo-002",
        "name": "Udaan Counselling Collective",
        "description": (
            "Demo organisation representing emotional support "
            "and counselling services."
        ),
        "services": ["counselling", "emotional_support"],
        "city": "Chandigarh",
        "state": "Chandigarh",
        "address": None,
        "phone": None,
        "email": None,
        "contact_hours": None,
        "latitude": 30.7333,
        "longitude": 76.7794,
        "verification_status": "demo",
        "is_demo": True,
        "source_url": None,
    },
    {
        "id": "demo-003",
        "name": "Aashray Women's Support Network",
        "description": (
            "Demo organisation representing shelter referrals "
            "and practical support."
        ),
        "services": ["shelter", "emergency_support", "practical_support"],
        "city": "Delhi",
        "state": "Delhi",
        "address": None,
        "phone": None,
        "email": None,
        "contact_hours": None,
        "latitude": 28.6139,
        "longitude": 77.2090,
        "verification_status": "demo",
        "is_demo": True,
        "source_url": None,
    },
    {
        "id": "demo-004",
        "name": "Nayi Disha Workplace Advocacy",
        "description": (
            "Demo organisation representing workplace harassment "
            "guidance and employment-related advocacy."
        ),
        "services": ["workplace_advocacy", "legal_information"],
        "city": "Gurugram",
        "state": "Haryana",
        "address": None,
        "phone": None,
        "email": None,
        "contact_hours": None,
        "latitude": 28.4595,
        "longitude": 77.0266,
        "verification_status": "demo",
        "is_demo": True,
        "source_url": None,
    },
    {
        "id": "demo-005",
        "name": "Swasthya Support Initiative",
        "description": (
            "Demo organisation representing medical support "
            "and referrals to healthcare services."
        ),
        "services": ["medical_support", "healthcare_referral"],
        "city": "Panchkula",
        "state": "Haryana",
        "address": None,
        "phone": None,
        "email": None,
        "contact_hours": None,
        "latitude": 30.6942,
        "longitude": 76.8606,
        "verification_status": "demo",
        "is_demo": True,
        "source_url": None,
    },
]
# File: backend/app/modules/safe_space_companion/retrieval/knowledge_base.py

KNOWLEDGE_BASE = [

    {
        "id": "resource_001",
        "title": "Women Helpline 181",
        "category": "emotional_and_emergency_support",
        "content": (
            "Women Helpline 181 is a toll-free, 24-hour "
            "support service for women in distress. "
            "It provides information, emergency assistance "
            "and referrals to appropriate support services, "
            "including One Stop Centres."
        ),
        "contact": "181",
        "source": "Ministry of Women and Child Development",
        "source_url": "https://wcd.gov.in/women/help",
        "jurisdiction": "India"
    },

    {
        "id": "resource_002",
        "title": "One Stop Centres",
        "category": "professional_support",
        "content": (
            "One Stop Centres provide integrated support "
            "to women affected by violence. Available "
            "services can include medical assistance, "
            "legal aid, temporary shelter, police assistance "
            "and psychological counselling."
        ),
        "contact": None,
        "source": "Ministry of Women and Child Development",
        "source_url": (
            "https://wcd.gov.in/offerings/one-stop-centre-scheme"
        ),
        "jurisdiction": "India"
    },

    {
        "id": "resource_003",
        "title": "Emergency Response Support System",
        "category": "emergency_support",
        "content": (
            "112 is India's unified emergency response "
            "number. It can be contacted for emergency "
            "assistance, including police, health and "
            "other emergency services."
        ),
        "contact": "112",
        "source": "Ministry of Home Affairs",
        "source_url": (
            "https://www.mha.gov.in/emergency-response-support-system-erss"
        ),
        "jurisdiction": "India"
    }

]


def get_all_resources():
    """Return all available knowledge-base resources."""
    return KNOWLEDGE_BASE


def get_resource_by_id(resource_id: str):
    """Find a resource using its unique ID."""

    for resource in KNOWLEDGE_BASE:
        if resource["id"] == resource_id:
            return resource

    return None
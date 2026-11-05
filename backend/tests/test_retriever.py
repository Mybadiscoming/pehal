# File: backend/tests/test_retriever.py

from app.modules.safe_space_companion.retrieval.retriever import (
    retrieve_resources
)


def test_emergency_message_returns_112():
    results = retrieve_resources(
        "I am in danger and need emergency help"
    )

    assert any(
        resource["contact"] == "112"
        for resource in results
    )


def test_helpline_message_returns_181():
    results = retrieve_resources(
        "I need a helpline and someone to talk to"
    )

    assert any(
        resource["contact"] == "181"
        for resource in results
    )


def test_professional_support_returns_one_stop_centres():
    results = retrieve_resources(
        "I need legal aid and counselling"
    )

    assert any(
        resource["title"] == "One Stop Centres"
        for resource in results
    )


def test_unrelated_message_returns_no_resources():
    results = retrieve_resources(
        "What is the weather like today?"
    )

    assert results == []
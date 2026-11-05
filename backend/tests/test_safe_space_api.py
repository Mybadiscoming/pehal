# File: backend/tests/test_safe_space_api.py

from fastapi.testclient import TestClient

from app.main import app
from app.modules.safe_space_companion import routes


client = TestClient(app)


def test_chat_endpoint_returns_response(monkeypatch):
    def fake_generate_reply(session_id, message):
        routes.safe_space_service.conversation_manager.add_message(
            session_id, "user", message
        )

        reply = "I'm here to listen. You can share at your own pace."

        routes.safe_space_service.conversation_manager.add_message(
            session_id, "assistant", reply
        )

        return reply

    monkeypatch.setattr(
        routes.safe_space_service,
        "generate_reply",
        fake_generate_reply
    )

    response = client.post(
        "/safe-space/chat",
        json={
            "session_id": "test-session",
            "message": "I would like someone to talk to."
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert data["session_id"] == "test-session"
    assert "listen" in data["reply"]
    assert len(data["conversation_history"]) == 2


def test_chat_endpoint_rejects_empty_message():
    response = client.post(
        "/safe-space/chat",
        json={
            "session_id": "test-session",
            "message": ""
        }
    )

    assert response.status_code == 422


def test_chat_endpoint_rejects_missing_session_id():
    response = client.post(
        "/safe-space/chat",
        json={
            "message": "Hello"
        }
    )

    assert response.status_code == 422
"""
Custom DRF exception handlers for user-friendly error messages.
Fixes P1: "Given token not valid for any token type" → "Session expired. Please log in again."
"""
from rest_framework.views import exception_handler
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError


def custom_exception_handler(exc, context):
    """Transform JWT/token errors into a user-friendly message."""
    response = exception_handler(exc, context)
    if response is None:
        return None

    # Replace cryptic token errors (InvalidToken, TokenError) with a clear message
    if isinstance(exc, (InvalidToken, TokenError)):
        response.data = {
            "detail": "Session expired. Please log in again.",
            "code": "token_expired",
        }
        return response

    # Also catch 401 responses with the raw JWT message in detail
    if response.status_code == 401 and isinstance(response.data, dict):
        detail = response.data.get("detail")
        if detail and isinstance(detail, str):
            lower = detail.lower()
            if "token" in lower and ("valid" in lower or "expired" in lower or "invalid" in lower):
                response.data = {
                    "detail": "Session expired. Please log in again.",
                    "code": "token_expired",
                }

    return response

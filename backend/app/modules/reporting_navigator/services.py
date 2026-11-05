# File: backend/app/modules/reporting_navigator/services.py

from app.modules.reporting_navigator.pathways import (
    PATHWAYS,
    BARRIER_GUIDANCE,
    FOLLOW_UP_QUESTIONS
)


class ReportingNavigatorService:

    def generate_guidance(
        self,
        concern_type: str,
        barrier: str,
        preferred_outcome: str = "understand_options"
    ) -> dict:

        # 1. Retrieve the selected concern pathway
        if concern_type not in PATHWAYS:
            concern_type = "other"

        pathway = PATHWAYS[concern_type]

        # 2. Retrieve guidance for the selected barrier
        if barrier not in BARRIER_GUIDANCE:
            barrier = "unsure"

        barrier_guidance = BARRIER_GUIDANCE[barrier]

        # 3. Retrieve a relevant follow-up question
        concern_questions = FOLLOW_UP_QUESTIONS.get(
            concern_type,
            FOLLOW_UP_QUESTIONS["other"]
        )

        follow_up_question = concern_questions.get(
            barrier,
            concern_questions["unsure"]
        )

        # 4. Select possible options
        possible_options = pathway["options"]

        # 5. Suggest next steps based on the user's preference
        if preferred_outcome == "find_support_without_reporting":

            next_steps = [
                "Explore relevant support organisations.",
                "Consider speaking with an independent support professional.",
                "Learn about available emotional, practical or legal assistance."
            ]

        elif preferred_outcome == "prepare_to_report":

            next_steps = [
                "Understand the reporting procedure relevant to your concern.",
                "Identify the appropriate person or organisation to approach.",
                "Ask about privacy and possible protections.",
                "Find out what information or documentation may be required.",
                "Consider independent professional or legal guidance."
            ]

        else:

            next_steps = [
                "Explore the options available for your concern.",
                "Understand what each option involves.",
                "Consider which form of support would be most useful.",
                "Identify a practical next step based on your circumstances."
            ]

        # 6. Combine the concern and barrier guidance
        guidance = (
            f"{pathway['guidance']}\n\n"
            f"{barrier_guidance}"
        )

        # 7. Return the structured API response
        return {
            "concern_type": concern_type,
            "barrier": barrier,
            "guidance": guidance,
            "possible_options": possible_options,
            "suggested_next_steps": next_steps,

            "support_note": (
                "You can explore the available options and decide "
                "what works for your circumstances. This information "
                "does not commit you to any particular course of action."
            ),

            "disclaimer": (
                "This tool provides general informational guidance, "
                "not legal advice. Laws, procedures and available "
                "services may vary by location and circumstances. "
                "Consult a qualified professional for advice about "
                "your specific situation."
            ),

            "follow_up_question": follow_up_question
        }
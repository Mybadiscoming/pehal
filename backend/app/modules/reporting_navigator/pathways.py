# File: backend/app/modules/reporting_navigator/pathways.py

PATHWAYS = {

    "workplace_harassment": {
        "title": "Workplace Harassment",

        "guidance": (
            "Experiencing harassment at work can be particularly "
            "difficult when your career, financial stability and "
            "professional relationships are involved. It can be "
            "hard to know how to speak up or what might happen next. "
            "Understanding your options can help you approach the "
            "situation with greater clarity and support."
        ),

        "options": [
            "Understand how workplace complaints are handled.",
            "Learn about the Internal Committee under the POSH Act, 2013, where applicable.",
            "Explore the Local Committee route where applicable.",
            "Understand what protections may be available.",
            "Explore independent support or legal guidance."
        ]
    },

    "domestic_violence": {
        "title": "Domestic Violence",

        "guidance": (
            "When the person causing harm is someone close to you, "
            "deciding what to do can become complicated. Concerns "
            "about family, finances, children, living arrangements "
            "or personal safety can all play a part. Understanding "
            "the support available can help you consider your next "
            "steps without having to figure everything out alone."
        ),

        "options": [
            "Explore support through a One Stop Centre.",
            "Learn about the Protection of Women from Domestic Violence Act, 2005.",
            "Explore legal aid and professional support.",
            "Understand available safety and accommodation assistance.",
            "Learn about possible support and reporting procedures."
        ]
    },

    "sexual_violence": {
        "title": "Sexual Violence",

        "guidance": (
            "After experiencing sexual violence, questions about "
            "safety, health, privacy and reporting can feel difficult "
            "to navigate. You may be unsure whom to approach or "
            "what happens after seeking help. You deserve to be "
            "treated with dignity, and you can explore the available "
            "support and procedures at your own pace."
        ),

        "options": [
            "Explore medical assistance.",
            "Find professional emotional support.",
            "Learn about available legal assistance.",
            "Understand possible reporting procedures.",
            "Explore organisations that support survivors."
        ]
    },

    "cyber_harassment": {
        "title": "Cyber Harassment",

        "guidance": (
            "Online harassment can make it difficult to feel secure, "
            "especially when messages, images or personal information "
            "are being misused. You may be wondering how to stop the "
            "harassment, protect your privacy or get the behaviour "
            "addressed. There are several ways to seek support and "
            "respond to what is happening."
        ),

        "options": [
            "Explore blocking and reporting tools on the platform.",
            "Consider preserving relevant evidence securely.",
            "Learn about the National Cyber Crime Reporting Portal.",
            "Review account privacy and security settings.",
            "Explore legal or professional support."
        ]
    },

    "other": {
        "title": "Other Concerns",

        "guidance": (
            "Sometimes a difficult experience does not fit neatly "
            "into a particular category. You may be unsure whether "
            "it is something you can report, whom you can approach "
            "or what kind of support is available. We can start by "
            "understanding your concern and exploring the options "
            "that may be relevant."
        ),

        "options": [
            "Explore general support services.",
            "Find an organisation that understands your concern.",
            "Explore independent professional guidance.",
            "Understand possible reporting options."
        ]
    }
}


BARRIER_GUIDANCE = {

    "fear_of_retaliation": (
        "Fear of retaliation is a real concern, particularly when "
        "your job, relationships or personal safety could be affected. "
        "It can be difficult to consider reporting when you are unsure "
        "how others might respond. Understanding the reporting process, "
        "possible protections and independent support options may help "
        "you assess the situation more clearly."
    ),

    "family_pressure": (
        "Family pressure can make an already difficult situation "
        "harder to navigate, especially when others expect you to "
        "make a particular decision. It may help to understand "
        "your options independently and identify support that "
        "respects your circumstances and choices."
    ),

    "lack_of_information": (
        "Not knowing where to begin can make the entire process "
        "feel confusing. You might have questions about whom to "
        "approach, what information is needed or what happens "
        "after a complaint. We can break these questions down "
        "and explore them one at a time."
    ),

    "privacy_concerns": (
        "Sharing personal experiences can feel difficult when "
        "you are unsure who will have access to that information. "
        "Before approaching an organisation, you can ask how "
        "it handles personal details, records and confidentiality. "
        "This can help you make a more informed decision about "
        "where to seek support."
    ),

    "financial_dependence": (
        "Financial dependence can make seeking help more complicated, "
        "particularly when your income, housing or daily needs depend "
        "on the situation. Exploring legal aid, financial assistance "
        "and available support services may help you understand "
        "what practical options exist."
    ),

    "emotional_distress": (
        "When an experience has been emotionally overwhelming, "
        "even understanding the available options can feel like "
        "a lot. It may help to start with the one question or "
        "decision that feels most important to you right now."
    ),

    "unsure": (
        "It is common to have questions before deciding what to do. "
        "You might not know whether to report, whom to approach "
        "or what the process involves. Understanding these options "
        "can be a useful starting point."
    )
}


FOLLOW_UP_QUESTIONS = {

    "workplace_harassment": {
        "fear_of_retaliation": (
            "What concerns you most about possible retaliation: "
            "your job, your professional relationships or your "
            "personal safety?"
        ),
        "family_pressure": (
            "Are you mainly concerned about how your family might "
            "react, or about how their response could affect your "
            "decision?"
        ),
        "lack_of_information": (
            "Would you like to understand whom to approach at work "
            "or what the complaint process involves?"
        ),
        "privacy_concerns": (
            "Are you more concerned about who might see your complaint "
            "or how your information will be handled?"
        ),
        "financial_dependence": (
            "Is your main concern how raising the issue could affect "
            "your income or job security?"
        ),
        "emotional_distress": (
            "Would it help to understand the available options first, "
            "or focus on finding support?"
        ),
        "unsure": (
            "Would you like to begin with understanding the reporting "
            "process or exploring support options?"
        )
    },

    "domestic_violence": {
        "fear_of_retaliation": (
            "Are you most concerned about your immediate safety, "
            "the other person's reaction or what might happen "
            "if you seek help?"
        ),
        "family_pressure": (
            "Are family members influencing what you feel able "
            "to do, or are you worried about their reaction?"
        ),
        "lack_of_information": (
            "Would you like to understand available support services "
            "or the legal options first?"
        ),
        "privacy_concerns": (
            "Are you concerned about someone finding out that "
            "you have approached a support service?"
        ),
        "financial_dependence": (
            "Would information about financial assistance, legal aid "
            "or accommodation support be most useful?"
        ),
        "emotional_distress": (
            "Would you prefer to begin by exploring support "
            "or understanding your practical options?"
        ),
        "unsure": (
            "Would you like to explore available support services "
            "or understand your options first?"
        )
    },

    "sexual_violence": {
        "fear_of_retaliation": (
            "Are you concerned about the person responsible finding "
            "out that you have sought help, or about how others "
            "might respond?"
        ),
        "family_pressure": (
            "Are you worried about how your family might react "
            "if you seek support or consider reporting?"
        ),
        "lack_of_information": (
            "Would you like to understand medical support, "
            "emotional support or reporting procedures first?"
        ),
        "privacy_concerns": (
            "Would knowing how support organisations handle "
            "personal information help you decide where to turn?"
        ),
        "financial_dependence": (
            "Would information about free or affordable support "
            "services be helpful?"
        ),
        "emotional_distress": (
            "Would you prefer to explore emotional support first "
            "or understand the practical options available?"
        ),
        "unsure": (
            "What would be most useful right now: understanding "
            "your support options or learning about reporting?"
        )
    },

    "cyber_harassment": {
        "fear_of_retaliation": (
            "Are you worried that the person might contact you "
            "again, expose more information or escalate the harassment?"
        ),
        "family_pressure": (
            "Are you concerned about how people close to you "
            "might react if they learn about the online harassment?"
        ),
        "lack_of_information": (
            "Would you like to understand platform reporting, "
            "evidence preservation or formal cybercrime reporting?"
        ),
        "privacy_concerns": (
            "Are you mainly worried about your personal information "
            "being exposed further or about sharing details while "
            "seeking help?"
        ),
        "financial_dependence": (
            "Is the harassment affecting your work, income or "
            "access to important online accounts?"
        ),
        "emotional_distress": (
            "Would practical steps to secure your accounts or "
            "information about support be more useful right now?"
        ),
        "unsure": (
            "Would you like to begin with securing your accounts "
            "or understanding how online harassment can be reported?"
        )
    },

    "other": {
        "fear_of_retaliation": (
            "What possible consequence worries you most about "
            "speaking up or seeking support?"
        ),
        "family_pressure": (
            "Would you like to explore independent support options "
            "that can help you understand your choices?"
        ),
        "lack_of_information": (
            "What would you most like clarity about: whom to approach, "
            "what support exists or what happens next?"
        ),
        "privacy_concerns": (
            "Would understanding how support services handle "
            "personal information help?"
        ),
        "financial_dependence": (
            "Would exploring practical or financial support options "
            "be a useful starting point?"
        ),
        "emotional_distress": (
            "Would it help to start with support options or "
            "understanding the situation more clearly?"
        ),
        "unsure": (
            "What is the biggest question you would like help "
            "answering right now?"
        )
    }
}
import google.generativeai as genai
import json
import re
from flask import Flask, request, jsonify
from flask_cors import CORS

# ---------------------------
# GOOGLE GEMINI SETUP
# ---------------------------
genai.configure(api_key="AIzaSyBOjfzPB10TqQyoWQp1eP0pxEJrGiJbQag")

model = genai.GenerativeModel("gemini-2.0-flash")

# ---------------------------
# VOICEFLOW LOGIC PROMPT
# ---------------------------
BASE_PROMPT = """
1. Create an Account

Steps the AI performs (with examples):

Ask for details → “May I have your name and mobile number?”

Send OTP → “I’ve sent an OTP to verify your identity.”

Collect minimal KYC → “Please share last 4 digits of Aadhaar for verification.”

Confirm → “Your digital account is now created. Your customer ID is 451302.”

2. Help With yourbank.com Login

Direct them → “Go to yourbank.com and tap ‘Login’.”

Reset password → “I can send a reset link to your registered email.”

Confirm → “Your login is active. You can now access your dashboard.”

3. Open a Fixed Deposit (FD)
Then call the Google Sheets “Add to Sheet” integration and collect:
Initial Deposit Amount, Occupation, Monthly Income, Nominee Name, Nominee Relation, FD Start Date

4. Break/Close an FD

Check penalty → “If you close today, you’ll get ₹20,840 instead of ₹21,300.”

Confirm → “Would you still like to proceed?”

Execute → “FD closed. Amount credited to your savings account.”

5. Transfer Money

Ask details → “Whom do you want to send money to?”

Confirm amount → “₹5,000 to Aditi Sharma?”

OTP → “Please confirm with the OTP I sent.”

Done → “Transfer successful.”

6. Check Balance

→ “Your savings account balance is ₹12,540.”

7. Apply for a Debit/Credit Card

Ask purpose → “Is this for online payments or travel?”

Eligibility → “You’re eligible for our Platinum Debit Card.”

Submit → “Your card will arrive in 5–7 days.”

8. Block/Replace a Lost Card

→ “Card ending 3321 is now blocked. A replacement will reach you in 3 days.”

9. Apply for a Loan

Ask income → “What’s your monthly income?”

Eligibility → “You qualify for a ₹1.2 lakh personal loan.”

Upload docs → “I’ll send you a link to upload your PAN and salary slip.”

Status → “Your application is under review.”

10. Explain a Rejected Loan

→ “Your loan was declined because your income-to-EMI ratio is higher than 40%. Reducing EMIs can improve approval chances.”

11. Fraud Alert Handling

→ “We detected a ₹3,450 purchase in Bangalore. Was this you?”
→ If no → “I’m blocking your card and raising a dispute immediately.”

12. Manage Data Permissions

→ “I’ve stopped using your SMS data for credit scoring.”
→ “Your transaction history is now only used for fraud protection.”

13. “Explain My Profile”

→ “Based on your spending, you’re categorized as a low-risk customer.”
→ “Would you like to correct your occupation information?”
Whenever you update an internal variable, respond with a short system message:

Call the “GS API”

[Evaluating] variable_name: old_value → new_value

Always respond in valid JSON ONLY:

{
  "intent": "",
  "workflow_step": "",
  "assistant_message": "",
  "action": "",
  "system_updates": [],
  "support": "For support call +1 (863) 281-4984"
}

INTENTS:
- create_account
- login_help
- open_fd
- break_fd
- transfer_money
- check_balance
- apply_card
- block_card
- apply_loan
- explain_rejected_loan
- fraud_alert
- manage_permissions
- explain_profile
- generic_query

RULES:
- Always give next step message.
- If user data changes → add to system_updates: "[Evaluating] name: old → new"
- If FD creation → action = "call_google_sheet"
- Otherwise → action = "none"
- Never use parentheses.
- Keep messages conversational.

User Message:
"""

# ---------------------------
# GENERATE RESPONSE
# ---------------------------
def run_assistant(user_message: str):
    prompt = BASE_PROMPT + user_message

    response = model.generate_content(prompt)
    raw = response.text.strip()

    # extract JSON reliably
    json_obj = extract_json(raw)
    return json_obj


def extract_json(raw_text: str):
    """Safely extract JSON even if model adds extra text."""
    try:
        return json.loads(raw_text)
    except:
        match = re.search(r"\{.*\}", raw_text, re.DOTALL)
        if match:
            try:
                return json.loads(match.group(0))
            except:
                pass

    return {
        "intent": "generic_query",
        "workflow_step": "unknown",
        "assistant_message": raw_text,
        "action": "none",
        "system_updates": [],
        "support": "For support call +1 (863) 281-4984"
    }


# ---------------------------
# FLASK API
# ---------------------------
app = Flask(__name__)
CORS(app)


@app.route("/explain", methods=["POST"])
def explain():
    data = request.get_json()
    query = data.get("query", "")

    result = run_assistant(query)
    return jsonify(result)


if __name__ == "__main__":
    print("YourBank Voiceflow AI running at http://127.0.0.1:5000")
    app.run(port=5000, debug=True)

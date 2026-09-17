# AWS Bedrock AgentCore — HR Assistant Lab

## Overview

Built a serverless HR Assistant using **Amazon Bedrock AgentCore** with RAG (Retrieval-Augmented Generation), Lambda actions, and DynamoDB persistence. The assistant handles HR policy queries and proc[...]

---

## Architecture

<img src="Screenshots/1.%20Architecture.png" alt="Architecture Diagram" width="70%">

**Components:**

| Component | Role |
|---|---|
| Web Application (Streamlit) | User-facing chat UI |
| Bedrock AgentCore Runtime | Agent execution engine |
| Bedrock AgentCore Gateway (MCP) | Exposes tools via MCP protocol |
| Knowledge Base (`hr-knowledge-base`) | RAG over employee handbook (S3-backed) |
| Lambda — `submit_leave` | Writes leave requests to DynamoDB |
| Lambda — `submit_benefits` | Writes benefits claims to DynamoDB |
| DynamoDB — `VacationTable` | Stores leave records |
| DynamoDB — `BenefitsTable` | Stores benefits claim records |
| S3 — agentcore-source | Hosts system prompt and agent resources |

---

## Lab Goals

1. Add a Gateway target named **submitBenefits**
2. Submit a benefits claim through the chat application
3. Verify the claim in the DynamoDB **BenefitsTable**

---

## Steps

### 1. System Prompt (S3)

The agent's system prompt was stored in S3 and defines two tool categories:

- **Retrieval tools** — search the employee handbook KB for policy questions
- **Action tools** — record leave requests or benefits claims in the HR system

Key guidelines in the prompt:
- Always use a retrieval tool before answering policy questions
- Gather all required parameters before calling an action tool
- Never invent policy content; direct to HR if no relevant content is found

<img src="Screenshots/2.%20Main%20system%20prompt%20found%20in%20S3.png" alt="System Prompt" width="70%">

---

### 2. Employee Compensation Handbook (KB Source)

The S3 knowledge base data source contained the employee handbook, including compensation and benefits content:

- Salary: semi-monthly payroll, merit increases, performance bonuses
- Health: medical (80% premium covered), dental/vision, HSA with matching
- Retirement: 401(k) with 6% company match, immediate vesting
- Additional: life/disability insurance, $2,000 professional development allowance, gym reimbursement, remote work stipend

<img src="Screenshots/3.%20Review%20of%20employee%20compensation%20handbook.png" alt="Handbook" width="70%">

---

### 3. Knowledge Base Creation

Created the `hr-knowledge-base` in Bedrock with:

- **Embeddings model:** Managed
- **Embeddings type:** Float
- **Data source:** `hr-data-source` (S3)
- **Status:** Available

Syncing the data source was initiated immediately after creation.

<img src="Screenshots/4.%20Creation%20of%20a%20managed%20knowledge%20base%20with%20an%20s3%20data%20source.png" alt="Knowledge Base" width="70%">

---

### 4. Gateway Target — hrKnowledgeBase

Added `hrKnowledgeBase` as the first target in the **hr-assistant-gateway** to expose the KB as a retrieval tool via MCP.

<img src="Screenshots/5.%20Target%20creation.png" alt="KB Target" width="70%">

**Gateway details:**

| Field | Value |
|---|---|
| Name | hr-assistant-gateway-c3bf9890 |
| Gateway URL | `https://hr-assistant-gateway-c3bf9890-ahvqjjgd7a.gateway.bedrock-agentcore.us-east-1.amazonaws.com/mcp` |
| IAM Role | AgentCoreGatewayRole_c3bf9890 |

---

### 5. Application URL (CloudFormation)

Retrieved the Streamlit chat UI URL from CloudFormation stack outputs.

- **Stack:** CREATE_COMPLETE
- **ApplicationUrl:** Streamlit chat UI hosted on an ELB endpoint

<img src="Screenshots/6.%20Application%20URL%20from%20cloudformation.png" alt="CloudFormation Output" width="70%">

---

### 6. HR Assistant — RAG Query Test

Queried the assistant via the chat UI:

> *"How many vacation days do I get as a new hire?"*

**Response:** 15 days of vacation annually, per the vacation accrual schedule in the employee handbook (Time Off & Leave Policies section).

Confirms the knowledge base retrieval tool is working correctly.

<img src="Screenshots/7.%20HR%20Assistant%20response.png" alt="HR Assistant Response" width="70%">

---

### 7. Gateway Target — submitLeave

Added `submitLeave` as a second target in the gateway, pointing to the `submit_leave` Lambda function ARN.

<img src="Screenshots/8.%20Submit%20Leave%20target%20created%20with%20Lambda%20ARN.png" alt="submitLeave Target" width="70%">

---

### 8. Leave Request — End-to-End Test

Submitted a leave request through the chat UI:

> *"Submit a leave request for John Smith, starting 2026-07-15 and ending 2026-07-18."*

**Response:** Leave request submitted successfully.

<img src="Screenshots/9.%20Submit%20Leave%20Test%20with%20HR%20Assistant.png" alt="Leave Submission" width="70%">

---

### 9. DynamoDB Verification — VacationTable

Scanned the `VacationTable` in DynamoDB to confirm the record was written.

| employee_name | startDate | endDate |
|---|---|---|
| John Smith | 2026-07-15 | 2026-07-18 |

Items returned: 1 · Efficiency: 100%

<img src="Screenshots/10.%20Confirmed%20leave%20request%20received%20through%20DynamDB.png" alt="DynamoDB Leave Record" width="70%">

---

### 10. Benefits Claim — submitBenefits Target + End-to-End Test

Added `submitBenefits` as a third gateway target (Lambda ARN for `submit_benefits`).

Submitted a benefits claim through the chat UI with an incomplete request first — the agent correctly identified the missing `claim_amount` parameter and prompted for it before proceeding.

**Conversation flow:**

1. User: *"Submit a benefit request for Jane Austin, dental, starting on 19-09 and ending on 21-09"*
2. Agent *(thinking)*: claim amount missing — ask for it
3. Agent: *"Please provide the claim amount for Jane Austin's dental benefit request."*
4. User: `$150`
5. Agent *(thinking)*: amount provided but context unclear — confirm it's for the benefits claim
6. User: *"Submit a $150 benefit request for Jane Austin, dental, starting on 19-09 and ending on 21-09"*
7. Agent: *"The benefits claim for Jane Austin, dental, in the amount of $150, has been submitted successfully."*

<img src="Screenshots/11.%20Submit%20benefit%20request%20with%20errors%20if%20the%20parameters%20are%20not%20followed.png" alt="Benefits Submission" width="70%">

---

### 11. DynamoDB Verification — BenefitsTable

Scanned the `BenefitsTable` in DynamoDB to confirm the record was written.

| employee_name | benefit_type | claim_amount |
|---|---|---|
| Jane Austin | dental | 150 |

Items returned: 1 · Efficiency: 100%

<img src="Screenshots/12.%20Verified%20claim%20with%20DynamoDB.png" alt="DynamoDB Benefits Record" width="70%">

---

## Key Services Used

- Amazon Bedrock AgentCore (Runtime + Gateway/MCP)
- Amazon Bedrock Knowledge Bases
- AWS Lambda
- Amazon DynamoDB
- Amazon S3
- AWS CloudFormation
- Streamlit (chat UI)

---

## Outcome

All three lab goals completed:

- [x] Gateway target `submitBenefits` created
- [x] Benefits claim submitted via chat UI (agent prompted for missing parameters)
- [x] Claim verified in DynamoDB `BenefitsTable`

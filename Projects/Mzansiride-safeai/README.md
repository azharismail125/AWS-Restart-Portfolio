![MzansiRide SafeAI](https://img.shields.io/badge/MzansiRide%20SafeAI-brightgreen?style=for-the-badge)

**A safety-first, AI-powered ride-sharing prototype built for South Africa**

Hackathon Theme: AI for Real-World Impact | Built on AWS | 24-hour prototype

🔗 **Live Demo:** [main.d2hm6o3xegp9tf.amplifyapp.com](https://main.d2hm6o3xegp9tf.amplifyapp.com)

---

<a id="the-problem"></a>
![The Problem](https://img.shields.io/badge/The%20Problem-orange?style=for-the-badge)

Using transport in South Africa comes with real concerns. Women and vulnerable passengers worry about unexpected route changes, prolonged stops, travelling with unfamiliar drivers, and whether anyone will know if something goes wrong.

There are apps that address parts of this. Not many that bring journey monitoring, passenger check-ins, and AI-assisted safety guidance into a single workflow, especially not in a South African context.

<a id="what-we-built"></a>
![What We Built](https://img.shields.io/badge/What%20We%20Built-orange?style=for-the-badge)

MzansiRide SafeAI is a responsive web app that walks a passenger through an end-to-end simulated journey, from booking to safety event handling. It uses predefined backend rules to detect unusual events and Amazon Bedrock to explain safety alerts in plain language.

A basic fare comparison between individual and shared rides is also included.

This is a prototype. It uses simulated data throughout and focuses on demonstrating the core safety workflow rather than replicating a full commercial ride-hailing service.

---

![Table of Contents](https://img.shields.io/badge/Table%20of%20Contents-brightgreen?style=for-the-badge)
- [The Problem](#the-problem)
- [What We Built](#what-we-built)
- [Core Features](#core-features)
- [AWS Architecture](#aws-architecture)
  - [Services Used](#services-used)
  - [How It Works](#how-it-works)
- [AWS Setup](#aws-setup)
  - [Lambda: getAlertStatus](#lambda-getalertstatus)
  - [Lambda: processRideRequest](#lambda-processriderequest)
  - [Lambda: triggerSafetyEvent](#lambda-triggersafetyevent)
  - [API Gateway](#api-gateway)
  - [Amazon SNS](#amazon-sns)
  - [Amazon DynamoDB](#amazon-dynamodb)
  - [Amazon Cognito](#amazon-cognito)
  - [AWS Amplify](#aws-amplify)
- [App Walkthrough](#app-walkthrough)
  - [Home Screen](#home-screen)
  - [Fare Estimate](#fare-estimate)
  - [Trip in Progress](#trip-in-progress)
  - [Safety Alert](#safety-alert)
  - [Safety Dashboard](#safety-dashboard)
- [Tech Stack](#tech-stack)
- [Out of Scope](#out-of-scope)
- [Privacy and Security](#privacy-and-security)

---

<a id="core-features"></a>
![Core Features](https://img.shields.io/badge/Core%20Features-orange?style=for-the-badge)

| Feature | Description |
|---|---|
| Passenger booking | Enter pickup and destination, request a simulated ride |
| Driver details | Sample driver info, vehicle, plate number, and rating |
| Safe Journey Mode | Activates the safety monitoring screen for the active trip |
| Safety event detection | Two predefined scenarios: prolonged stop and route deviation |
| AI Safety Assistant | Amazon Bedrock explains the alert and outlines the passenger's options |
| Trusted contact notification | Simulated workflow to notify a saved contact when an event is detected |
| Safety Alert Dashboard | View trip history, detected events, and check-in responses |
| Fare comparison | Individual versus shared ride cost breakdown |

---

<a id="aws-architecture"></a>
![AWS Architecture](https://img.shields.io/badge/AWS%20Architecture-brightgreen?style=for-the-badge)

<a id="services-used"></a>
![Services Used](https://img.shields.io/badge/Services%20Used-orange?style=for-the-badge)

| AWS Service | Role in the Prototype |
|---|---|
| Amazon API Gateway | Exposes the API endpoints the frontend calls |
| Amazon IAM | Creation of a specific user to build and deploy the app |
| AWS Lambda | Handles ride processing, safety rule logic, and alert workflows |
| Amazon Bedrock | Generates plain-language safety explanations for the passenger |
| Amazon DynamoDB | Stores trip and alert records |
| Amazon SNS | Powers the trusted contact notification workflow |
| Amazon Cognito | User authentication (implemented, optional for the demo) |
| AWS Amplify | Hosts and deploys the frontend |
| Amazon CloudWatch | Captures backend logs for monitoring and troubleshooting |

<a id="how-it-works"></a>
![How It Works](https://img.shields.io/badge/How%20It%20Works-orange?style=for-the-badge)

1. The passenger opens the app and requests a simulated ride
2. The frontend sends the request to Amazon API Gateway
3. AWS Lambda processes the request and applies the predefined safety rules
4. When a safety event fires, Lambda records it and prepares a response payload
5. Lambda invokes Amazon Bedrock to generate a plain-language explanation for the passenger
6. The trip and alert records are written to DynamoDB
7. The app displays the alert, the check-in prompt, and the Bedrock-generated guidance
8. Amazon SNS handles the trusted contact notification step
9. CloudWatch captures logs throughout for troubleshooting

No privileged AWS credentials are placed in the frontend code. Backend operations go through appropriately secured AWS services.

---

<a id="aws-setup"></a>
![AWS Setup](https://img.shields.io/badge/AWS%20Setup-brightgreen?style=for-the-badge)

<a id="lambda-getalertstatus"></a>
![Lambda: getAlertStatus](https://img.shields.io/badge/Lambda%3A%20getAlertStatus-orange?style=for-the-badge)

Retrieves the current alert status for a trip. The test result shows a 200 response with CORS headers confirming the function is working correctly.

<img src="./Screenshots/1%20Lambda%20AlertStatus%20and%20Test.png" alt="Lambda getAlertStatus with successful test" width="80%" />

---

<a id="lambda-processriderequest"></a>
![Lambda: processRideRequest](https://img.shields.io/badge/Lambda%3A%20processRideRequest-orange?style=for-the-badge)

Triggered via API Gateway. Takes the passenger's booking details, processes the request, and applies the safety monitoring logic.

<img src="./Screenshots/2%20Lambda%20Process%20Ride%20with%20Test.png" alt="Lambda processRideRequest with API Gateway trigger and successful test" width="80%" />

---

<a id="lambda-triggersafetyevent"></a>
![Lambda: triggerSafetyEvent](https://img.shields.io/badge/Lambda%3A%20triggerSafetyEvent-orange?style=for-the-badge)

Connected to Amazon SNS. Fires when a predefined safety event is detected during a simulated trip, such as a prolonged stop or a route deviation.

<img src="./Screenshots/3%20Lambda%20Safety%20With%20Test.png" alt="Lambda triggerSafetyEvent with SNS trigger and successful test" width="80%" />

---

<a id="api-gateway"></a>
![API Gateway](https://img.shields.io/badge/API%20Gateway-orange?style=for-the-badge)

Three routes are configured: `POST /ride/request`, `POST /safety-event`, and `GET /status`. All three use Lambda proxy integration, which means API Gateway passes the full request directly to Lambda and returns the function's response to the frontend.

<img src="./Screenshots/4%20API%20Gateway%20Setup.png" alt="API Gateway resource and method configuration" width="80%" />

---

<a id="amazon-sns"></a>
![Amazon SNS](https://img.shields.io/badge/Amazon%20SNS-orange?style=for-the-badge)

The `SafeRideAlerts` topic has a confirmed email subscription. This is the channel used to notify a trusted contact when the passenger triggers a notification from the alert screen.

<img src="./Screenshots/5%20SNS%20Confirmation.png" alt="SNS SafeRideAlerts topic with confirmed email subscription" width="80%" />

---

<a id="amazon-dynamodb"></a>
![Amazon DynamoDB](https://img.shields.io/badge/Amazon%20DynamoDB-orange?style=for-the-badge)

The `SafeRideTrips` table stores trip records. Each item uses `tripId` as the partition key and includes fields like `driver` and `status` to track the trip and any safety events recorded against it.

<img src="./Screenshots/6%20DynamoDB%20Setup.png" alt="DynamoDB SafeRideTrips table with sample trip item" width="80%" />

---

<a id="amazon-cognito"></a>
![Amazon Cognito](https://img.shields.io/badge/Amazon%20Cognito-orange?style=for-the-badge)

A user pool is configured and available for authentication. For the hackathon demo, login is optional and the app can be accessed without it.

<img src="./Screenshots/7%20Cognito%20Setup.png" alt="Amazon Cognito user pool overview" width="80%" />

---

<a id="aws-amplify"></a>
![AWS Amplify](https://img.shields.io/badge/AWS%20Amplify-orange?style=for-the-badge)

The frontend is deployed from the `main` branch and is live. Amplify handles the build and hosting automatically on each commit.

<img src="./Screenshots/8%20Amplify%20Setup%20and%20Deployment.png" alt="AWS Amplify deployment overview showing deployed main branch" width="80%" />

---

<a id="app-walkthrough"></a>
![App Walkthrough](https://img.shields.io/badge/App%20Walkthrough-brightgreen?style=for-the-badge)

<a id="home-screen"></a>
![Home Screen](https://img.shields.io/badge/Home%20Screen-orange?style=for-the-badge)

The passenger enters a pickup location and destination to request a ride. The placeholder examples use real South African locations, Sandton City and Soweto, to keep the demo grounded.

<img src="./Screenshots/9%20Simulation%20Home.png" alt="MzansiRide SafeAI home screen with booking fields" width="80%" />

---

<a id="fare-estimate"></a>
![Fare Estimate](https://img.shields.io/badge/Fare%20Estimate-orange?style=for-the-badge)

After submitting the request, the app returns an estimated individual fare of R85 and a shared ride option at R43. The shared option saves 50% on the same trip. The passenger can confirm and continue to the trip screen.

<img src="./Screenshots/10%20Simulation%20Cost.png" alt="Fare estimate screen showing R85 individual and R43 shared ride option" width="80%" />

---

<a id="trip-in-progress"></a>
![Trip in Progress](https://img.shields.io/badge/Trip%20in%20Progress-orange?style=for-the-badge)

The journey screen shows the route, estimated arrival time, and driver details (clearly labelled as demo data). From here, the passenger can activate Safe Journey Mode or go straight to the Alert Dashboard.

<img src="./Screenshots/11%20Simulation%20Trip.png" alt="Active trip screen showing Sandton to Soweto with driver Sipho M. and Safe Journey Mode button" width="80%" />

---

<a id="safety-alert"></a>
![Safety Alert](https://img.shields.io/badge/Safety%20Alert-orange?style=for-the-badge)

When a prolonged stop is detected, the app raises an alert and asks the passenger to confirm whether they are okay. Amazon Bedrock generates a plain-language explanation of what triggered the alert and outlines the passenger's options, including notifying a trusted contact.

<img src="./Screenshots/12%20Simulation%20Safety%20Alert.png" alt="Safety alert screen with Bedrock AI response and trusted contact notification option" width="80%" />

---

<a id="safety-dashboard"></a>
![Safety Dashboard](https://img.shields.io/badge/Safety%20Dashboard-orange?style=for-the-badge)

Displays a log of all simulated trips, the events detected during each one, the passenger's check-in responses, and the fares. The fare comparison summary at the bottom shows the individual versus shared ride cost.

<img src="./Screenshots/13%20Simulation%20Event%20History.png" alt="Safety Dashboard showing trip history, event log, and fare comparison" width="80%" />

---

<a id="tech-stack"></a>
![Tech Stack](https://img.shields.io/badge/Tech%20Stack-brightgreen?style=for-the-badge)

**Frontend**
- React with TypeScript
- Tailwind CSS
- Hosted on AWS Amplify

**Backend**
- AWS Lambda
- Amazon API Gateway
- Amazon Bedrock
- Amazon DynamoDB
- Amazon SNS
- Amazon Cognito
- Amazon CloudWatch

**Source Control**
- Git and GitHub

---

<a id="out-of-scope"></a>
![Out of Scope](https://img.shields.io/badge/Out%20of%20Scope-orange?style=for-the-badge)

The following were not built during the 24-hour window and are listed as future work:

- Continuous live GPS tracking
- Real-time route deviation detection using a mapping API
- Full driver identity and vehicle verification
- Live emergency service integration
- Real payments or driver payouts
- Production-grade ride matching
- Native Android and iOS apps
- Advanced predictive analytics

---

<a id="privacy-and-security"></a>
![Privacy and Security](https://img.shields.io/badge/Privacy%20and%20Security-orange?style=for-the-badge)

- All trip, driver, and passenger data in the prototype is simulated
- No real location information is collected during the demo
- AWS credentials are not stored in or exposed through the frontend code
- Backend services use appropriate access controls
- Simulated alerts and notifications are clearly labelled throughout the app
- AI responses are based on approved guidance and do not replace emergency services
- A production version would require a full POPIA compliance review before collecting real user data

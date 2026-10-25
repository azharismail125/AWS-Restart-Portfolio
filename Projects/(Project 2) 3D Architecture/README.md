This document covers the cloud architecture for a 3D e-commerce web application. The
platform lets users view and interact with 3D product models such as furniture, gadgets and
fashion items before buying. The design priorities are performance, availability, security, and
cost.

1. AWS Service Choices
Amazon S3: This is the primary storage for static assets and 3D model files. When a seller
uploads a model, S3 fires an event to trigger backend processing. Public access is blocked to
prevent unauthorized access.
Amazon CloudFront: A Content Delivery Network that caches 3D assets at edge locations
globally. This reduces repeated origin requests and keeps load times fast for users regardless
of where they are situated in the world.
EC2 with AWS Lambda: EC2 runs continuously for core backend work for session
management, cart operations and checkouts across multiple Availability Zones. Lambda
handles stateless, event-driven tasks like model compression, format conversion, and thumbnail
generation, where paying for idle compute doesn&#39;t make sense.

RDS instead of DynamoDB: RDS handles transactional relational data which in this case are
inventory, orders, customer records and where strict data integrity matters. DynamoDB was
considered but RDS is the better fit given the transactional requirements.
Elastic Load Balancer (ELB): The Application Load Balancer distributes dynamic traffic across
healthy EC2 instances using continuous health checks and accounts for rapid increases or
decreases in traffic such as sales or festive periods.
Amazon Route 53: Handles DNS and domain routing. Performs health checks and fails over to
backup resources automatically if a primary component goes down.
CloudWatch &amp; Trusted Advisor: CloudWatch tracks application health, EC2 utilization under
heavy 3D rendering load, and Lambda invocations. Trusted Advisor flags opportunities to
improve performance, security posture, and cost.
2. Meeting the 5 Key Requirements
High Availability: Multi-AZ EC2 deployment means a single data center outage won&#39;t drop
active shopping sessions. Route 53 and the ALB only route traffic to healthy instances.
Scalability: Auto Scaling adjusts the EC2 fleet based on demand. CloudFront handles delivery
of large 3D assets globally without adding load on the backend.
Performance: Caching 3D content at CloudFront edge locations means fast page loads and
smooth rendering regardless of the user&#39;s location.
Security: The backend sits in a VPC with private subnets so that there’s no direct internet
exposure. S3 buckets are private, accessed only through CloudFront. AWS WAF filters
malicious traffic, Security Groups restrict internal network paths and IAM enforces least-privilege
permissions.
Cost Optimization: Lambda handles intermittent model processing to avoid idle EC2 costs.
Auto Scaling uses minimum and maximum thresholds to prevent over-provisioning during both
quiet and peak periods.

3. Design Trade-offs &amp; Challenges
EC2 and Lambda: EC2 handles continuous sessions reliably but requires active capacity
planning. Lambda drops the server management overhead for 3D model processing but brings
cold starts and potential downstream database pressure.
Performance and Cost: Intense caching, extra compute or provisioned concurrency can
improve responsiveness but will also raise spend and configuration complexity.

Simplicity vs Resilience: Multi-Availability Zones and load-balanced infrastructure prevents
downtime but costs more and is more complex to manage than a single-server setup.
Public vs. Private Origin: Keeping the ALB private behind CloudFront shields the backend
from unwanted, direct internet exposure but requires more VPC work such as NAT gateways,
routing rules, and connectivity configuration.
Scaling Dependencies: A sudden spike due a popular product launch triggers rapid Auto
Scaling which can create connection pressure on downstream components like RDS. System-
wide monitoring is needed to catch this before it becomes a problem.

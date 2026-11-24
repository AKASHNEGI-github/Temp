
# HTTP and RESTful APIs – Interview Questions and Answers

# 1. HTTP Fundamentals

## 1. What is HTTP?

HTTP stands for HyperText Transfer Protocol.

It is an application-layer protocol used for communication between clients and servers.

It follows a request-response model:

1. Client sends an HTTP request.
2. Server processes the request.
3. Server sends an HTTP response.
4. Client receives and processes the response.

**Important points:**
- HTTP is an application-layer protocol.
- It follows a request-response model.
- HTTP is stateless.
- HTTP/1.1 and HTTP/2 commonly use TCP.
- HTTP/3 uses QUIC over UDP.

## 2. What is HTTPS?

HTTPS stands for HyperText Transfer Protocol Secure.

It is the secure version of HTTP that uses TLS (Transport Layer Security) to encrypt communication between clients and servers.

### HTTP vs HTTPS

| Comparison | HTTP | HTTPS |
|---|---|---|
| Security | Not encrypted by default | Uses TLS encryption |
| Port | 80 | 443 |
| Certificate | Not required | TLS certificate required |
| Data transmission | Unencrypted at HTTP level | Encrypted at TLS level |
| Usage | Non-sensitive communication | Secure applications and APIs |

## 3. What is a Stateless Protocol?

A stateless protocol does not maintain previous request information as part of the protocol itself.

Every HTTP request is independently processed.

**Example:**

1. Client sends a request to fetch user details.
2. Server processes the request.
3. Server sends a response.
4. Client sends another request.
5. Server does not automatically remember the previous request.

If authentication or other context is required, the client must provide it through cookies, sessions, or tokens.

**Interview point:** HTTP is stateless, but applications can maintain state using sessions, cookies, databases, and tokens.

## 4. What is an HTTP Request?

An HTTP request generally contains:

1. Request line.
2. Headers.
3. Blank line.
4. Optional request body.

Example:

```http
POST /api/users HTTP/1.1
Host: example.com
Content-Type: application/json
Authorization: Bearer token123

{
  "name": "John",
  "email": "john@example.com"
}
```

## 5. What is an HTTP Response?

An HTTP response generally contains:

1. Status line.
2. Headers.
3. Blank line.
4. Optional response body.

Example:

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 101,
  "name": "John"
}
```

## 6. What are HTTP Headers?

HTTP headers carry additional information about requests and responses.

### Common Request Headers

| Header | Purpose |
|---|---|
| Host | Identifies the target host |
| Authorization | Sends authentication credentials |
| Content-Type | Specifies request body media type |
| Accept | Specifies acceptable response formats |
| User-Agent | Identifies the client |
| Cookie | Sends cookies to the server |
| Cache-Control | Controls caching behavior |
| Origin | Identifies the request origin |

### Common Response Headers

| Header | Purpose |
|---|---|
| Content-Type | Specifies response media type |
| Content-Length | Indicates response body size |
| Set-Cookie | Sends cookies to the client |
| Cache-Control | Defines caching behavior |
| Location | Identifies a resource location or redirect destination |
| ETag | Identifies a resource representation version |
| WWW-Authenticate | Indicates authentication requirements |


## Part 2: HTTP Methods (Q7–Q16)

# 2. HTTP Methods

## 7. What are HTTP Methods?

HTTP methods define the operation that a client wants to perform on a server resource.

Common HTTP methods:

- GET
- POST
- PUT
- PATCH
- DELETE
- HEAD
- OPTIONS
- TRACE
- CONNECT

### HTTP Methods Comparison

| Method | Purpose | Idempotent |
|---|---|---|
| GET | Retrieve resource | Yes |
| POST | Create resource or perform operation | Generally No |
| PUT | Create or completely replace resource | Yes |
| PATCH | Partially update resource | Not necessarily |
| DELETE | Delete resource | Yes |
| HEAD | Retrieve headers without response body | Yes |
| OPTIONS | Discover communication options | Yes |
| TRACE | Diagnostic request tracing | Yes |
| CONNECT | Establish a tunnel | Not generally applicable |

## 8. What is GET?

GET is used to retrieve data from the server.

Example:

```http
GET /api/users/101
```

Response:

```json
{
  "id": 101,
  "name": "John"
}
```

**Characteristics:**
- Retrieves resources.
- Should not modify server state.
- Safe method.
- Idempotent.
- Can be cached when appropriate.

## 9. What is POST?

POST is used to submit data to the server, commonly to create a resource or trigger an operation.

Example:

```http
POST /api/users
Content-Type: application/json

{
  "name": "John",
  "email": "john@example.com"
}
```

**Characteristics:**
- Commonly used to create resources.
- Can trigger server-side operations.
- Usually contains a request body.
- Generally non-idempotent.

## 10. What is PUT?

PUT is used to create or completely replace the state of a resource at a specified URI.

Example:

```http
PUT /api/users/101
Content-Type: application/json

{
  "name": "John Smith",
  "email": "john@example.com"
}
```

**Characteristics:**
- Used for resource replacement.
- Usually sends the complete intended representation.
- Idempotent.

## 11. What is PATCH?

PATCH is used to partially update an existing resource.

Example:

```http
PATCH /api/users/101
Content-Type: application/json

{
  "name": "John Smith"
}
```

Only the name is updated.

### PUT vs PATCH

| Comparison | PUT | PATCH |
|---|---|---|
| Purpose | Replace resource representation | Partially update resource |
| Data | Usually complete representation | Only fields to modify |
| Idempotency | Yes | Not necessarily |
| Usage | Replace user details | Update username |

## 12. What is DELETE?

DELETE is used to remove a resource.

Example:

```http
DELETE /api/users/101
```

Possible response:

```http
HTTP/1.1 204 No Content
```

**Characteristics:**
- Used to delete resources.
- Idempotent.
- Repeated requests should leave the resource in the same intended state.

## 13. What is the Difference Between GET and POST?

| Comparison | GET | POST |
|---|---|---|
| Purpose | Retrieve data | Submit data or perform an operation |
| Request body | Usually not used | Commonly used |
| Data transmission | Often through query parameters | Commonly through request body |
| Caching | Commonly cacheable | Not cacheable by default |
| Safe | Yes | No |
| Idempotent | Yes | Generally no |

## 14. What is the Difference Between PUT and POST?

| Comparison | POST | PUT |
|---|---|---|
| Purpose | Submit data or create resource | Create or replace resource at a known URI |
| Resource URI | Often determined by server | Specified by client |
| Idempotent | Generally no | Yes |
| Repeated requests | May create multiple resources | Same intended resource state |

## 15. What is an Idempotent HTTP Method?

An HTTP method is idempotent when making the same request multiple times has the same intended effect on the server as making it once.

Example:

```http
PUT /api/users/101
```

Sending the same PUT request multiple times should leave the resource in the same state.

### Idempotent vs Non-Idempotent Methods

| Method | Idempotent |
|---|---|
| GET | Yes |
| HEAD | Yes |
| OPTIONS | Yes |
| PUT | Yes |
| DELETE | Yes |
| POST | Generally No |
| PATCH | Not necessarily |

**Real-world example:**

Suppose we have a bank transfer API.

```http
POST /api/transfer
```

If the client retries the request because of a network timeout, it could accidentally transfer money twice.

To prevent this, we can use an idempotency key.

```http
POST /api/transfer
Idempotency-Key: transaction-12345
```

The server stores the result associated with the key and avoids processing the same operation again.

## 16. What is a Safe HTTP Method?

A safe HTTP method is intended to retrieve information without changing the server's resource state.

Safe methods:

- GET
- HEAD
- OPTIONS
- TRACE

### Safe vs Idempotent

| Method | Safe | Idempotent |
|---|---|---|
| GET | Yes | Yes |
| HEAD | Yes | Yes |
| OPTIONS | Yes | Yes |
| TRACE | Yes | Yes |
| PUT | No | Yes |
| DELETE | No | Yes |
| POST | No | Generally No |
| PATCH | No | Not necessarily |

**Interview point:** Every safe method is idempotent, but every idempotent method is not safe.



# 3. HTTP Status Codes

## 17. What are HTTP Status Codes?

HTTP status codes indicate the result of an HTTP request.

They are returned by the server as part of the HTTP response.

HTTP status codes are divided into five categories:

| Category | Range | Meaning |
|---|---|---|
| 1xx | 100–199 | Informational |
| 2xx | 200–299 | Success |
| 3xx | 300–399 | Redirection |
| 4xx | 400–499 | Client errors |
| 5xx | 500–599 | Server errors |

## 18. What are the Important 2xx Status Codes?

2xx status codes indicate that the request was successfully received, understood, and accepted.

| Status Code | Name | Usage |
|---|---|---|
| 200 | OK | Request successful |
| 201 | Created | Resource successfully created |
| 202 | Accepted | Request accepted for processing |
| 204 | No Content | Request successful, no response body |

### 200 vs 201

- 200 OK: Used when the request succeeds.
- 201 Created: Used when a new resource is successfully created.

### 200 vs 204

- 200: Successful response with a response body.
- 204: Successful response without a response body.

### 201 vs 202

- 201 Created: The resource has been created.
- 202 Accepted: The request has been accepted for processing but may not be completed yet.

## 19. What are the Important 3xx Status Codes?

3xx status codes indicate that the client needs to take additional action, usually to follow a redirect or use a cached representation.

| Status Code | Name | Usage |
|---|---|---|
| 301 | Moved Permanently | Resource permanently moved |
| 302 | Found | Temporary redirection |
| 303 | See Other | Redirect using GET |
| 304 | Not Modified | Cached representation can be reused |
| 307 | Temporary Redirect | Temporary redirect preserving method |
| 308 | Permanent Redirect | Permanent redirect preserving method |

### 301 vs 302

- 301: Resource has permanently moved to another URL.
- 302: Resource is temporarily available at another URL.

### 302 vs 307

- 302: User agents may change POST to GET when following the redirect.
- 307: Preserves the original HTTP method and request body.

### 304 Not Modified

This status code is used in conditional requests.

It tells the client that its cached representation is still valid.

Example:

```http
GET /api/users/101
If-None-Match: "abc123"
```

Response:

```http
HTTP/1.1 304 Not Modified
```

The client can reuse its cached response.

## 20. What are the Important 4xx Status Codes?

4xx status codes indicate that the client request has an issue.

| Status Code | Name | Usage |
|---|---|---|
| 400 | Bad Request | Invalid request |
| 401 | Unauthorized | Authentication is missing or invalid |
| 403 | Forbidden | User does not have sufficient permission |
| 404 | Not Found | Resource not found |
| 405 | Method Not Allowed | HTTP method not supported |
| 406 | Not Acceptable | No acceptable response representation |
| 408 | Request Timeout | Request timed out |
| 409 | Conflict | Conflict with current resource state |
| 410 | Gone | Resource is no longer available |
| 415 | Unsupported Media Type | Unsupported request content type |
| 422 | Unprocessable Content | Request understood but cannot be processed |
| 429 | Too Many Requests | Rate limit exceeded |

### 401 vs 403

| 401 Unauthorized | 403 Forbidden |
|---|---|
| Authentication is missing or invalid | User is authenticated but lacks permission |
| User may need to log in | Logging in again does not necessarily help |
| Example: Invalid JWT | Example: Normal user accessing admin API |

**Example:**

A user tries to access an API without a valid JWT.

Response:

```http
HTTP/1.1 401 Unauthorized
```

An authenticated normal user tries to access an admin API.

Response:

```http
HTTP/1.1 403 Forbidden
```

### 400 vs 404

- 400: Request itself is invalid.
- 404: Requested resource does not exist or is not available.

Example:

```http
GET /api/users/abc
```

If the API expects a numeric user ID, this may return 400 Bad Request.

```http
GET /api/users/999
```

If user 999 does not exist, this may return 404 Not Found.

### 409 vs 422

- 409: Request conflicts with the current state of the resource.
- 422: Request content is understood but cannot be processed.

Example of 409:

Trying to register an email address that already exists, where the API uses conflict semantics.

Example of 422:

Submitting an invalid business value that fails application validation.

### 401 vs 404

- 401: Authentication is required or credentials are invalid.
- 404: Resource does not exist or the server chooses not to disclose its existence.

## 21. What are the Important 5xx Status Codes?

5xx status codes indicate that the server failed to fulfill a valid request.

| Status Code | Name | Usage |
|---|---|---|
| 500 | Internal Server Error | Unexpected server error |
| 501 | Not Implemented | Functionality not supported |
| 502 | Bad Gateway | Gateway received invalid upstream response |
| 503 | Service Unavailable | Server temporarily unavailable |
| 504 | Gateway Timeout | Gateway timed out waiting for upstream response |

### 500 vs 502 vs 503 vs 504

**500 Internal Server Error**

The application or server encountered an unexpected error while processing the request.

Example:
- Unhandled application exception.
- Unexpected database-related failure.

**502 Bad Gateway**

A gateway or proxy received an invalid response from an upstream server.

Example:
- API Gateway receives an invalid response from a backend service.

**503 Service Unavailable**

The server is temporarily unable to handle requests.

Example:
- Server maintenance.
- Service temporarily overloaded.

**504 Gateway Timeout**

A gateway or proxy did not receive a response from an upstream server within the configured time.

Example:
- API Gateway waits for a backend service, but the backend takes too long to respond.

### Quick Revision

| Status Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 202 | Accepted |
| 204 | No Content |
| 301 | Moved Permanently |
| 302 | Found |
| 304 | Not Modified |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 405 | Method Not Allowed |
| 409 | Conflict |
| 415 | Unsupported Media Type |
| 422 | Unprocessable Content |
| 429 | Too Many Requests |
| 500 | Internal Server Error |
| 502 | Bad Gateway |
| 503 | Service Unavailable |
| 504 | Gateway Timeout |



# 4. REST and RESTful APIs

## 22. What is REST?

REST stands for Representational State Transfer.

It is an architectural style used to design network-based applications.

REST uses resources, resource identifiers, representations, and standard HTTP methods to enable communication between clients and servers.

Example:

```http
GET /api/users/101
```

This retrieves the user resource with ID 101.

**Important characteristics:**

- Resource-based architecture.
- Uses standard HTTP methods.
- Stateless communication.
- Supports representations such as JSON and XML.
- Uses HTTP status codes.
- Supports caching.
- Separates client and server responsibilities.

## 23. What is a RESTful API?

A RESTful API is an API designed according to REST architectural constraints.

Example:

| HTTP Method | Endpoint | Operation |
|---|---|---|
| GET | /api/users | Get all users |
| GET | /api/users/101 | Get user by ID |
| POST | /api/users | Create user |
| PUT | /api/users/101 | Replace user |
| PATCH | /api/users/101 | Partially update user |
| DELETE | /api/users/101 | Delete user |

**Interview point:** REST is an architectural style, whereas RESTful describes an API that follows REST principles.

## 24. What are the Six Constraints of REST Architecture?

REST defines six architectural constraints.

### 1. Client-Server Architecture

Client and server responsibilities are separated.

- Client handles the user interface.
- Server handles business logic and data storage.

**Example:**

A React application communicates with a Spring Boot backend through REST APIs.

### 2. Statelessness

Every request must contain the information required to process it.

The server should not depend on stored client context from previous requests.

**Example:**

If an API requires authentication, the client sends its authentication credentials with each request.

```http
GET /api/users/101
Authorization: Bearer <access_token>
```

### 3. Cacheability

Responses should indicate whether they can be cached.

Caching improves performance and reduces unnecessary server requests.

**Example:**

```http
Cache-Control: max-age=3600
```

This indicates that the response can be reused for 3600 seconds, subject to the caching directives.

### 4. Uniform Interface

The API should provide a consistent way to interact with resources.

It includes:

- Resource identification.
- Resource manipulation through representations.
- Self-descriptive messages.
- HATEOAS.

**Example:**

```http
GET /api/users/101
```

The resource is identified through its URI, and HTTP methods define how clients interact with it.

### 5. Layered System

A client should not need to know whether it communicates directly with the application server or through intermediate components.

Examples:

- API Gateway.
- Load Balancer.
- Proxy.
- Cache Server.

**Example:**

```text
Client
  |
  v
API Gateway
  |
  v
Load Balancer
  |
  v
Application Server
  |
  v
Database
```

### 6. Code on Demand (Optional)

The server can optionally send executable code to the client.

For example, JavaScript delivered by a server and executed by a browser.

**Interview point:** Code on Demand is the only optional REST constraint.

## 25. What is the Difference Between REST and RESTful API?

| REST | RESTful API |
|---|---|
| Architectural style | API implementation following REST constraints |
| Defines architectural principles | Applies those principles to API design |
| Concept | Implementation |

## 26. What is a Resource in REST?

A resource is any information or entity that can be identified through a URI.

Examples:

- User.
- Product.
- Order.
- Employee.
- Payment.

Example:

```http
GET /api/products/101
```

Here, product 101 is the resource.

A resource can have different representations, such as JSON or XML.

Example JSON representation:

```json
{
  "id": 101,
  "name": "Laptop",
  "price": 50000
}
```

## 27. What is the Difference Between URI, URL, and URN?

### URI

URI stands for Uniform Resource Identifier.

It identifies a resource.

### URL

URL stands for Uniform Resource Locator.

It identifies a resource and provides its location or access mechanism.

### URN

URN stands for Uniform Resource Name.

It identifies a resource by name within a namespace, without necessarily specifying its location.

| Comparison | URI | URL | URN |
|---|---|---|---|
| Purpose | Identifies a resource | Locates a resource | Names a resource |
| Contains location | Not necessarily | Yes | Not necessarily |
| Example | https://example.com/users/101 | https://example.com/users/101 | urn:isbn:9780132350884 |

**Interview point:** Every URL is a URI, but not every URI is a URL.

## 28. What are the Best Practices for Designing RESTful APIs?

1. Use nouns for resource names.
2. Use HTTP methods to define operations.
3. Use plural nouns for collections.
4. Use appropriate HTTP status codes.
5. Use JSON as a common response format.
6. Use pagination for large datasets.
7. Implement filtering, sorting, and searching.
8. Use proper authentication and authorization.
9. Use API versioning when needed.
10. Return consistent error responses.
11. Support caching where appropriate.
12. Use HTTPS.
13. Validate incoming request data.

### Good API Design

```http
GET    /api/users
GET    /api/users/101
POST   /api/users
PUT    /api/users/101
PATCH  /api/users/101
DELETE /api/users/101
```

### Bad API Design

```http
GET /api/getAllUsers
GET /api/getUserById/101
POST /api/createUser
GET /api/deleteUser/101
```

## 29. Why Should We Use Nouns Instead of Verbs in REST URLs?

REST is resource-oriented.

The HTTP method already describes the action to perform.

Example:

```http
GET /api/users
POST /api/users
DELETE /api/users/101
```

The URL identifies the resource, while the HTTP method identifies the operation.

**Advantages:**

- Consistent API design.
- Better readability.
- Predictable endpoint structure.
- Easier API maintenance.



# 5. Request Parameters and Response Handling

## 30. What are Path Parameters?

Path parameters are values included directly in the URL path to identify a specific resource.

Example:

```http
GET /api/users/101
```

Here, `101` is the path parameter.

In Spring Boot:

```java
@GetMapping("/users/{id}")
public User getUser(@PathVariable Long id) {
    return userService.getUser(id);
}
```

**Use cases:**
- Fetch a user by ID.
- Fetch an order by ID.
- Fetch product details by ID.

## 31. What are Query Parameters?

Query parameters are values passed in the URL after the question mark (`?`).

They are commonly used for:

- Filtering.
- Searching.
- Sorting.
- Pagination.

Example:

```http
GET /api/users?page=0&size=10&sort=name
```

In Spring Boot:

```java
@GetMapping("/users")
public List<User> getUsers(
        @RequestParam int page,
        @RequestParam int size) {

    return userService.getUsers(page, size);
}
```

## 32. Path Parameters vs Query Parameters

| Comparison | Path Parameter | Query Parameter |
|---|---|---|
| Purpose | Identifies a resource | Filters or modifies retrieval criteria |
| Position | Inside URL path | After ? |
| Required | Usually required for the specified route | Often optional |
| Example | /users/101 | /users?page=0 |
| Spring annotation | @PathVariable | @RequestParam |

**Interview point:**

Use path parameters to identify a particular resource and query parameters to filter, sort, search, or paginate resources.

## 33. What is a Request Body?

A request body contains data sent by the client to the server.

It is commonly used with POST, PUT, and PATCH methods.

Example:

```json
{
  "name": "John",
  "email": "john@example.com"
}
```

In Spring Boot:

```java
@PostMapping("/users")
public User createUser(@RequestBody User user) {
    return userService.createUser(user);
}
```

**Important points:**
- Request bodies commonly contain JSON or XML.
- The Content-Type header specifies the body format.
- The server reads and processes the request body.

## 34. What is the Difference Between @RequestBody, @RequestParam, and @PathVariable?

| Annotation | Purpose | Example |
|---|---|---|
| @RequestBody | Reads request body | JSON user data |
| @RequestParam | Reads query parameters | ?page=0 |
| @PathVariable | Reads URL path variables | /users/101 |

### Example Using All Three

```java
@PostMapping("/users/{id}")
public User updateUser(
        @PathVariable Long id,
        @RequestParam String source,
        @RequestBody User user) {

    return userService.updateUser(id, source, user);
}
```

Request:

```http
POST /api/users/101?source=admin
Content-Type: application/json

{
  "name": "John",
  "email": "john@example.com"
}
```

Here:

- `101` is received using `@PathVariable`.
- `admin` is received using `@RequestParam`.
- JSON data is received using `@RequestBody`.

## 35. What is Content-Type?

Content-Type specifies the media type of the request or response body.

Example:

```http
Content-Type: application/json
```

Common media types:

| Content-Type | Usage |
|---|---|
| application/json | JSON data |
| application/xml | XML data |
| text/plain | Plain text |
| text/html | HTML content |
| multipart/form-data | Form data and file uploads |
| application/x-www-form-urlencoded | URL-encoded form data |

**Interview point:** Content-Type tells the receiver what format the message body is in.

## 36. What is the Accept Header?

The Accept header tells the server which response media types the client can process.

Example:

```http
Accept: application/json
```

The client is requesting a JSON representation.

### Content-Type vs Accept

| Content-Type | Accept |
|---|---|
| Specifies the media type of the message body | Specifies acceptable response media types |
| Describes the body being sent or returned | Describes what the client can receive |
| Example: application/json | Example: application/json |

### Practical Example

Request:

```http
POST /api/users
Content-Type: application/json
Accept: application/json

{
  "name": "John"
}
```

Here:

- Content-Type tells the server that the request body is JSON.
- Accept tells the server that the client expects a JSON response.



# 6. API Design and Advanced Concepts

## 37. What is API Versioning?

API versioning allows developers to introduce changes without breaking existing API consumers.

Example:

```http
GET /api/v1/users
GET /api/v2/users
```

### Common API Versioning Strategies

**1. URI Versioning**

```http
/api/v1/users
```

**2. Query Parameter Versioning**

```http
/api/users?version=1
```

**3. Header Versioning**

```http
X-API-Version: 1
```

**4. Media Type Versioning**

```http
Accept: application/vnd.company.v1+json
```

### Why do we need API versioning?

- Maintain backward compatibility.
- Introduce new features.
- Change response structures.
- Support multiple client versions.
- Avoid breaking existing integrations.

## 38. What is Pagination in REST APIs?

Pagination divides a large dataset into smaller parts.

It improves API performance and reduces unnecessary data transfer.

Example:

```http
GET /api/users?page=0&size=10
```

### Common Pagination Approaches

**1. Offset-Based Pagination**

```http
GET /api/users?offset=20&limit=10
```

**2. Page-Based Pagination**

```http
GET /api/users?page=2&size=10
```

**3. Cursor-Based Pagination**

```http
GET /api/users?cursor=abc123&limit=10
```

### Offset vs Cursor Pagination

| Offset Pagination | Cursor Pagination |
|---|---|
| Uses offset and limit | Uses a cursor |
| Easy to implement | More complex |
| Can become inefficient for large offsets | Often more efficient for large datasets |
| Can be affected by concurrent inserts and deletes | More stable for sequential traversal |

## 39. What is Caching in REST APIs?

Caching stores a response temporarily so that repeated requests can be served faster.

### Advantages

- Improves response time.
- Reduces server load.
- Reduces database queries.
- Reduces network traffic.

### Important HTTP Caching Headers

| Header | Purpose |
|---|---|
| Cache-Control | Defines caching rules |
| ETag | Identifies a representation version |
| Last-Modified | Indicates last modification time |
| If-None-Match | Sends a previously received ETag |
| If-Modified-Since | Checks whether a resource changed |
| Expires | Defines response expiration date |

### Example

Server response:

```http
HTTP/1.1 200 OK
ETag: "abc123"
Cache-Control: max-age=3600
```

Client's next request:

```http
GET /api/users/101
If-None-Match: "abc123"
```

If the resource has not changed:

```http
HTTP/1.1 304 Not Modified
```

The client can reuse its cached representation.

## 40. What is CORS?

CORS stands for Cross-Origin Resource Sharing.

It is a browser-enforced security mechanism that controls whether a web page from one origin can access resources from another origin.

An origin consists of:

- Scheme.
- Host.
- Port.

Example:

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:8080
```

These are different origins because their ports differ.

### Important CORS Headers

| Header | Purpose |
|---|---|
| Access-Control-Allow-Origin | Specifies allowed origins |
| Access-Control-Allow-Methods | Specifies allowed HTTP methods |
| Access-Control-Allow-Headers | Specifies allowed request headers |
| Access-Control-Allow-Credentials | Indicates whether credentials can be included |
| Access-Control-Expose-Headers | Specifies response headers exposed to browser JavaScript |
| Access-Control-Max-Age | Defines how long preflight results can be cached |

### What is a Preflight Request?

For certain cross-origin requests, browsers first send an OPTIONS request to check whether the actual request is permitted.

Example:

```http
OPTIONS /api/users HTTP/1.1
Origin: http://localhost:3000
Access-Control-Request-Method: POST
Access-Control-Request-Headers: content-type, authorization
```

The server responds with appropriate CORS headers.

If permitted, the browser sends the actual request.

**Interview point:** CORS is enforced by browsers. It is not an authentication or authorization mechanism.

## 41. What is HATEOAS?

HATEOAS stands for Hypermedia as the Engine of Application State.

It is a REST constraint where API responses include links that guide clients toward available related actions.

Example:

```json
{
  "id": 101,
  "name": "John",
  "_links": {
    "self": {
      "href": "/api/users/101"
    },
    "orders": {
      "href": "/api/users/101/orders"
    }
  }
}
```

The client can discover related resources through the provided links.

## 42. What is the Difference Between REST and SOAP?

| Comparison | REST | SOAP |
|---|---|---|
| Type | Architectural style | Protocol |
| Data format | Commonly JSON, also XML and others | XML-based |
| Communication | Commonly HTTP | HTTP and other transport protocols |
| Complexity | Generally simpler | More structured and complex |
| Performance | Often lightweight | XML processing can add overhead |
| Security | HTTPS, OAuth, JWT, etc. | Can use WS-Security |
| Usage | Web APIs and microservices | Enterprise integrations |

**Interview point:** REST is an architectural style, while SOAP is a protocol.

## 43. What is the Difference Between REST and GraphQL?

| Comparison | REST | GraphQL |
|---|---|---|
| API structure | Multiple resource endpoints | Usually one endpoint |
| Data fetching | Server-defined response structure | Client specifies required fields |
| Over-fetching | Can happen | Can be reduced |
| Under-fetching | Can happen across multiple requests | Can be reduced through nested queries |
| Versioning | Often uses API versioning | Schema evolution is commonly preferred |
| Caching | Standard HTTP caching support | Requires additional caching strategies |

### Example

REST API:

```http
GET /api/users/101
GET /api/users/101/orders
```

GraphQL query:

```graphql
query {
  user(id: 101) {
    name
    email
    orders {
      id
      amount
    }
  }
}
```

GraphQL allows clients to request the specific fields and related data they need.

## 44. What is Rate Limiting?

Rate limiting restricts how many requests a client can make within a specific period.

Example:

```text
100 requests per minute per user
```

If the client exceeds the limit, the server can return:

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 60
```

### Why do we need rate limiting?

- Prevent abuse.
- Protect backend services.
- Reduce unnecessary traffic.
- Prevent excessive resource consumption.
- Help protect APIs against denial-of-service patterns.

## 45. What is API Gateway?

An API Gateway is an entry point through which clients access backend services.

It can handle:

- Request routing.
- Authentication.
- Authorization.
- Rate limiting.
- Load balancing integration.
- Logging and monitoring.
- Request and response transformation.

Example:

```text
             Client
                |
                v
           API Gateway
                |
       +--------+--------+
       |        |        |
       v        v        v
     User     Order    Payment
    Service  Service   Service
```

**Interview point:** An API Gateway provides centralized management of requests going to multiple backend services.



# 7. Error Handling and REST API Security

## 46. How Do You Handle Exceptions in REST APIs?

Exception handling ensures that an API returns meaningful and consistent error responses when something goes wrong.

Instead of exposing internal application errors or stack traces, we should return appropriate HTTP status codes and error messages.

### Example Error Response

```json
{
  "timestamp": "2026-11-24T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "User not found",
  "path": "/api/users/101"
}
```

### Common HTTP Status Codes for Exception Handling

| Status Code | Scenario |
|---|---|
| 400 | Invalid request |
| 401 | Authentication failure |
| 403 | Authorization failure |
| 404 | Resource not found |
| 409 | Resource conflict |
| 422 | Business validation failure |
| 500 | Unexpected server error |

### How to Handle Exceptions in Spring Boot?

Spring Boot provides:

- `@ExceptionHandler`
- `@ControllerAdvice`
- `@RestControllerAdvice`
- `ResponseEntity`

Example:

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleNotFound(
            ResourceNotFoundException ex) {

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericException(
            Exception ex) {

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Something went wrong");
    }
}
```

**Interview point:** `@RestControllerAdvice` provides centralized exception handling across REST controllers.

## 47. What is the Difference Between @ControllerAdvice and @RestControllerAdvice?

Both annotations are used for centralized exception handling.

| @ControllerAdvice | @RestControllerAdvice |
|---|---|
| Provides global controller advice | Provides global REST controller advice |
| Methods can return views | Methods return response bodies by default |
| Can be combined with `@ResponseBody` | Combines `@ControllerAdvice` and `@ResponseBody` |

Example:

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleException(
            RuntimeException ex) {

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }
}
```

## 48. What is Authentication vs Authorization?

### Authentication

Authentication verifies the identity of a user.

It answers:

**Who are you?**

Examples:
- Username and password.
- JWT authentication.
- OAuth 2.0 access token.

### Authorization

Authorization determines what an authenticated user is allowed to access.

It answers:

**What are you allowed to do?**

Examples:
- Admin can delete users.
- Normal users can view their own profiles.
- Managers can approve requests.

### Authentication vs Authorization

| Comparison | Authentication | Authorization |
|---|---|---|
| Purpose | Verifies identity | Checks permissions |
| Question | Who are you? | What can you access? |
| Happens | Before authorization | After authentication |
| Example | Login using username and password | Access admin endpoint |

## 49. What are the Common Authentication Mechanisms Used in REST APIs?

### 1. Basic Authentication

The client sends username and password encoded using Base64.

Example:

```http
Authorization: Basic dXNlcjpwYXNzd29yZA==
```

Important points:
- Base64 is encoding, not encryption.
- Always use HTTPS.
- Credentials must be protected.

### 2. Session-Based Authentication

After successful login, the server creates a session and sends a session ID to the client.

The client sends the session ID with subsequent requests, commonly through a cookie.

```http
Cookie: JSESSIONID=abc123
```

The server validates the session using its session store.

### 3. Token-Based Authentication

After successful authentication, the server issues an access token.

The client sends the token with subsequent requests.

```http
Authorization: Bearer <access_token>
```

The server validates the token before allowing access.

JWT is a common token format.

### 4. OAuth 2.0

OAuth 2.0 is an authorization framework that allows applications to obtain limited access to protected resources.

Example:

A third-party application accesses a user's permitted resources without directly receiving the user's password.

### Comparison

| Mechanism | How It Works |
|---|---|
| Basic Authentication | Sends encoded username and password |
| Session-Based | Uses server-managed session |
| Token-Based | Uses authentication or access token |
| OAuth 2.0 | Provides delegated authorization |

## 50. How Do You Secure REST APIs?

REST APIs should be protected using multiple security mechanisms.

### Important Security Best Practices

1. Use HTTPS to encrypt communication.
2. Implement authentication using sessions or tokens.
3. Implement role-based or permission-based authorization.
4. Validate and sanitize incoming request data.
5. Never store passwords in plain text.
6. Use secure password hashing algorithms such as bcrypt or Argon2.
7. Implement rate limiting.
8. Avoid exposing sensitive information in API responses.
9. Configure CORS with appropriate allowed origins.
10. Validate JWT signatures and claims when using JWT.
11. Apply token expiration and appropriate revocation strategies.
12. Protect against SQL injection using parameterized queries.
13. Avoid logging passwords, access tokens, or other secrets.
14. Keep dependencies and frameworks updated.

### Example: Securing an API Using JWT

Client sends:

```http
GET /api/users/101
Authorization: Bearer <access_token>
```

Server performs the following checks:

1. Extracts the token.
2. Validates its signature.
3. Checks token expiration.
4. Validates relevant claims such as issuer and audience.
5. Checks the user's permissions.
6. Allows or rejects the request.

**Interview point:** Authentication verifies who the user is, while authorization verifies whether the user has permission to access a particular resource.



# 8. Scenario-Based REST API Interview Questions

## 51. How Would You Design a REST API to Create a User?

We can use the POST HTTP method to create a new user.

### Endpoint

```http
POST /api/users
```

### Request Body

```json
{
  "name": "John",
  "email": "john@example.com",
  "age": 25
}
```

### Response

```http
HTTP/1.1 201 Created
Location: /api/users/101
Content-Type: application/json
```

```json
{
  "id": 101,
  "name": "John",
  "email": "john@example.com",
  "age": 25
}
```

### Implementation in Spring Boot

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @PostMapping
    public ResponseEntity<User> createUser(
            @RequestBody User user) {

        User savedUser = userService.createUser(user);

        return ResponseEntity
                .created(URI.create("/api/users/" + savedUser.getId()))
                .body(savedUser);
    }
}
```

**Interview point:** Use POST to create a resource and return HTTP 201 Created when creation is successful.

## 52. How Would You Handle Duplicate Requests in a REST API?

Duplicate requests can occur because of:
- Network timeouts.
- Client retries.
- Users clicking the submit button multiple times.
- Load balancer retries.

For example, suppose a client sends a payment request twice.

Without proper handling, the customer might be charged twice.

### Solution: Idempotency Key

The client sends a unique idempotency key.

```http
POST /api/payments
Idempotency-Key: payment-12345
Content-Type: application/json
```

```json
{
  "amount": 500,
  "currency": "INR"
}
```

The server:

1. Checks whether the idempotency key already exists.
2. If it exists, returns the previously stored result.
3. Otherwise, processes the payment.
4. Stores the result against the idempotency key.

**Interview point:** Idempotency keys help make operations such as payment creation safe against duplicate processing.

## 53. How Would You Improve the Performance of a Slow REST API?

There are multiple ways to improve REST API performance.

### 1. Database Optimization
- Add appropriate database indexes.
- Optimize SQL queries.
- Avoid unnecessary joins.
- Use connection pooling.

### 2. Caching
- Use Redis or an in-memory cache.
- Cache frequently requested data.
- Use HTTP caching headers where appropriate.

### 3. Pagination
- Avoid returning thousands of records in a single response.
- Implement pagination.

### 4. Reduce Payload Size
- Return only required fields.
- Avoid unnecessary nested objects.
- Use compression when appropriate.

### 5. Asynchronous Processing
- Use message queues for long-running operations.
- Avoid blocking API requests unnecessarily.

### 6. Monitoring
- Analyze API response time.
- Monitor database query execution time.
- Use distributed tracing.

**Interview point:** First identify the bottleneck through monitoring and profiling, then optimize the database, application logic, network communication, or infrastructure as appropriate.

## 54. What Happens If a REST API Takes Too Long to Respond?

A client or intermediary may have a configured timeout.

If the API takes longer than that timeout:

1. The client may terminate the request.
2. The client may receive a timeout error.
3. The server might still be processing the request.
4. The client may retry the request.

### How Can We Handle This?

- Configure appropriate connection and read timeouts.
- Optimize slow database queries.
- Use asynchronous processing for long-running operations.
- Implement idempotency for operations that may be retried.
- Use monitoring and logging to identify bottlenecks.

### Example

For a long-running report generation API:

```http
POST /api/reports
```

Response:

```http
HTTP/1.1 202 Accepted
```

```json
{
  "jobId": "report-101",
  "status": "PROCESSING"
}
```

The client can check the status later:

```http
GET /api/reports/report-101
```

## 55. How Would You Design an API for Searching and Filtering Users?

We can use GET with query parameters.

### Endpoint

```http
GET /api/users?name=John&age=25&page=0&size=10
```

### Parameters

- name: Filter by user name.
- age: Filter by age.
- page: Page number.
- size: Number of records per page.

### Spring Boot Implementation

```java
@GetMapping("/users")
public Page<User> searchUsers(
        @RequestParam(required = false) String name,
        @RequestParam(required = false) Integer age,
        Pageable pageable) {

    return userService.searchUsers(name, age, pageable);
}
```

**Interview point:** Query parameters are suitable for filtering, sorting, searching, and pagination.

## 56. What Should You Do If an API Returns 500 Internal Server Error?

A 500 status code indicates that the server encountered an unexpected error.

### Troubleshooting Steps

1. Check application logs.
2. Identify the exception and stack trace.
3. Check database connectivity.
4. Verify external service availability.
5. Check recent code deployments.
6. Verify environment configurations.
7. Reproduce the issue locally or in a test environment.
8. Fix the root cause.
9. Add appropriate exception handling and monitoring.

**Interview point:** Do not assume every 500 error is a database issue. Investigate the logs and identify the actual root cause.

## 57. What is the Difference Between Synchronous and Asynchronous REST API Processing?

### Synchronous Processing

The client sends a request and waits until the server completes processing.

Example:

```http
GET /api/users/101
```

The server processes the request and returns the response.

### Asynchronous Processing

The server accepts the request and processes it in the background.

The client does not need to wait for the complete operation.

Example:

```http
POST /api/reports
```

Response:

```http
HTTP/1.1 202 Accepted
```

```json
{
  "jobId": "101",
  "status": "PROCESSING"
}
```

The client can check the processing status through another endpoint.

### Comparison

| Synchronous | Asynchronous |
|---|---|
| Client waits for completion | Client does not wait for completion |
| Suitable for quick operations | Suitable for long-running operations |
| Response contains operation result | Initial response may contain job ID |
| Simpler implementation | Requires additional processing and status management |

## 58. How Would You Handle a Situation Where One REST API Depends on Another REST API?

In microservices architecture, one service may need data from another service.

Example:

Order Service depends on:
- User Service.
- Product Service.
- Payment Service.

### Possible Approaches

1. REST API communication.
2. Asynchronous messaging using Kafka or RabbitMQ.
3. Caching frequently accessed data.
4. Circuit breaker pattern.
5. Retry with appropriate backoff.
6. Timeout configuration.

### Example Architecture

```text
Client
  |
  v
Order Service
  |
  +------> User Service
  |
  +------> Product Service
  |
  +------> Payment Service
```

### What is a Circuit Breaker?

A circuit breaker prevents repeated calls to a service that is failing.

It generally has three states:

- CLOSED: Requests are allowed.
- OPEN: Requests are blocked temporarily.
- HALF-OPEN: A limited number of requests are allowed to test recovery.

**Interview point:** Circuit breakers help prevent cascading failures in distributed systems.

## 59. How Would You Handle API Changes Without Breaking Existing Clients?

We can use API versioning.

Example:

```http
GET /api/v1/users
GET /api/v2/users
```

Suppose version 1 returns:

```json
{
  "firstName": "John",
  "lastName": "Smith"
}
```

Version 2 returns:

```json
{
  "fullName": "John Smith"
}
```

Existing clients continue using v1, while new clients can migrate to v2.

### Best Practices

- Maintain backward compatibility whenever possible.
- Introduce a new version for breaking changes.
- Communicate API changes to consumers.
- Provide a deprecation period.
- Monitor usage of older API versions.

## 60. What Happens If the Client Sends an Invalid Request Body?

The server should validate incoming request data before processing it.

Example:

```json
{
  "name": "",
  "email": "invalid-email",
  "age": -5
}
```

The server should reject invalid data with an appropriate 4xx response.

### Spring Boot Validation Example

```java
public class UserRequest {

    @NotBlank
    private String name;

    @Email
    private String email;

    @Min(1)
    private int age;

    // Getters and setters
}
```

Controller:

```java
@PostMapping("/users")
public ResponseEntity<User> createUser(
        @Valid @RequestBody UserRequest request) {

    User savedUser = userService.createUser(request);

    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(savedUser);
}
```

If validation fails, Spring MVC typically raises `MethodArgumentNotValidException`.

We can handle it centrally using `@RestControllerAdvice`.

Example error response:

```json
{
  "status": 400,
  "message": "Validation failed",
  "errors": [
    "Name must not be blank",
    "Email must be valid",
    "Age must be greater than or equal to 1"
  ]
}
```

**Interview point:** Always validate incoming data at the API boundary before passing it to the business layer.



# 9. Advanced HTTP and REST API Concepts

## 61. What is the Difference Between HTTP/1.1, HTTP/2, and HTTP/3?

These are different versions of the HTTP protocol.

| Feature | HTTP/1.1 | HTTP/2 | HTTP/3 |
|---|---|---|---|
| Transport | TCP | TCP | QUIC over UDP |
| Multiplexing | No native multiplexing | Yes | Yes |
| Header Compression | No standard header compression | HPACK | QPACK |
| Connection | Persistent connections supported | Single connection can handle multiple streams | QUIC connections |
| Head-of-line blocking | Can occur at HTTP level | TCP-level blocking can still occur | Avoids TCP-level head-of-line blocking |
| Performance | Comparatively limited | Improved | Further improved in many network conditions |

### HTTP/1.1

- Supports persistent connections.
- Requests are generally processed sequentially on a connection.
- Multiple connections may be opened to improve concurrency.

### HTTP/2

- Supports multiplexing.
- Multiple streams can share a single TCP connection.
- Uses header compression through HPACK.
- Supports server push, although it is deprecated in browsers and is not commonly used.

### HTTP/3

- Uses QUIC instead of TCP.
- QUIC runs over UDP.
- Supports multiplexing.
- Reduces transport-level head-of-line blocking between independent streams.
- Supports connection migration.

**Interview point:** HTTP/2 improves performance through multiplexing, while HTTP/3 uses QUIC to improve connection establishment and avoid TCP-level head-of-line blocking.

## 62. What is the Difference Between Cookies and Sessions?

### Cookies

Cookies are small pieces of data stored on the client, commonly in the browser.

They are sent to the server with matching requests, subject to cookie attributes and browser policies.

Example:

```http
Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Lax
```

### Sessions

Sessions store user-related state on the server.

The server generally creates a session ID and sends it to the client through a cookie.

The client sends that session ID with subsequent requests.

### Cookies vs Sessions

| Comparison | Cookies | Sessions |
|---|---|---|
| Storage | Client | Server |
| Data | Stored in browser | Stored in server-side session store |
| Security | Depends on cookie attributes and application design | Session data stays server-side |
| Size | Limited | Depends on session storage |
| Lifetime | Configurable | Configurable |
| Identification | Cookie value | Usually identified by session ID |

**Interview point:** Cookies are a client-side storage mechanism, while sessions are a server-side state management mechanism. A cookie is commonly used to carry the session ID.

## 63. What is CSRF?

CSRF stands for Cross-Site Request Forgery.

It is an attack where an attacker tricks an authenticated user's browser into sending an unwanted request to a website.

### Example

Suppose a user is logged into a banking application.

The browser has an authentication cookie.

The user visits a malicious website, which attempts to trigger a request to the banking application.

Because the browser may automatically attach the authentication cookie, the request could be authenticated.

### How Can We Prevent CSRF?

1. Use CSRF tokens.
2. Configure appropriate SameSite cookie attributes.
3. Validate request origins where appropriate.
4. Avoid using GET requests for state-changing operations.
5. Use appropriate framework security configurations.

**Interview point:** CSRF is particularly relevant to cookie-based authentication because browsers automatically send matching cookies with requests.

## 64. What is SSRF?

SSRF stands for Server-Side Request Forgery.

It is a security vulnerability where an attacker tricks a server into making requests to unintended destinations.

### Example

Suppose an application provides an API that fetches an image from a URL supplied by the user.

If the application does not validate the destination, an attacker might attempt to make the server access internal services.

### How Can We Prevent SSRF?

1. Validate user-provided URLs.
2. Use an allowlist of permitted domains.
3. Block access to private and internal IP ranges.
4. Validate DNS resolution and redirects.
5. Restrict outbound network access.
6. Avoid unnecessary server-side URL fetching.

**Interview point:** SSRF targets the server's ability to make outbound requests, not the browser's ability to access resources.

## 65. What is the Difference Between Authentication and Authorization in JWT-Based APIs?

### Authentication

The server validates the JWT to establish the identity of the user.

Typical checks include:

- Token signature.
- Token expiration.
- Issuer.
- Audience.
- Relevant token claims.

### Authorization

After authentication, the application checks whether the user has permission to access the requested resource.

Example JWT payload:

```json
{
  "sub": "101",
  "role": "ADMIN",
  "iss": "auth-service",
  "exp": 1795500000
}
```

Example:

An authenticated user with the ADMIN role can access an admin endpoint.

A normal user may receive:

```http
HTTP/1.1 403 Forbidden
```

**Interview point:** A valid JWT does not automatically mean that the user can access every API.

## 66. What is the Difference Between 401 and 403 in JWT Authentication?

| 401 Unauthorized | 403 Forbidden |
|---|---|
| Missing or invalid authentication credentials | Authenticated user lacks required permission |
| Invalid JWT signature | Valid JWT but insufficient role |
| Expired JWT | User lacks access to requested resource |
| Authentication failure | Authorization failure |

### Example 401

```http
GET /api/users
Authorization: Bearer invalid-token
```

Response:

```http
HTTP/1.1 401 Unauthorized
```

### Example 403

```http
GET /api/admin/users
Authorization: Bearer <valid-user-token>
```

Response:

```http
HTTP/1.1 403 Forbidden
```

## 67. What is the Difference Between PUT and PATCH from a Practical Perspective?

Suppose the existing user resource is:

```json
{
  "id": 101,
  "name": "John",
  "email": "john@example.com",
  "age": 25
}
```

### PUT Request

```http
PUT /api/users/101
Content-Type: application/json
```

```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "age": 26
}
```

PUT replaces the resource representation with the supplied representation.

### PATCH Request

```http
PATCH /api/users/101
Content-Type: application/merge-patch+json
```

```json
{
  "name": "John Smith"
}
```

PATCH modifies only the specified field according to the chosen patch format.

**Interview point:** PUT is idempotent. PATCH is not necessarily idempotent; its idempotency depends on the operation being performed.

## 68. What is the Difference Between an API and a REST API?

### API

API stands for Application Programming Interface.

It defines how two software components communicate with each other.

APIs can use different architectural styles and protocols.

Examples:

- REST API.
- SOAP API.
- GraphQL API.
- gRPC API.

### REST API

A REST API is an API designed using REST architectural constraints.

It commonly uses HTTP methods, resource-based URLs, and representations such as JSON.

| API | REST API |
|---|---|
| General communication interface | API following REST principles |
| Can use different protocols | Commonly uses HTTP |
| Can follow different architectures | Follows REST architectural constraints |

**Interview point:** Every REST API is an API, but every API is not a REST API.

## 69. What is the Difference Between REST API and WebSocket?

### REST API

REST APIs commonly use a request-response communication model.

The client sends a request, and the server returns a response.

Example:

```http
GET /api/messages
```

### WebSocket

WebSocket provides a persistent, full-duplex communication channel between client and server.

Both parties can send messages independently over the established connection.

Example use cases:

- Real-time chat applications.
- Live notifications.
- Multiplayer games.
- Live dashboards.

### REST vs WebSocket

| Comparison | REST | WebSocket |
|---|---|---|
| Communication | Request-response | Full-duplex |
| Connection | Individual HTTP exchanges | Persistent connection |
| Direction | Client initiates requests | Both sides can send messages |
| Usage | CRUD operations | Real-time communication |
| Protocol | HTTP | Starts with HTTP handshake, then WebSocket |

**Interview point:** Use REST for conventional resource operations and WebSocket when continuous two-way communication is required.

## 70. How Would You Debug a REST API That Works in Postman but Fails in the Browser?

This is a common practical interview question.

An API may work in Postman but fail in a browser because browsers enforce additional security policies.

### Possible Reasons

1. CORS configuration issues.
2. Missing authorization headers.
3. Cookie SameSite restrictions.
4. HTTPS and mixed-content issues.
5. Preflight OPTIONS request failure.
6. Incorrect request headers.
7. Browser security restrictions.

### Troubleshooting Steps

**Step 1: Open Browser Developer Tools**

Check the Network tab.

**Step 2: Check the Actual Request**

Verify:
- Request URL.
- HTTP method.
- Request headers.
- Request body.
- Response status code.

**Step 3: Check the OPTIONS Request**

If the browser sends a preflight request, verify that the server responds with the required CORS headers.

**Step 4: Check Authentication**

Verify that the browser sends the required authorization header or cookies.

**Step 5: Check Console Errors**

Look for CORS, mixed-content, and other browser security errors.

**Step 6: Compare With Postman**

Compare the request headers, body, URL, and authentication details.

**Interview point:** Postman is not subject to browser-enforced CORS restrictions. Therefore, an API working in Postman does not guarantee that it will work in a browser.


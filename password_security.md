# Password Security – Complete Interview Guide

## 1. What is Password Hashing?

Password hashing is the process of converting a plain-text password into a fixed-length, irreversible hash value using a hashing algorithm.

When a user registers:

1. User enters a password.
2. Backend receives the password.
3. Backend hashes the password using a password-hashing algorithm.
4. Backend stores the hashed password in the database.

When a user logs in:

1. User enters username and password.
2. Backend retrieves the stored password hash from the database.
3. Backend verifies the entered password against the stored hash.
4. If the password matches, authentication succeeds.
5. Otherwise, authentication fails.

**Important:** We should never store plain-text passwords in the database.

### Example

Original password:

```text
password123
```

Stored password hash (illustrative):

```text
$2b$12$exampleHashValue...
```

The actual hash depends on the algorithm and salt.

---

## 2. Why Do We Need Password Hashing?

Password hashing protects user credentials even if the database is compromised.

### Advantages

1. Passwords are not stored in plain text.
2. Attackers cannot directly retrieve the original password from a secure hash.
3. Protects user credentials in case of database leaks.
4. Makes brute-force and dictionary attacks more expensive when using a suitable password-hashing algorithm.
5. Helps protect users who reuse passwords across multiple applications.

**Interview point:**

Password hashing is a one-way process. We cannot directly decrypt a hashed password to get the original password.

---

## 3. What Is the Difference Between Hashing and Encryption?

This is one of the most frequently asked interview questions.

### Hashing

Hashing converts input data into a fixed-length hash value using a hashing algorithm.

- One-way process.
- Cannot be reversed to retrieve the original input.
- Mainly used for password storage and data integrity verification.
- Examples: SHA-256, SHA-512, bcrypt, Argon2.

### Encryption

Encryption converts readable data into unreadable ciphertext using an encryption algorithm and a key.

- Two-way process.
- Can be reversed using the appropriate decryption key.
- Used to protect sensitive data during storage and transmission.
- Examples: AES, RSA.

### Hashing vs Encryption

| Comparison | Hashing | Encryption |
|---|---|---|
| Purpose | Data integrity and password verification | Data confidentiality |
| Process | One-way | Two-way |
| Reversible | No | Yes, with the correct key |
| Key required | Usually no (password hashing may use additional parameters) | Yes |
| Output | Hash value | Ciphertext |
| Original data recovery | Not possible directly | Possible using the decryption key |
| Common algorithms | SHA-256, bcrypt, Argon2 | AES, RSA |
| Common usage | Password storage | Sensitive data protection |

**Real-world examples:**

- Hashing: Store user passwords securely in a database.
- Encryption: Store sensitive customer information so it can be decrypted by authorized systems.

**Interview answer:**

"Hashing is a one-way process used mainly for password storage and integrity verification, whereas encryption is a two-way process used to protect data confidentiality. Encrypted data can be decrypted using a key, but a properly generated hash cannot be reversed to obtain the original data."

---

## 4. What Is bcrypt?

bcrypt is a password-hashing algorithm specifically designed for securely storing passwords.

It is based on the Blowfish cipher and uses a configurable work factor (cost factor) to make password hashing computationally expensive.

### Why do we use bcrypt?

1. Designed specifically for password hashing.
2. Automatically generates and incorporates a random salt.
3. Supports a configurable cost factor.
4. Makes brute-force attacks more expensive.
5. Same password can produce different hashes because of different salts.

### Example

```java
BCryptPasswordEncoder encoder =
        new BCryptPasswordEncoder();

String password = "password123";

String hashedPassword = encoder.encode(password);

System.out.println(hashedPassword);
```

The generated hash is stored in the database.

### How to verify a password using bcrypt?

```java
boolean isMatch =
        encoder.matches(password, hashedPassword);

if (isMatch) {
    System.out.println("Password is correct");
} else {
    System.out.println("Invalid password");
}
```

**Important:**

- `encode()` generates the password hash.
- `matches()` verifies the entered password against the stored hash.
- We do not decrypt the stored password.

---

## 5. What Is Salt in Password Hashing?

A salt is a random value added to a password before hashing.

It ensures that the same password does not produce the same hash across different password records.

### Why do we need salt?

Consider two users:

User A password:

```text
password123
```

User B password:

```text
password123
```

Without salt, using the same deterministic hashing algorithm and parameters, both passwords would generate the same hash.

This makes it easier for attackers to identify users with identical passwords and use precomputed hash tables.

With different random salts:

```text
User A:
Password + Salt A = Hash A

User B:
Password + Salt B = Hash B
```

Even though both users have the same password, their resulting hashes will be different.

### Advantages of Salt

1. Prevents identical passwords from having identical stored hashes.
2. Makes precomputed rainbow-table attacks ineffective.
3. Makes attackers calculate hashes separately for each salt.
4. Improves password storage security.

**Important interview point:**

A salt does not need to be secret. It is generally stored alongside the password hash.

bcrypt automatically generates and stores the salt as part of its encoded hash.

---

## 6. What Is the Difference Between Salt and Pepper?

Both are additional values used to improve password security, but they are different.

### Salt

- Random value generated for each password.
- Unique for each password record.
- Stored alongside the password hash.
- Does not need to be secret.

### Pepper

- A secret value added during password hashing.
- Usually shared across password records.
- Stored separately from the database, such as in a secrets manager.
- Must remain secret.

### Salt vs Pepper

| Comparison | Salt | Pepper |
|---|---|---|
| Purpose | Prevent identical password hashes | Add an additional secret factor |
| Value | Random | Secret |
| Unique per user | Yes, normally | Usually shared |
| Storage | Alongside password hash | Separate secure storage |
| Must be secret | No | Yes |
| Protection | Rainbow-table attacks | Adds protection against database-only compromise |

**Interview point:**

Salt is public and unique per password, whereas pepper is secret and stored separately from the password database.

---

## 7. What Is a Cost Factor in bcrypt?

The cost factor determines how computationally expensive the bcrypt hashing operation will be.

A higher cost factor requires more computation and increases the time required to generate a password hash.

Example:

```java
BCryptPasswordEncoder encoder =
        new BCryptPasswordEncoder(12);
```

Here, `12` represents the bcrypt cost factor.

### Important points

- Higher cost factor means more computation.
- It makes brute-force attacks more expensive.
- It also increases the time required for legitimate password verification.
- The cost should be selected based on security requirements and available server resources.

**Interview question: Why do we use a cost factor?**

Answer:

"We use a cost factor to control the computational complexity of password hashing. A higher cost factor makes password guessing more expensive for attackers. We choose an appropriate value based on our application's performance and security requirements."

---

## 8. SHA-256 vs bcrypt

This is another important interview question.

| Comparison | SHA-256 | bcrypt |
|---|---|---|
| Type | General-purpose cryptographic hash | Password-hashing algorithm |
| Speed | Very fast | Intentionally slow |
| Salt | Not automatically included | Automatically handles salt |
| Cost factor | No configurable work factor | Configurable cost factor |
| Password storage | Not recommended alone | Designed for password storage |
| Brute-force resistance | Less suitable for password storage | Better suited for password storage |

**Important interview point:**

SHA-256 is a secure cryptographic hash function, but it is very fast. Attackers can test many password guesses quickly.

bcrypt is intentionally computationally expensive, making brute-force attacks more difficult.

For modern password storage, Argon2id is also an excellent choice.

---

## 9. What Are the Different Password Hashing Algorithms?

| Algorithm | Description | Recommendation |
|---|---|---|
| MD5 | Fast cryptographic hash | Not secure for password storage |
| SHA-1 | Older cryptographic hash | Not recommended |
| SHA-256 | General-purpose cryptographic hash | Not recommended alone for passwords |
| SHA-512 | General-purpose cryptographic hash | Not recommended alone for passwords |
| bcrypt | Adaptive password-hashing algorithm | Recommended |
| scrypt | Memory-hard password-hashing algorithm | Recommended |
| Argon2id | Memory-hard password-hashing algorithm | Excellent modern choice |
| PBKDF2 | Password-based key derivation function | Recommended when configured appropriately |

---

## 10. How Is Password Hashing Implemented in Spring Boot?

Spring Security provides the `PasswordEncoder` interface to handle password hashing and verification.

### Step 1: Configure PasswordEncoder

```java
@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

### Step 2: Hash Password During Registration

```java
@Service
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void registerUser(User user) {

        String encodedPassword =
                passwordEncoder.encode(user.getPassword());

        user.setPassword(encodedPassword);

        userRepository.save(user);
    }
}
```

### Step 3: Verify Password During Login

```java
boolean isValid =
        passwordEncoder.matches(
            request.getPassword(),
            user.getPassword()
        );

if (isValid) {
    System.out.println("Login successful");
} else {
    System.out.println("Invalid credentials");
}
```

### Important Spring Security classes

| Class / Interface | Responsibility |
|---|---|
| `PasswordEncoder` | Interface for password encoding and verification |
| `BCryptPasswordEncoder` | Implements bcrypt password hashing |
| `Argon2PasswordEncoder` | Implements Argon2 password hashing |
| `Pbkdf2PasswordEncoder` | Implements PBKDF2 password hashing |
| `DelegatingPasswordEncoder` | Supports multiple password encoding formats |

---

## 11. Frequently Asked Password Security Interview Questions

| Interview Question | Short Answer |
|---|---|
| What is password hashing? | Converting a password into a one-way hash value. |
| Why should we hash passwords? | To avoid storing plain-text passwords. |
| What is the difference between hashing and encryption? | Hashing is one-way; encryption is reversible using a key. |
| What is bcrypt? | An adaptive password-hashing algorithm. |
| Why is bcrypt better than SHA-256 for password storage? | bcrypt is intentionally slow and supports configurable computational cost. |
| What is salt? | A random value added to a password before hashing. |
| Why do we use salt? | To ensure identical passwords generate different hashes. |
| Is salt secret? | No, it is stored alongside the hash. |
| What is pepper? | A secret additional value stored separately from the password database. |
| What is a cost factor? | A parameter controlling the computational cost of bcrypt. |
| Can we decrypt a hashed password? | No, password hashing is one-way. |
| Does bcrypt generate the same hash for the same password? | Not necessarily, because it generates a random salt. |
| How do we verify a bcrypt password? | Using `matches(rawPassword, encodedPassword)`. |
| Can we use SHA-256 for password storage? | Not alone; use a dedicated password-hashing algorithm. |
| What is Argon2? | A modern memory-hard password-hashing algorithm. |
| Where should passwords be stored? | Store securely hashed passwords in the database, never plain text. |

---

## 12. Best Answer to Speak in an Interview

If the interviewer asks, **"How do you store passwords securely in a Spring Boot application?"**, you can answer:

"In a Spring Boot application, we should never store passwords in plain text. We use a password-hashing algorithm such as bcrypt or Argon2 to convert the password into a secure hash before storing it in the database.

During registration, we use the `PasswordEncoder` interface and its implementation, such as `BCryptPasswordEncoder`, to encode the password.

During login, we use the `matches()` method to compare the entered password with the stored hash.

bcrypt automatically generates a random salt and uses a configurable cost factor to make password hashing computationally expensive.

This helps protect user credentials even if the password database is compromised."

---

## 13. Important Concepts to Revise Before an Interview

- Password hashing
- Hashing vs encryption
- bcrypt
- Salt and Pepper
- Cost factor
- SHA-256 vs bcrypt
- bcrypt vs Argon2
- PasswordEncoder in Spring Security
- encode() vs matches()
- Password storage best practices
- Rainbow-table attacks
- Brute-force attacks

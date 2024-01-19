CREATE TABLE accounts (
  id                 VARCHAR(255) PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id            VARCHAR(255) NOT NULL,
  type               VARCHAR(255),
  provider           VARCHAR(255),
  provider_account_id VARCHAR(255) NOT NULL,
  refresh_token      VARCHAR(255),
  access_token       VARCHAR(255),
  expires_at         INT,
  token_type         VARCHAR(255),
  scope              VARCHAR(255),
  id_token           VARCHAR(255),
  session_state      VARCHAR(255),
  oauth_token_secret VARCHAR(255),
  oauth_token        VARCHAR(255),
  CONSTRAINT accounts_unique_provider_provider_account_id UNIQUE (provider, provider_account_id),
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE sessions (
  id            VARCHAR(255) PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_token VARCHAR(255) UNIQUE NOT NULL,
  user_id       VARCHAR(255) NOT NULL,
  expires       TIMESTAMPTZ,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE verificationtokens (
  identifier VARCHAR(255),
  token      VARCHAR(255) PRIMARY KEY,
  expires    TIMESTAMPTZ,
  CONSTRAINT verificationtokens_unique_identifier_token UNIQUE (identifier, token)
);

CREATE TABLE complaints (
  id                VARCHAR(255) PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           VARCHAR(255) NOT NULL,
  addresses         VARCHAR(255),
  categoryComplaint VARCHAR(255),
  notes             VARCHAR(255),
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now(),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE payments (
  id               VARCHAR(255) PRIMARY KEY DEFAULT uuid_generate_v4(),
  name             VARCHAR(255),
  user_id          VARCHAR(255) NOT NULL,
  paymentHours     TIMESTAMPTZ DEFAULT now(),
  bankAccountName  VARCHAR(255),
  created_at       TIMESTAMPTZ DEFAULT now(),
  updated_at       TIMESTAMPTZ DEFAULT now(),
  addresses        VARCHAR(255),
  bankName         VARCHAR(255),
  transferAmount   INT,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE bookings (
  id           VARCHAR(255) PRIMARY KEY DEFAULT uuid_generate_v4(),
  name         VARCHAR(255),
  phone_number VARCHAR(255),
  email        VARCHAR(255),
  message      VARCHAR(255),
  property_id  INT,
  agreement    BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE pdfguides (
  id          VARCHAR(255) PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        VARCHAR(255),
  phone_number VARCHAR(255),
  email       VARCHAR(255),
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now(),
  agreement   BOOLEAN DEFAULT true
);

CREATE TABLE users (
  id            VARCHAR(255) PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          VARCHAR(255),
  email         VARCHAR(255) UNIQUE,
  email_verified TIMESTAMPTZ DEFAULT now(),
  password      VARCHAR(255),
  role          VARCHAR(255) DEFAULT 'client',
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

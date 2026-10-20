CREATE TABLE donations (
  donation_id TEXT PRIMARY KEY,
  amount REAL NOT NULL,
  created_date_utc TEXT NOT NULL,
  display_name TEXT,
  donor_id TEXT,
  donor_is_recipient INTEGER NOT NULL DEFAULT 0,
  event_id TEXT,
  is_reg_fee INTEGER NOT NULL DEFAULT 0,
  message TEXT,
  participant_id TEXT,
  recipient_name TEXT,
  team_id TEXT,
  first_seen_at TEXT NOT NULL DEFAULT (datetime('now'))
);

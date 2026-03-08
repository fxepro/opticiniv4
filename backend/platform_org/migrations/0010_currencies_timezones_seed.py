"""
Create org.currencies and org.timezones tables, then seed all three
reference tables: countries, currencies, timezones.
"""
from django.db import migrations


SQL_TABLES = """
CREATE TABLE IF NOT EXISTS org.currencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(3) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    symbol VARCHAR(5) NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS org.timezones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(64) NOT NULL UNIQUE,
    label VARCHAR(120) NOT NULL DEFAULT '',
    utc_offset SMALLINT NOT NULL DEFAULT 0
);
"""

SQL_REVERSE_TABLES = """
DROP TABLE IF EXISTS org.timezones CASCADE;
DROP TABLE IF EXISTS org.currencies CASCADE;
"""

# ── Countries (ISO 3166-1 alpha-2, major economies + compliance-relevant) ──
SQL_SEED_COUNTRIES = """
INSERT INTO org.countries (id, code, name, region_group) VALUES
  (gen_random_uuid(), 'US', 'United States', 'US'),
  (gen_random_uuid(), 'GB', 'United Kingdom', 'EU'),
  (gen_random_uuid(), 'DE', 'Germany', 'EU'),
  (gen_random_uuid(), 'FR', 'France', 'EU'),
  (gen_random_uuid(), 'IT', 'Italy', 'EU'),
  (gen_random_uuid(), 'ES', 'Spain', 'EU'),
  (gen_random_uuid(), 'NL', 'Netherlands', 'EU'),
  (gen_random_uuid(), 'BE', 'Belgium', 'EU'),
  (gen_random_uuid(), 'SE', 'Sweden', 'EU'),
  (gen_random_uuid(), 'NO', 'Norway', 'EU'),
  (gen_random_uuid(), 'DK', 'Denmark', 'EU'),
  (gen_random_uuid(), 'FI', 'Finland', 'EU'),
  (gen_random_uuid(), 'IE', 'Ireland', 'EU'),
  (gen_random_uuid(), 'AT', 'Austria', 'EU'),
  (gen_random_uuid(), 'CH', 'Switzerland', 'EU'),
  (gen_random_uuid(), 'PT', 'Portugal', 'EU'),
  (gen_random_uuid(), 'PL', 'Poland', 'EU'),
  (gen_random_uuid(), 'CZ', 'Czech Republic', 'EU'),
  (gen_random_uuid(), 'RO', 'Romania', 'EU'),
  (gen_random_uuid(), 'LU', 'Luxembourg', 'EU'),
  (gen_random_uuid(), 'CA', 'Canada', 'US'),
  (gen_random_uuid(), 'MX', 'Mexico', 'OTHER'),
  (gen_random_uuid(), 'BR', 'Brazil', 'OTHER'),
  (gen_random_uuid(), 'AR', 'Argentina', 'OTHER'),
  (gen_random_uuid(), 'CO', 'Colombia', 'OTHER'),
  (gen_random_uuid(), 'CL', 'Chile', 'OTHER'),
  (gen_random_uuid(), 'JP', 'Japan', 'APAC'),
  (gen_random_uuid(), 'CN', 'China', 'APAC'),
  (gen_random_uuid(), 'IN', 'India', 'APAC'),
  (gen_random_uuid(), 'KR', 'South Korea', 'APAC'),
  (gen_random_uuid(), 'AU', 'Australia', 'APAC'),
  (gen_random_uuid(), 'NZ', 'New Zealand', 'APAC'),
  (gen_random_uuid(), 'SG', 'Singapore', 'APAC'),
  (gen_random_uuid(), 'HK', 'Hong Kong', 'APAC'),
  (gen_random_uuid(), 'TW', 'Taiwan', 'APAC'),
  (gen_random_uuid(), 'MY', 'Malaysia', 'APAC'),
  (gen_random_uuid(), 'ID', 'Indonesia', 'APAC'),
  (gen_random_uuid(), 'TH', 'Thailand', 'APAC'),
  (gen_random_uuid(), 'PH', 'Philippines', 'APAC'),
  (gen_random_uuid(), 'VN', 'Vietnam', 'APAC'),
  (gen_random_uuid(), 'AE', 'United Arab Emirates', 'OTHER'),
  (gen_random_uuid(), 'SA', 'Saudi Arabia', 'OTHER'),
  (gen_random_uuid(), 'IL', 'Israel', 'OTHER'),
  (gen_random_uuid(), 'ZA', 'South Africa', 'OTHER'),
  (gen_random_uuid(), 'NG', 'Nigeria', 'OTHER'),
  (gen_random_uuid(), 'EG', 'Egypt', 'OTHER'),
  (gen_random_uuid(), 'KE', 'Kenya', 'OTHER'),
  (gen_random_uuid(), 'TR', 'Turkey', 'OTHER'),
  (gen_random_uuid(), 'RU', 'Russia', 'OTHER'),
  (gen_random_uuid(), 'UA', 'Ukraine', 'EU')
ON CONFLICT (code) DO NOTHING;
"""

# ── Currencies (ISO 4217, major + common) ──
SQL_SEED_CURRENCIES = """
INSERT INTO org.currencies (id, code, name, symbol) VALUES
  (gen_random_uuid(), 'USD', 'US Dollar', '$'),
  (gen_random_uuid(), 'EUR', 'Euro', '€'),
  (gen_random_uuid(), 'GBP', 'British Pound', '£'),
  (gen_random_uuid(), 'JPY', 'Japanese Yen', '¥'),
  (gen_random_uuid(), 'CNY', 'Chinese Yuan', '¥'),
  (gen_random_uuid(), 'INR', 'Indian Rupee', '₹'),
  (gen_random_uuid(), 'CAD', 'Canadian Dollar', 'CA$'),
  (gen_random_uuid(), 'AUD', 'Australian Dollar', 'A$'),
  (gen_random_uuid(), 'CHF', 'Swiss Franc', 'CHF'),
  (gen_random_uuid(), 'SEK', 'Swedish Krona', 'kr'),
  (gen_random_uuid(), 'NOK', 'Norwegian Krone', 'kr'),
  (gen_random_uuid(), 'DKK', 'Danish Krone', 'kr'),
  (gen_random_uuid(), 'NZD', 'New Zealand Dollar', 'NZ$'),
  (gen_random_uuid(), 'SGD', 'Singapore Dollar', 'S$'),
  (gen_random_uuid(), 'HKD', 'Hong Kong Dollar', 'HK$'),
  (gen_random_uuid(), 'KRW', 'South Korean Won', '₩'),
  (gen_random_uuid(), 'BRL', 'Brazilian Real', 'R$'),
  (gen_random_uuid(), 'MXN', 'Mexican Peso', 'MX$'),
  (gen_random_uuid(), 'ZAR', 'South African Rand', 'R'),
  (gen_random_uuid(), 'AED', 'UAE Dirham', 'د.إ'),
  (gen_random_uuid(), 'SAR', 'Saudi Riyal', '﷼'),
  (gen_random_uuid(), 'TRY', 'Turkish Lira', '₺'),
  (gen_random_uuid(), 'PLN', 'Polish Zloty', 'zł'),
  (gen_random_uuid(), 'CZK', 'Czech Koruna', 'Kč'),
  (gen_random_uuid(), 'ILS', 'Israeli Shekel', '₪'),
  (gen_random_uuid(), 'MYR', 'Malaysian Ringgit', 'RM'),
  (gen_random_uuid(), 'THB', 'Thai Baht', '฿'),
  (gen_random_uuid(), 'IDR', 'Indonesian Rupiah', 'Rp'),
  (gen_random_uuid(), 'PHP', 'Philippine Peso', '₱'),
  (gen_random_uuid(), 'NGN', 'Nigerian Naira', '₦'),
  (gen_random_uuid(), 'KES', 'Kenyan Shilling', 'KSh'),
  (gen_random_uuid(), 'EGP', 'Egyptian Pound', 'E£'),
  (gen_random_uuid(), 'COP', 'Colombian Peso', 'COL$'),
  (gen_random_uuid(), 'CLP', 'Chilean Peso', 'CL$'),
  (gen_random_uuid(), 'ARS', 'Argentine Peso', 'AR$'),
  (gen_random_uuid(), 'RON', 'Romanian Leu', 'lei'),
  (gen_random_uuid(), 'UAH', 'Ukrainian Hryvnia', '₴'),
  (gen_random_uuid(), 'RUB', 'Russian Ruble', '₽'),
  (gen_random_uuid(), 'VND', 'Vietnamese Dong', '₫'),
  (gen_random_uuid(), 'TWD', 'Taiwan Dollar', 'NT$')
ON CONFLICT (code) DO NOTHING;
"""

# ── Timezones (UTC-12 to UTC+14, every 30-min/45-min offset + common IANA) ──
SQL_SEED_TIMEZONES = """
INSERT INTO org.timezones (id, name, label, utc_offset) VALUES
  (gen_random_uuid(), 'UTC-12:00', '(UTC-12:00) Baker Island', -720),
  (gen_random_uuid(), 'UTC-11:00', '(UTC-11:00) American Samoa', -660),
  (gen_random_uuid(), 'UTC-10:00', '(UTC-10:00) Hawaii', -600),
  (gen_random_uuid(), 'UTC-09:30', '(UTC-09:30) Marquesas Islands', -570),
  (gen_random_uuid(), 'UTC-09:00', '(UTC-09:00) Alaska', -540),
  (gen_random_uuid(), 'UTC-08:00', '(UTC-08:00) Pacific Time (US/Canada)', -480),
  (gen_random_uuid(), 'UTC-07:00', '(UTC-07:00) Mountain Time (US/Canada)', -420),
  (gen_random_uuid(), 'UTC-06:00', '(UTC-06:00) Central Time (US/Canada)', -360),
  (gen_random_uuid(), 'UTC-05:00', '(UTC-05:00) Eastern Time (US/Canada)', -300),
  (gen_random_uuid(), 'UTC-04:00', '(UTC-04:00) Atlantic Time (Canada)', -240),
  (gen_random_uuid(), 'UTC-03:30', '(UTC-03:30) Newfoundland', -210),
  (gen_random_uuid(), 'UTC-03:00', '(UTC-03:00) Buenos Aires, São Paulo', -180),
  (gen_random_uuid(), 'UTC-02:00', '(UTC-02:00) South Georgia', -120),
  (gen_random_uuid(), 'UTC-01:00', '(UTC-01:00) Azores, Cape Verde', -60),
  (gen_random_uuid(), 'UTC+00:00', '(UTC+00:00) London, Dublin, Lisbon', 0),
  (gen_random_uuid(), 'UTC+01:00', '(UTC+01:00) Berlin, Paris, Rome, Madrid', 60),
  (gen_random_uuid(), 'UTC+02:00', '(UTC+02:00) Cairo, Athens, Helsinki', 120),
  (gen_random_uuid(), 'UTC+03:00', '(UTC+03:00) Moscow, Riyadh, Nairobi', 180),
  (gen_random_uuid(), 'UTC+03:30', '(UTC+03:30) Tehran', 210),
  (gen_random_uuid(), 'UTC+04:00', '(UTC+04:00) Dubai, Baku', 240),
  (gen_random_uuid(), 'UTC+04:30', '(UTC+04:30) Kabul', 270),
  (gen_random_uuid(), 'UTC+05:00', '(UTC+05:00) Karachi, Tashkent', 300),
  (gen_random_uuid(), 'UTC+05:30', '(UTC+05:30) Mumbai, New Delhi, Colombo', 330),
  (gen_random_uuid(), 'UTC+05:45', '(UTC+05:45) Kathmandu', 345),
  (gen_random_uuid(), 'UTC+06:00', '(UTC+06:00) Dhaka, Almaty', 360),
  (gen_random_uuid(), 'UTC+06:30', '(UTC+06:30) Yangon', 390),
  (gen_random_uuid(), 'UTC+07:00', '(UTC+07:00) Bangkok, Jakarta, Ho Chi Minh', 420),
  (gen_random_uuid(), 'UTC+08:00', '(UTC+08:00) Singapore, Hong Kong, Beijing', 480),
  (gen_random_uuid(), 'UTC+08:45', '(UTC+08:45) Eucla', 525),
  (gen_random_uuid(), 'UTC+09:00', '(UTC+09:00) Tokyo, Seoul', 540),
  (gen_random_uuid(), 'UTC+09:30', '(UTC+09:30) Adelaide, Darwin', 570),
  (gen_random_uuid(), 'UTC+10:00', '(UTC+10:00) Sydney, Melbourne', 600),
  (gen_random_uuid(), 'UTC+10:30', '(UTC+10:30) Lord Howe Island', 630),
  (gen_random_uuid(), 'UTC+11:00', '(UTC+11:00) Solomon Islands', 660),
  (gen_random_uuid(), 'UTC+12:00', '(UTC+12:00) Auckland, Fiji', 720),
  (gen_random_uuid(), 'UTC+12:45', '(UTC+12:45) Chatham Islands', 765),
  (gen_random_uuid(), 'UTC+13:00', '(UTC+13:00) Samoa, Tonga', 780),
  (gen_random_uuid(), 'UTC+14:00', '(UTC+14:00) Line Islands', 840)
ON CONFLICT (name) DO NOTHING;
"""


class Migration(migrations.Migration):

    dependencies = [
        ("platform_org", "0009_organization_org_id_audit_fields"),
    ]

    operations = [
        migrations.RunSQL(SQL_TABLES, SQL_REVERSE_TABLES),
        migrations.RunSQL(SQL_SEED_COUNTRIES, migrations.RunSQL.noop),
        migrations.RunSQL(SQL_SEED_CURRENCIES, migrations.RunSQL.noop),
        migrations.RunSQL(SQL_SEED_TIMEZONES, migrations.RunSQL.noop),
    ]

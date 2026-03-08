"""
Reclassify region_group: NA, EU, ASIA, MEA, LATAM, AU.
"""
from django.db import migrations

SQL_FORWARD = """
-- North America
UPDATE org.countries SET region_group = 'NA'
WHERE code IN ('US', 'CA', 'MX');

-- EU (keep existing EU countries, add CH, UA, RU, TR, NO)
UPDATE org.countries SET region_group = 'EU'
WHERE code IN (
    'GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'SE', 'NO', 'DK', 'FI',
    'IE', 'AT', 'CH', 'PT', 'PL', 'CZ', 'RO', 'LU', 'UA', 'RU'
);

-- Asia
UPDATE org.countries SET region_group = 'ASIA'
WHERE code IN (
    'JP', 'CN', 'IN', 'KR', 'SG', 'HK', 'TW', 'MY', 'ID', 'TH', 'PH', 'VN'
);

-- MEA (Middle East & Africa)
UPDATE org.countries SET region_group = 'MEA'
WHERE code IN ('AE', 'SA', 'IL', 'ZA', 'NG', 'EG', 'KE', 'TR');

-- Latin America
UPDATE org.countries SET region_group = 'LATAM'
WHERE code IN ('BR', 'AR', 'CO', 'CL');

-- Australia
UPDATE org.countries SET region_group = 'AU'
WHERE code IN ('AU', 'NZ');
"""

SQL_REVERSE = "SELECT 1;"


class Migration(migrations.Migration):
    dependencies = [("platform_org", "0014_region_currency")]
    operations = [migrations.RunSQL(SQL_FORWARD, SQL_REVERSE)]

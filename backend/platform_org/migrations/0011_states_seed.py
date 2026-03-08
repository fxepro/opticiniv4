"""
Create org.states table and seed states/provinces for major countries.
"""
from django.db import migrations


SQL_TABLE = """
CREATE TABLE IF NOT EXISTS org.states (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country_id UUID NOT NULL REFERENCES org.countries(id) ON DELETE CASCADE,
    code VARCHAR(10) NOT NULL,
    name VARCHAR(255) NOT NULL,
    UNIQUE(country_id, code)
);
CREATE INDEX IF NOT EXISTS states_country_idx ON org.states (country_id);
"""

SQL_REVERSE_TABLE = "DROP TABLE IF EXISTS org.states CASCADE;"

# Helper: insert states for a country by its ISO code
# We use a sub-select to look up country_id by code
def _ins(country_code, rows):
    values = ",\n  ".join(
        f"(gen_random_uuid(), (SELECT id FROM org.countries WHERE code='{country_code}'), '{code}', '{name}')"
        for code, name in rows
    )
    return f"INSERT INTO org.states (id, country_id, code, name) VALUES\n  {values}\nON CONFLICT (country_id, code) DO NOTHING;\n"


US_STATES = [
    ("AL", "Alabama"), ("AK", "Alaska"), ("AZ", "Arizona"), ("AR", "Arkansas"),
    ("CA", "California"), ("CO", "Colorado"), ("CT", "Connecticut"), ("DE", "Delaware"),
    ("FL", "Florida"), ("GA", "Georgia"), ("HI", "Hawaii"), ("ID", "Idaho"),
    ("IL", "Illinois"), ("IN", "Indiana"), ("IA", "Iowa"), ("KS", "Kansas"),
    ("KY", "Kentucky"), ("LA", "Louisiana"), ("ME", "Maine"), ("MD", "Maryland"),
    ("MA", "Massachusetts"), ("MI", "Michigan"), ("MN", "Minnesota"), ("MS", "Mississippi"),
    ("MO", "Missouri"), ("MT", "Montana"), ("NE", "Nebraska"), ("NV", "Nevada"),
    ("NH", "New Hampshire"), ("NJ", "New Jersey"), ("NM", "New Mexico"), ("NY", "New York"),
    ("NC", "North Carolina"), ("ND", "North Dakota"), ("OH", "Ohio"), ("OK", "Oklahoma"),
    ("OR", "Oregon"), ("PA", "Pennsylvania"), ("RI", "Rhode Island"), ("SC", "South Carolina"),
    ("SD", "South Dakota"), ("TN", "Tennessee"), ("TX", "Texas"), ("UT", "Utah"),
    ("VT", "Vermont"), ("VA", "Virginia"), ("WA", "Washington"), ("WV", "West Virginia"),
    ("WI", "Wisconsin"), ("WY", "Wyoming"), ("DC", "District of Columbia"),
]

CA_PROVINCES = [
    ("AB", "Alberta"), ("BC", "British Columbia"), ("MB", "Manitoba"),
    ("NB", "New Brunswick"), ("NL", "Newfoundland and Labrador"), ("NS", "Nova Scotia"),
    ("NT", "Northwest Territories"), ("NU", "Nunavut"), ("ON", "Ontario"),
    ("PE", "Prince Edward Island"), ("QC", "Quebec"), ("SK", "Saskatchewan"), ("YT", "Yukon"),
]

GB_NATIONS = [
    ("ENG", "England"), ("SCT", "Scotland"), ("WLS", "Wales"), ("NIR", "Northern Ireland"),
]

DE_STATES = [
    ("BW", "Baden-Württemberg"), ("BY", "Bavaria"), ("BE", "Berlin"), ("BB", "Brandenburg"),
    ("HB", "Bremen"), ("HH", "Hamburg"), ("HE", "Hesse"), ("MV", "Mecklenburg-Vorpommern"),
    ("NI", "Lower Saxony"), ("NW", "North Rhine-Westphalia"), ("RP", "Rhineland-Palatinate"),
    ("SL", "Saarland"), ("SN", "Saxony"), ("ST", "Saxony-Anhalt"),
    ("SH", "Schleswig-Holstein"), ("TH", "Thuringia"),
]

IN_STATES = [
    ("AN", "Andaman and Nicobar Islands"), ("AP", "Andhra Pradesh"), ("AR", "Arunachal Pradesh"),
    ("AS", "Assam"), ("BR", "Bihar"), ("CH", "Chandigarh"), ("CT", "Chhattisgarh"),
    ("DL", "Delhi"), ("GA", "Goa"), ("GJ", "Gujarat"), ("HR", "Haryana"),
    ("HP", "Himachal Pradesh"), ("JK", "Jammu and Kashmir"), ("JH", "Jharkhand"),
    ("KA", "Karnataka"), ("KL", "Kerala"), ("LA", "Ladakh"), ("MP", "Madhya Pradesh"),
    ("MH", "Maharashtra"), ("MN", "Manipur"), ("ML", "Meghalaya"), ("MZ", "Mizoram"),
    ("NL", "Nagaland"), ("OR", "Odisha"), ("PB", "Punjab"), ("RJ", "Rajasthan"),
    ("SK", "Sikkim"), ("TN", "Tamil Nadu"), ("TG", "Telangana"), ("TR", "Tripura"),
    ("UP", "Uttar Pradesh"), ("UK", "Uttarakhand"), ("WB", "West Bengal"),
]

AU_STATES = [
    ("ACT", "Australian Capital Territory"), ("NSW", "New South Wales"),
    ("NT", "Northern Territory"), ("QLD", "Queensland"), ("SA", "South Australia"),
    ("TAS", "Tasmania"), ("VIC", "Victoria"), ("WA", "Western Australia"),
]

FR_REGIONS = [
    ("ARA", "Auvergne-Rhône-Alpes"), ("BFC", "Bourgogne-Franche-Comté"),
    ("BRE", "Brittany"), ("CVL", "Centre-Val de Loire"), ("COR", "Corsica"),
    ("GES", "Grand Est"), ("HDF", "Hauts-de-France"), ("IDF", "Île-de-France"),
    ("NOR", "Normandy"), ("NAQ", "Nouvelle-Aquitaine"), ("OCC", "Occitanie"),
    ("PDL", "Pays de la Loire"), ("PAC", "Provence-Alpes-Côte d''Azur"),
]

SQL_SEED = (
    _ins("US", US_STATES)
    + _ins("CA", CA_PROVINCES)
    + _ins("GB", GB_NATIONS)
    + _ins("DE", DE_STATES)
    + _ins("IN", IN_STATES)
    + _ins("AU", AU_STATES)
    + _ins("FR", FR_REGIONS)
)


class Migration(migrations.Migration):

    dependencies = [
        ("platform_org", "0010_currencies_timezones_seed"),
    ]

    operations = [
        migrations.RunSQL(SQL_TABLE, SQL_REVERSE_TABLE),
        migrations.RunSQL(SQL_SEED, migrations.RunSQL.noop),
    ]

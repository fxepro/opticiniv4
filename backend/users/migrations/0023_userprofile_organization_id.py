# Add organization_id to UserProfile for Account (org-level) access.

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0022_remove_billingaddress_subscription_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="userprofile",
            name="organization_id",
            field=models.UUIDField(blank=True, help_text="Current organization for Account/org-level access", null=True),
        ),
    ]

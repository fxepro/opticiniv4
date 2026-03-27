# Enable PostHog analytics by default for production deployments

from django.db import migrations


def enable_analytics_default(apps, schema_editor):
    SiteConfig = apps.get_model('site_settings', 'SiteConfig')
    try:
        config = SiteConfig.objects.get(pk=1)
        config.enable_analytics = True
        config.save()
    except SiteConfig.DoesNotExist:
        pass


def noop(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('site_settings', '0003_alter_siteconfig_site_name'),
    ]

    operations = [
        migrations.RunPython(enable_analytics_default, noop),
    ]

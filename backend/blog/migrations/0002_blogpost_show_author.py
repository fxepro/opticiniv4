# Generated manually for show_author

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='blogpost',
            name='show_author',
            field=models.BooleanField(
                default=True,
                help_text='When enabled, the author name appears in the post header on the public blog.',
            ),
        ),
    ]

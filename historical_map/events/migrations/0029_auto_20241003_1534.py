# Generated by Django 5.0.3 on 2024-10-03 13:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0028_auto_20241003_1519'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='historicalstate',
            name='presentCountries',
        ),
    ]

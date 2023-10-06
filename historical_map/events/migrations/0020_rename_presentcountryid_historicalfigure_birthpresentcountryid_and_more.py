# Generated by Django 4.1.2 on 2023-10-05 10:39

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0019_historicalstate_presentcountries'),
    ]

    operations = [
        migrations.RenameField(
            model_name='historicalfigure',
            old_name='presentCountryId',
            new_name='birthPresentCountryId',
        ),
        migrations.AlterField(
            model_name='historicalfigure',
            name='deathDate',
            field=models.CharField(blank=True, max_length=15, validators=[django.core.validators.RegexValidator('^-?\\d{1,4}$|^-?\\d{1,4}-\\d{2}$|^-?\\d{1,4}-\\d{2}-\\d{2}$', message='The date must have one of the following formats: YYYY, YYYY-MM, YYYY-MM-DD. Negative years are allowed.')]),
        ),
    ]
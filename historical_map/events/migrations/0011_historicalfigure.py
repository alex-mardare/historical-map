# Generated by Django 4.1.2 on 2022-11-30 19:03

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0010_alter_historicalevent_date_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='HistoricalFigure',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('birthDate', models.CharField(max_length=15, validators=[django.core.validators.RegexValidator('^-?\\d{1,4}$|^-?\\d{1,4}-\\d{2}$|^-?\\d{1,4}-\\d{2}-\\d{2}$', message='The date must have one of the following formats: YYYY, YYYY-MM, YYYY-MM-DD. Negative years are allowed.')])),
                ('deathDate', models.CharField(max_length=15, validators=[django.core.validators.RegexValidator('^-?\\d{1,4}$|^-?\\d{1,4}-\\d{2}$|^-?\\d{1,4}-\\d{2}-\\d{2}$', message='The date must have one of the following formats: YYYY, YYYY-MM, YYYY-MM-DD. Negative years are allowed.')])),
                ('historicalStateId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='events.historicalstate')),
                ('presentCountryId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='events.presentcountry')),
            ],
        ),
    ]
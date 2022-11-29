# Generated by Django 4.1.2 on 2022-11-13 19:47

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0004_alter_eventcategory_options_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='PresentCountry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('code', models.CharField(max_length=5)),
            ],
            options={
                'verbose_name_plural': 'present countries',
                'ordering': ['name'],
            },
        ),
        migrations.AddField(
            model_name='historicalevent',
            name='approximateRealLocation',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='historicalevent',
            name='latitude',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True, validators=[django.core.validators.MinValueValidator(-180), django.core.validators.MaxValueValidator(180)]),
        ),
        migrations.AlterField(
            model_name='historicalevent',
            name='longitude',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True, validators=[django.core.validators.MinValueValidator(-180), django.core.validators.MaxValueValidator(180)]),
        ),
        migrations.AddField(
            model_name='historicalevent',
            name='presentCountryId',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='events.presentcountry'),
        ),
    ]
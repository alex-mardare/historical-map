# Generated by Django 4.1.2 on 2022-11-19 18:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0007_historicalstate_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historicalstate',
            name='dateFrom',
            field=models.CharField(blank=True, max_length=15),
        ),
        migrations.AlterField(
            model_name='historicalstate',
            name='dateTo',
            field=models.CharField(blank=True, max_length=15),
        ),
    ]

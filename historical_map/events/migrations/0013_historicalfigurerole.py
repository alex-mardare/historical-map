# Generated by Django 4.1.2 on 2022-12-02 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0012_rename_historicalstateid_historicalfigure_birthhistoricalstateid'),
    ]

    operations = [
        migrations.CreateModel(
            name='HistoricalFigureRole',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.CharField(blank=True, max_length=10000)),
            ],
        ),
    ]

# Generated by Django 4.1.2 on 2022-10-27 12:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0003_eventcategory_historicalevent_eventcategoryid'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='eventcategory',
            options={'ordering': ['name'], 'verbose_name_plural': 'event categories'},
        ),
        migrations.AlterField(
            model_name='historicalevent',
            name='eventCategoryId',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='events.eventcategory'),
        ),
    ]

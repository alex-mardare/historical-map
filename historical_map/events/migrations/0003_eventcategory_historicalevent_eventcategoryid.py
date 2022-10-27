# Generated by Django 4.1.2 on 2022-10-27 11:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_historicalevent_createdat_historicalevent_updatedat_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='EventCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.AddField(
            model_name='historicalevent',
            name='eventCategoryId',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='events.eventcategory'),
        ),
    ]

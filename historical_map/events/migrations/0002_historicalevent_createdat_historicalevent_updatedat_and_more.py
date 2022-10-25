# Generated by Django 4.1.2 on 2022-10-25 19:02

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='historicalevent',
            name='createdAt',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='historicalevent',
            name='updatedAt',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='historicalevent',
            name='latitude',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True),
        ),
        migrations.AlterField(
            model_name='historicalevent',
            name='longitude',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True),
        ),
        migrations.AlterField(
            model_name='historicalevent',
            name='time',
            field=models.TimeField(blank=True, null=True),
        ),
    ]
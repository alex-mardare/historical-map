# Generated by Django 5.0.3 on 2025-01-03 16:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0030_historicalstate_presentcountries'),
    ]

    operations = [
        migrations.RenameField(
            model_name='eventcategory',
            old_name='createdAt',
            new_name='created_at',
        ),
        migrations.RenameField(
            model_name='eventcategory',
            old_name='createdBy',
            new_name='created_by',
        ),
        migrations.RenameField(
            model_name='eventcategory',
            old_name='updatedAt',
            new_name='updated_at',
        ),
        migrations.RenameField(
            model_name='eventcategory',
            old_name='updatedBy',
            new_name='updated_by',
        ),
        migrations.RenameField(
            model_name='eventfigurerole',
            old_name='createdAt',
            new_name='created_at',
        ),
        migrations.RenameField(
            model_name='eventfigurerole',
            old_name='createdBy',
            new_name='created_by',
        ),
        migrations.RenameField(
            model_name='eventfigurerole',
            old_name='updatedAt',
            new_name='updated_at',
        ),
        migrations.RenameField(
            model_name='eventfigurerole',
            old_name='updatedBy',
            new_name='updated_by',
        ),
        migrations.RenameField(
            model_name='historicalevent',
            old_name='createdAt',
            new_name='created_at',
        ),
        migrations.RenameField(
            model_name='historicalevent',
            old_name='createdBy',
            new_name='created_by',
        ),
        migrations.RenameField(
            model_name='historicalevent',
            old_name='updatedAt',
            new_name='updated_at',
        ),
        migrations.RenameField(
            model_name='historicalevent',
            old_name='updatedBy',
            new_name='updated_by',
        ),
        migrations.RenameField(
            model_name='historicalfigure',
            old_name='createdAt',
            new_name='created_at',
        ),
        migrations.RenameField(
            model_name='historicalfigure',
            old_name='createdBy',
            new_name='created_by',
        ),
        migrations.RenameField(
            model_name='historicalfigure',
            old_name='updatedAt',
            new_name='updated_at',
        ),
        migrations.RenameField(
            model_name='historicalfigure',
            old_name='updatedBy',
            new_name='updated_by',
        ),
        migrations.RenameField(
            model_name='historicalfigurerole',
            old_name='createdAt',
            new_name='created_at',
        ),
        migrations.RenameField(
            model_name='historicalfigurerole',
            old_name='createdBy',
            new_name='created_by',
        ),
        migrations.RenameField(
            model_name='historicalfigurerole',
            old_name='updatedAt',
            new_name='updated_at',
        ),
        migrations.RenameField(
            model_name='historicalfigurerole',
            old_name='updatedBy',
            new_name='updated_by',
        ),
        migrations.RenameField(
            model_name='historicalstate',
            old_name='createdAt',
            new_name='created_at',
        ),
        migrations.RenameField(
            model_name='historicalstate',
            old_name='createdBy',
            new_name='created_by',
        ),
        migrations.RenameField(
            model_name='historicalstate',
            old_name='updatedAt',
            new_name='updated_at',
        ),
        migrations.RenameField(
            model_name='historicalstate',
            old_name='updatedBy',
            new_name='updated_by',
        ),
        migrations.RenameField(
            model_name='historicalstatepresentcountryperiod',
            old_name='createdAt',
            new_name='created_at',
        ),
        migrations.RenameField(
            model_name='historicalstatepresentcountryperiod',
            old_name='createdBy',
            new_name='created_by',
        ),
        migrations.RenameField(
            model_name='historicalstatepresentcountryperiod',
            old_name='updatedAt',
            new_name='updated_at',
        ),
        migrations.RenameField(
            model_name='historicalstatepresentcountryperiod',
            old_name='updatedBy',
            new_name='updated_by',
        ),
        migrations.RenameField(
            model_name='presentcountry',
            old_name='createdAt',
            new_name='created_at',
        ),
        migrations.RenameField(
            model_name='presentcountry',
            old_name='createdBy',
            new_name='created_by',
        ),
        migrations.RenameField(
            model_name='presentcountry',
            old_name='updatedAt',
            new_name='updated_at',
        ),
        migrations.RenameField(
            model_name='presentcountry',
            old_name='updatedBy',
            new_name='updated_by',
        ),
    ]

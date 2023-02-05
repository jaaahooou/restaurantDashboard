# Generated by Django 4.1.6 on 2023-02-05 10:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dish',
            name='photo',
        ),
        migrations.RemoveField(
            model_name='orderdish',
            name='image',
        ),
        migrations.AddField(
            model_name='order',
            name='isBrought',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='order',
            name='isDone',
            field=models.BooleanField(default=False),
        ),
    ]

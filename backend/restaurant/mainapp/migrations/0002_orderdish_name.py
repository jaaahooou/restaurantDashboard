# Generated by Django 4.1.6 on 2023-02-05 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderdish',
            name='name',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]

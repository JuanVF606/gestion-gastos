# Generated by Django 5.0.7 on 2024-07-28 22:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_profile'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Profile',
        ),
    ]

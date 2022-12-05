# Generated by Django 4.1.3 on 2022-11-19 15:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_user_is_doctor"),
    ]

    operations = [
        migrations.AddField(
            model_name="doctor",
            name="first_name",
            field=models.CharField(default=None, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="doctor",
            name="last_name",
            field=models.CharField(default=None, max_length=100),
            preserve_default=False,
        ),
    ]
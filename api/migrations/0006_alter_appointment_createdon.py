# Generated by Django 4.1.3 on 2022-11-20 11:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0005_appointment"),
    ]

    operations = [
        migrations.AlterField(
            model_name="appointment",
            name="createdOn",
            field=models.DateTimeField(),
        ),
    ]
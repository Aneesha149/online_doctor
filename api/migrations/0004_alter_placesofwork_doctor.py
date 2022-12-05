# Generated by Django 4.1.3 on 2022-11-19 16:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0003_doctor_first_name_doctor_last_name"),
    ]

    operations = [
        migrations.AlterField(
            model_name="placesofwork",
            name="doctor",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="places_of_works",
                to="api.doctor",
            ),
        ),
    ]
# Generated by Django 4.1 on 2023-05-17 05:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("dashboard", "0004_rename_sectorname_industry_sector_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="year",
            name="id",
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]

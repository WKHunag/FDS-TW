# Generated by Django 4.1 on 2023-05-18 02:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("dashboard", "0008_alter_industry_advertising_and_more"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="industry",
            options={
                "ordering": ["Year"],
                "verbose_name": "Industry Bill",
                "verbose_name_plural": "Industry Bill",
            },
        ),
        migrations.AlterModelOptions(
            name="marketing",
            options={
                "ordering": ["Year"],
                "verbose_name": "Marketing Bill",
                "verbose_name_plural": "Marketing Bill",
            },
        ),
        migrations.AlterModelOptions(
            name="primary",
            options={
                "ordering": ["Year"],
                "verbose_name": "Primary Bill",
                "verbose_name_plural": "Primary Bill",
            },
        ),
        migrations.AlterModelOptions(
            name="stageshare",
            options={
                "ordering": ["Year"],
                "verbose_name": "Stage Share",
                "verbose_name_plural": "Stage Share",
            },
        ),
        migrations.AlterModelOptions(
            name="year",
            options={
                "ordering": ["Year"],
                "verbose_name": "Year",
                "verbose_name_plural": "Year",
            },
        ),
        migrations.AddField(
            model_name="industrycrossprimary",
            name="Industry",
            field=models.CharField(
                blank=True, default="", max_length=100, null=True, verbose_name="Name"
            ),
        ),
    ]

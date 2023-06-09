# Generated by Django 4.1 on 2023-05-17 06:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("dashboard", "0005_alter_year_id"),
    ]

    operations = [
        migrations.RenameField(
            model_name="industry",
            old_name="Accounting",
            new_name="accounting",
        ),
        migrations.RenameField(
            model_name="industry",
            old_name="Advertising",
            new_name="advertising",
        ),
        migrations.RenameField(
            model_name="industry",
            old_name="Energy",
            new_name="energy",
        ),
        migrations.RenameField(
            model_name="industry",
            old_name="FarmProduction",
            new_name="farmProduction",
        ),
        migrations.RenameField(
            model_name="industry",
            old_name="FinanceInsurance",
            new_name="financeInsurance",
        ),
        migrations.RenameField(
            model_name="industry",
            old_name="FoodProcess",
            new_name="foodProcess",
        ),
        migrations.RenameField(
            model_name="industry",
            old_name="FoodService",
            new_name="foodService",
        ),
        migrations.RenameField(
            model_name="industry",
            old_name="Packaging",
            new_name="packaging",
        ),
        migrations.RenameField(
            model_name="industry",
            old_name="RetailTrade",
            new_name="retailTrade",
        ),
        migrations.RenameField(
            model_name="industry",
            old_name="Trade",
            new_name="trade",
        ),
        migrations.RenameField(
            model_name="industry",
            old_name="Transportation",
            new_name="transportation",
        ),
        migrations.RenameField(
            model_name="industry",
            old_name="WholesaleTrade",
            new_name="wholesaleTrade",
        ),
        migrations.RenameField(
            model_name="industrycrossprimary",
            old_name="Compensation",
            new_name="compensation",
        ),
        migrations.RenameField(
            model_name="industrycrossprimary",
            old_name="ConsumptionOfFixedCapital",
            new_name="consumptionOfFixedCapital",
        ),
        migrations.RenameField(
            model_name="industrycrossprimary",
            old_name="Imports",
            new_name="imports",
        ),
        migrations.RenameField(
            model_name="industrycrossprimary",
            old_name="NetTaxes",
            new_name="netTaxes",
        ),
        migrations.RenameField(
            model_name="industrycrossprimary",
            old_name="OperatingSurplus",
            new_name="operatingSurplus",
        ),
        migrations.RenameField(
            model_name="industrycrossprimary",
            old_name="Total",
            new_name="total",
        ),
        migrations.RenameField(
            model_name="marketing",
            old_name="FarmShare",
            new_name="farmShare",
        ),
        migrations.RenameField(
            model_name="marketing",
            old_name="MarketingShare",
            new_name="marketingShare",
        ),
        migrations.RenameField(
            model_name="primary",
            old_name="Adjustment",
            new_name="adjustment",
        ),
        migrations.RenameField(
            model_name="primary",
            old_name="Compensation",
            new_name="compensation",
        ),
        migrations.RenameField(
            model_name="primary",
            old_name="ConsumptionOfFixedCapital",
            new_name="consumptionOfFixedCapital",
        ),
        migrations.RenameField(
            model_name="primary",
            old_name="Imports",
            new_name="imports",
        ),
        migrations.RenameField(
            model_name="primary",
            old_name="NetTaxes",
            new_name="netTaxes",
        ),
        migrations.RenameField(
            model_name="primary",
            old_name="OperatingSurplus",
            new_name="operatingSurplus",
        ),
        migrations.RenameField(
            model_name="stageshare",
            old_name="FarmGate",
            new_name="farmGate",
        ),
        migrations.RenameField(
            model_name="stageshare",
            old_name="ProcessGate",
            new_name="processGate",
        ),
        migrations.RenameField(
            model_name="stageshare",
            old_name="TradeGate",
            new_name="tradeGate",
        ),
        migrations.RenameField(
            model_name="stageshare",
            old_name="TransGate",
            new_name="transGate",
        ),
    ]

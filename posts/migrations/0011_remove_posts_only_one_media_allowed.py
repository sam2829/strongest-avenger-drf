# Generated by Django 3.2.24 on 2024-02-25 09:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0010_alter_posts_image'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='posts',
            name='only_one_media_allowed',
        ),
    ]

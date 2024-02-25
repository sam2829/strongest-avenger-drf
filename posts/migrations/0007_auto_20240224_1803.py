# Generated by Django 3.2.24 on 2024-02-24 18:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0006_auto_20240224_1757'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='posts',
            name='only_one_media_allowed',
        ),
        migrations.RemoveField(
            model_name='posts',
            name='image',
        ),
        migrations.RemoveField(
            model_name='posts',
            name='video',
        ),
        migrations.AddField(
            model_name='posts',
            name='media_file',
            field=models.ImageField(blank=True, default='../default_post_atyvne', null=True, upload_to='images/'),
        ),
    ]

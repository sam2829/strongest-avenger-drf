# Generated by Django 3.2.24 on 2024-02-24 17:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0004_alter_posts_media_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='media_file',
            field=models.FileField(default='../default_post_atyvne', upload_to='media/'),
        ),
    ]
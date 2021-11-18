from django.db import models
from rest_framework import serializers
from rest_framework.compat import md_filter_add_syntax_highlight
from .models import Anime
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token

class AnimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anime
        fields = ['id', 'title', 'description', 'score']



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']

        extra_kwargs = {'password': {
            'write_only':True,
            'required':True,
        }}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user
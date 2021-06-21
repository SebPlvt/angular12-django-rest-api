from rest_framework import serializers
from  todo_list.models import TodoList

class TodoListSerializer(serializers.ModelSerializer):

    class Meta:
        model = TodoList
        fields = ('id', 'title', 'description','published')
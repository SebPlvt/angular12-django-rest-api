from django.shortcuts import render

# Create your views here.

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from todo_list.models import TodoList
from todo_list.serializers import TodoListSerializer
from rest_framework.decorators import api_view

@api_view(['GET', 'POST', 'DELETE'])
def todo_list(request):

    # GET list of todo, POST a new todo, DELETE all todo

    if request.method == 'GET':
        todo = TodoList.objects.all()

        title = request.GET.get('title', None)
        if title is not None:
            todo = todo.filter(title__icontains=title)

        todo_serializer = TodoListSerializer(todo, many=True)
        return JsonResponse(todo_serializer.data, safe=False)

    elif request.method == 'POST':
        todo_list_data = JSONParser().parse(request)
        todo_serializer = TodoListSerializer(data=todo_list_data)
        if todo_serializer.is_valid():
            todo_serializer.save()
            return JsonResponse(todo_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(todo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        count = TodoList.objects.all().delete()
        return JsonResponse({'message': '{} Tutorials were deleted successfully!'.format(count[0])},
                            status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def todo(request, pk):
    # find todo_list by pk (id)
    try:
        todo = TodoList.objects.get(pk=pk)
    except TodoList.DoesNotExist:
        return JsonResponse({'message': 'The todo does not exist'},
            status=status.HTTP_404_NOT_FOUND)

    # GET / PUT / DELETE todo
    if request.method == 'GET':
        todo_serializer = TodoListSerializer(todo)
        return JsonResponse(todo_serializer.data)
    elif request.method == 'PUT':
            todo_list_data = JSONParser().parse(request)
            todo_serializer = TodoListSerializer(todo, data=todo_list_data)
            if todo_serializer.is_valid():
                todo_serializer.save()
                return JsonResponse(todo_serializer.data)
            return JsonResponse(todo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        todo.delete()
        return JsonResponse({'message': 'Todo was deleted successfully!'},
                            status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def todo_list_published(request):
    # GET all published todo
    todo_list = TodoList.objects.filter(published=True)

    if request.method == 'GET':
        todo_serializer = TodoListSerializer(todo_list, many=True)
        return JsonResponse(todo_serializer.data, safe=False)
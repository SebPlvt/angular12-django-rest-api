from django.conf.urls import url
from todo_list import views

urlpatterns = [
    url(r'^api/todo_list$', views.todo_list),
    url(r'^api/todo_list/(?P<pk>[0-9]+)$', views.todo),
    url(r'^api/todo_list/published$', views.todo_list_published)
]
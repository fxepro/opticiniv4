from django.urls import path
from . import views

urlpatterns = [
    path("assets/", views.asset_list),
    path("assets/<uuid:asset_id>/", views.asset_detail),
]

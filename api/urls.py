from django.urls import re_path, include
from .views import DoctorRetrieveAPIView,  UserRetrieveUpdateAPIView, RegistrationAPIView, LoginAPIView, DoctorViewSet, AppointmentList
from rest_framework.routers import DefaultRouter

router = DefaultRouter(trailing_slash=False)
router.register(r'profiles', DoctorViewSet)
urlpatterns = [
    re_path(r'^', include(router.urls)),
    re_path(r'^user/?$', UserRetrieveUpdateAPIView.as_view()),
    re_path(r'^users/?$', RegistrationAPIView.as_view()),
    re_path(r'^users/login/?$', LoginAPIView.as_view()),
    re_path(r'^appointments/?$', AppointmentList.as_view()),
    re_path(r'^doctors/?$', DoctorRetrieveAPIView.as_view())
   
    
    # url(r'^doctors/(?<username>\w+)/?$', DoctorRetrieveAPIView.as_view())
]
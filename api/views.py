from rest_framework import generics, mixins, status, viewsets, serializers
from .models import Doctor, Appointment
from .renderers import DoctorJSONRenderer, UserJSONRenderer
from .serializers import DoctorSerializer, RegistrationSerializer, LoginSerializer, UserSerializer, AppointmentSerializer

from rest_framework.exceptions import NotFound
from rest_framework.generics import RetrieveAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView



class DoctorViewSet(mixins.CreateModelMixin, 
                     mixins.ListModelMixin,
                     mixins.RetrieveModelMixin,
                     viewsets.GenericViewSet):
    queryset = Doctor.objects.select_related('user')
    permission_classes = (IsAuthenticated,)
    renderer_classes = (DoctorJSONRenderer,)
    serializer_class = DoctorSerializer

    def create(self, request):
        
        serializer_data = request.data.get('profile', {})
        serializer_data['user'] = request.user
        serializer = self.serializer_class(
        data=serializer_data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        profile = Doctor.objects.get(user=request.user)
        if(profile):
            self.kwargs['pk'] = profile.pk
            
        return super().retrieve(request, *args, **kwargs)

        

class DoctorRetrieveAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    # renderer_classes = (DoctorJSONRenderer,)
    serializer_class = DoctorSerializer
    

    def get_queryset(self):
       return Doctor.objects.all()

    def list(self, request):
        address_filter = self.request.query_params.get('address')
        speciality_filter = self.request.query_params.get('speciality')
        queryset = self.get_queryset()
        if address_filter:
            queryset = Doctor.objects.filter(address__contains=f'{address_filter}')
        if speciality_filter:
            queryset = Doctor.objects.filter(speciality__contains=f'{speciality_filter}')
        

        serializer = DoctorSerializer(queryset, many=True)
        return Response(serializer.data)


class RegistrationAPIView(APIView):
    
    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = RegistrationSerializer

    def post(self, request):
        user = request.data.get('user', {})

       
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginAPIView(APIView):
    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = LoginSerializer

    def post(self, request):
        user = request.data.get('user', {})
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class UserRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):
       
        serializer = self.serializer_class(request.user)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        user_data = request.data.get('user', {})

        serializer_data = {
            'username': user_data.get('username', request.user.username),
            'email': user_data.get('email', request.user.email),

            'profile': {
                'bio': user_data.get('bio', request.user.profile.bio),
                'image': user_data.get('image', request.user.profile.image)
            }
        }

       
        serializer = self.serializer_class(
            request.user, data=serializer_data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


class AppointmentList(generics.ListCreateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        if(user.is_doctor):
            return Appointment.objects.filter(doctor=user)
        
        return Appointment.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    
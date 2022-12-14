from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response


class RegistrationAPIView(APIView):
    renderer_classes = (UserJSONRenderer,)
    serializer_class = RegistrationSerializer
    permission_classes = (AllowAny,)
    

    def post(self, request):
        user = request.data.get('user', {})
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
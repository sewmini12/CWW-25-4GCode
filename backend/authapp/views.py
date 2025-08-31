from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate

class LoginView(APIView):
	def post(self, request):
		# Accept any username and password for now
		return Response({'success': True, 'message': 'Login successful'}, status=status.HTTP_200_OK)

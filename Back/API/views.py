### Used before for testing on different possibility for views and response
# from django.db.models.fields import CommaSeparatedIntegerField
# from django.shortcuts import get_object_or_404, render, HttpResponse
# from rest_framework import serializers, views

# from django.http import JsonResponse
# from rest_framework.parsers import JSONParser
# from rest_framework.decorators import api_view, authentication_classes, permission_classes
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.decorators import APIView
# from rest_framework import generics
# from rest_framework import mixins
# from django.shortcuts import get_object_or_404

from .models import Anime
from .serializers import AnimeSerializer, UserSerializer
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User



#Using ModelViewSet we don't even need to define the mixins in the class, every usefull definition and arguments are automatically created
class AnimeViewSet(viewsets.ModelViewSet):
    queryset = Anime.objects.all()
    serializer_class= AnimeSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer



#using GenericViewSet we just have to precise the object, serializer and the model used, like Destroy or Update
'''
#using rest_framework to automatised the view functionnality, for the definition only
class AnimeViewSet(viewsets.GenericViewSet, mixins.ListModelMixin,
                   mixins.CreateModelMixin, mixins.RetrieveModelMixin,
                   mixins.DestroyModelMixin, mixins.UpdateModelMixin):
    queryset = Anime.objects.all()
    serializer_class = AnimeSerializer
'''

#viewset where we create mannually every functionnality and Response
'''
class AnimeViewSet(viewsets.ViewSet):

    def list(self, request):
        animes = Anime.objects.all()
        serializer = AnimeSerializer(animes, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = AnimeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk=None):
        queryset = Anime.objects.all()
        anime = get_object_or_404(queryset, pk=pk)
        serializer = AnimeSerializer(anime)
        return Response(serializer.data)

    def update(self, request, pk=None):
        anime = Anime.objects.get(pk=pk)

        serializer = AnimeSerializer(anime, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        anime = Anime.objects.get(pk=pk)
        anime.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

'''



#using genericAPIview, is the same as with APIview but the definition response are build internally
'''
class AnimeList(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = Anime.objects.all()
    serializer_class = AnimeSerializer

    def get(self, request):
        return self.list(request)

    def post(self, request):
        return self.create(request)

class AnimeDetails(generics.GenericAPIView, mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin, mixins.DestroyModelMixin):

    queryset = Anime.objects.all()
    serializer_class = AnimeSerializer
    lookup_field = 'id'

    def get(self, request, id):
        return self.retrieve(request, id=id)

    def put(self, request, id):
        return self.update(request, id=id)

    def delete(self, request, id):
        return self.destroy(request, id=id)
'''


#work as the class under, but using APIview we don't need to check the validation to be authorized to use GET, POST etc...
'''
class AnimeList(APIView):
    
    def get(self, request):
        animes = Anime.objects.all()   
        serializer = AnimeSerializer(animes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AnimeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 


class AnimeDetails(APIView):

    def get_object(self, id):
        try:
            return Anime.objects.get(id=id)

        except Anime.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    def get(self, request, id):
        anime = self.get_object(id) 
        serializer = AnimeSerializer(anime)
        return Response(serializer.data)

    def put(self, request, id):
        anime = self.get_object(id)         
        serializer = AnimeSerializer(anime, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        anime = self.get_object(id)
        anime.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

'''





#using api_view and defining evey usefull method (GET to receive, POST to add to the data base, PUT to update, DELETE to delete an object from the database)
'''
@api_view(['GET','POST'])
def anime_list(request):

    #get all anime for the user
    if request.method == 'GET':
        animes = Anime.objects.all()   
        serializer = AnimeSerializer(animes, many=True)
        return Response(serializer.data)

    elif request.method == 'POST': 
        serializer = AnimeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET','PUT','DELETE'])
def anime_details(request, pk):
    try:
        anime = Anime.objects.get(pk=pk)

    except Anime.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = AnimeSerializer(anime)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = AnimeSerializer(anime, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        anime.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

'''
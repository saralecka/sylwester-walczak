from django.core.cache import cache
from django.db.models import Q
from rest_framework import filters
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from books.models import Book
from books.serializers import BookSerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = (filters.OrderingFilter, filters.SearchFilter)
    search_fields = ["title", "author"]
    http_method_names = ["get", "post"]

    def get_queryset(self):
        cache_key = "book_queryset"
        cached_queryset = cache.get(cache_key)

        if cached_queryset:
            return cached_queryset

        queryset = super().get_queryset()
        search_query = self.request.query_params.get("search", None)

        if search_query:
            queryset = queryset.filter(
                Q(title__icontains=search_query) | Q(author__icontains=search_query)
            )

        cache.set(cache_key, queryset, timeout=600)  # 600 sekund = 10 minut

        return queryset

    def perform_create(self, serializer):
        serializer.save()

        cache_key = "book_queryset"
        cache.delete(cache_key)

    @action(detail=False, methods=["get"])
    def clear_cache(self, request):
        cache_key = "book_queryset"
        cache.delete(cache_key)
        return Response({"message": "Cache cleared"})

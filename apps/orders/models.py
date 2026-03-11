from django.db import models

from django.conf import settings
from apps.movies.models import Movie

class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    stripe_payment_id = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"Order {self.id} - {self.user.username} - {self.movie.title} - {self.status}"
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from apps.movies.models import Movie
import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY

class CreatePaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        movie_id = request.data.get("movie_id")

        try:
            movie = Movie.objects.get(id=movie_id)

            checkout_session = stripe.checkout.Session.create(
                payment_method_types=["card"],
                line_items=[
                    {
                        "price_data": {
                            "currency": "usd",
                            "product_data": {
                                "name": movie.title,
                            },
                            "unit_amount": int(movie.price * 100),
                        },
                        "quantity": 1,
                    }
                ],
                mode="payment",
                success_url="http://localhost:3000/success",
                cancel_url="http://localhost:3000/cancel",
            )

            return Response({"checkout_url": checkout_session.url})

        except Movie.DoesNotExist:
            return Response({"error": "Movie not found"}, status=404)
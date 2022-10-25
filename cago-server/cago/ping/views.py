from rest_framework.views import APIView, Response


class PingAPIView(APIView):
    def get(self, *args, **kwargs):
        return Response({"ping": "pong"})

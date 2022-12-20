from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import EventPaymentLogSerializer
from .models import EventPaymentLog

@api_view(['GET', 'POST'])
def EventPaymentLog(request):
    payment = EventPaymentLog.objects.all()
    serializer = EventPaymentLogSerializer(payment, many=True)
    return Response(serializer.data)
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from .serializers import ProductSerializer, CategorySerializer, OrdersSerializer
from .models import Category,Product
import json

@csrf_exempt
def addProduct(request):
    if request.method == 'POST':
        try:
            # Handling file upload
            product_image = request.FILES.get('product_image')
            data = request.POST.copy()
            data['product_image'] = product_image
            print("data ",data)

            serializer = ProductSerializer(data=data)
            
            if serializer.is_valid():
                serializer.save()

                res = {
                    'status': 'Successful',
                    'data': serializer.data,
                    'message': 'Product added successfully'
                }
                return JsonResponse(res)
            else:
                print("Validation error:", serializer.errors)
                return JsonResponse({'error': 'Validation error'}, status=400)

        except Exception as e:
            print("Exception:", str(e))
            return JsonResponse({'error': 'Internal Server Error'}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=400)

# API to fetch product details ..........................................
@csrf_exempt
def getProduct(request):
    if request.method == 'GET':
        try:
            category_id = request.GET.get('category_id')
            size = request.GET.get('size')
            print("category_id value : ",category_id)
            print("size value : ",size)

            if category_id and size:
                # return the tiles detail with particular size and category............
                result = Product.objects.filter(category=category_id,size=size)
                serializer = ProductSerializer(result, many=True)
                resp = {
                            'status': 'Successful',
                            'data': serializer.data,
                            'message': 'Product details fetched successfully'
                        }
                return JsonResponse(resp)
            
            if category_id:
                # return the list of all sizes of give category.
                values =  Product.objects.filter(category=category_id)  #.values('size').distinct()
                serializer = ProductSerializer(values, many=True)
                print("Result only category id :",serializer.data)
                resp = {
                            'status': 'Successful',
                            'data': serializer.data,
                            'message': 'subcategory details fetched successfully'
                        }
                return JsonResponse(resp)
           
            
            
            # if category_id:
            #     # return the list of all sizes of give category.
            #     size_values =  Product.objects.filter(category=category_id).values('size').distinct()
            #     result = [item['size'] for item in size_values]
            #     print("Result ",result)
            #     resp = {
            #                 'status': 'Successful',
            #                 'data': result,
            #                 'message': 'size details fetched successfully'
            #             }
            #     return JsonResponse(resp)
            # return JsonResponse({"okay":"done"})

        except Exception as e:
            print("Exception:", str(e))
            return JsonResponse({'error': 'Internal Server Error'}, status=500)




# API to add category ...................................................
@csrf_exempt
def addCategory(request):
    # print("View is called.")
    if request.method == 'POST':
        # print("Api hitted")
        try:
            category_image = request.FILES.get('category_image')
            data = request.POST.copy()
            data['category_image'] = category_image
            # data = json.loads(request.body)
            serializer = CategorySerializer(data=data)
            if serializer.is_valid():
                serializer.save()

                res = {
                        'status': 'Successful',
                        'data': data,
                        'message': 'Category added successfully'
                    }
                return JsonResponse(res)
            else: 
                print("Validation error:", serializer.errors)
                return JsonResponse({'error': 'Validation error'}, status=400)
            
        except Exception as e:
            print("Exception:", str(e))
            return JsonResponse({'error': 'Internal Server Error'}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=400)

# API to fetch category category ...................................................
@csrf_exempt
def getTilesCategory(request):
    if request.method == 'GET':
        try:
            categories = Category.objects.all()
            serializer = CategorySerializer(categories, many=True)
            resp = {
                        'status': 'Successful',
                        'data': serializer.data,
                        'message': 'Category details fetched successfully'
                    }
            return JsonResponse(resp)
        except Exception as e:
            print("Exception:", str(e))
            return JsonResponse({'error': 'Internal Server Error'}, status=500)





# API to place order ................................................................................
@csrf_exempt
def placeOrder(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            serializer = OrdersSerializer(data=data)
            if serializer.is_valid():
                serializer.save()

                res = {
                        'status': 'Successful',
                        'data': data,
                        'message': 'Order placed successfully'
                    }
                return JsonResponse(res)
            else: 
                print("Validation error:", serializer.errors)
                return JsonResponse({'error': 'Validation error'}, status=400)
            
        except Exception as e:
            print("Exception:", str(e))
            return JsonResponse({'error': 'Internal Server Error'}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=400)

    

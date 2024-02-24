# serializers.py in your app

from rest_framework import serializers
from .models import Category, Product, Orders

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'category_id','category_image']
    
    

class ProductSerializer(serializers.ModelSerializer):
    # category = CategorySerializer()
    class Meta:
        model = Product
        fields = ['id', 'product_name', 'size', 'product_id', 'category', 'product_details', 'product_image']

class OrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = ['id', 'order_id', 'product_id', 'merchant_name', 'merchant_mobile_no', 'price', 'quantity', 'order_date', 'mail_status', 'order_processed']

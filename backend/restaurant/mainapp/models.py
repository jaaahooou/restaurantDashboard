from django.db import models
from django.contrib.auth.models import User



class Room(models.Model):
    name = models.CharField(max_length = 20, null=True, blank=True)
    _id = models.AutoField(primary_key = True, editable=False)

    def __str__(self):
        return self.name


class Table(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    tableNumber = models.IntegerField(null=False, blank=False)
    numberOfPersons = models.IntegerField(null=False, blank=False, default =2)
    isOccupied = models.BooleanField(null=False, blank=False, default=False)

    def __str__(self):
        return str(self.tableNumber)

class DishCategory(models.Model):
    title = models.CharField(max_length=200, blank=False, null=False)
    
    def __str__(self):
        return self.title

class Dish(models.Model):
    category = models.ForeignKey(DishCategory, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    price = models.FloatField(default=0.00, blank=True)
    countInStock = models.IntegerField(null=False, blank=False, default=100)
    _id = models.AutoField(primary_key = True, editable=False)


    def __str__(self):
        return self.category.title + " - " + self.title + ": " + str(self.price)


class Order(models.Model):
    BLIK = "BLIK"
    CARD = "CARD"
    CASH = "CASH"
    PAYMENT_CHOICES = [
        (BLIK, "Blik"),
        (CARD, "Card"),
        (CASH, "Cash")
    ]
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=10, choices=PAYMENT_CHOICES, default=CASH)
    shipping = models.BooleanField(default= False)
    isPaid = models.BooleanField(default= False)
    createdAt = models.DateTimeField(auto_now_add=True)
    isDone = models.BooleanField(null=False, blank=False, default=False)
    isBrought = models.BooleanField(null=False, blank=False, default=False)
    tip = models.FloatField(default=0.00, blank=True)
    _id = models.AutoField(primary_key = True, editable=False)

    def __str__(self):
        return str()


class OrderDish(models.Model):
    dish = models.ForeignKey(Dish, on_delete=models.SET_NULL, null=True, blank = True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, blank = True)
    table = models.ForeignKey(Table,on_delete=models.SET_NULL, null=True, blank = True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.FloatField(blank=True)
    _id = models.AutoField(primary_key = True, editable=False)

    def __str__(self):
        return str(self.name)

class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
    address =models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode =models.CharField(max_length=200, null=True, blank=True)
    country =models.CharField(max_length=200, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places =2, null=True, blank=True)
    _id = models.AutoField(primary_key =True, editable=False)

    def __str__(self):
        return str(self.address)

    


    

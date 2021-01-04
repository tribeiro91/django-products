from django.db import models

class Product(models.Model):
    """
        Product's model class
    """

    name = models.CharField(max_length=120)
    description = models.TextField()
    price = models.DecimalField(decimal_places=2, max_digits=5)

    def _str_(self):
        return self.name

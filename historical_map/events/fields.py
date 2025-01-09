from django.core.validators import MaxValueValidator, MinValueValidator, RegexValidator
from django.db import models

from .validators import regexDateValidator

class CustomDateField(models.CharField):
    def __init__(self, blank_value=False, null_value=False, *args, **kwargs):
        kwargs.setdefault('blank', blank_value)
        kwargs.setdefault('max_length', 15)
        kwargs.setdefault('null', null_value)
        kwargs.setdefault('validators', [RegexValidator(regexDateValidator()[0], message=regexDateValidator()[1])])
        super().__init__(*args, **kwargs)

class CoordinateField(models.DecimalField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault('blank', True)
        kwargs.setdefault('decimal_places', 6)
        kwargs.setdefault('max_digits', 9)
        kwargs.setdefault('null', True)
        kwargs.setdefault('validators', [MinValueValidator(-180), MaxValueValidator(180)])
        super().__init__(*args, **kwargs)
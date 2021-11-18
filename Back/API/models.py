from django.db import models
# Create your models here.

class Anime(models.Model):
    
    class Score(models.TextChoices):
        one = '1', "⭐"
        two =  '2', "⭐⭐"
        three = '3', "⭐⭐⭐"
        four = '4', "⭐⭐⭐⭐"
        five = '5', "⭐⭐⭐⭐⭐"
        
    title = models.CharField(max_length=30)
    description = models.TextField()
    score = models.CharField(
        max_length=2,
        choices=Score.choices,
        default=Score.one 
    )

    def __str__(self):
        return self.name
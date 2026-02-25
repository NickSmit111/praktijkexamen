from django.db import models

class Activiteit(models.Model):
    datum = models.DateField()
    begin_tijd = models.TimeField()
    eind_tijd = models.TimeField()
    omschrijving = models.TextField()
    kosten = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f"{self.datum} - {self.omschrijving}"

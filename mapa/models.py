from django.db import models

class Banner(models.Model):
    def gerar_html(self):
        pass

class BlocoBanner(models.Model):
    titulo = models.CharField(max_length=255)
    texto = models.TextField()
    redirecionamento = models.URLField()
    banner = models.ForeignKey(Banner, on_delete=models.CASCADE, related_name='blocos')

    def __str__(self):
        return self.titulo

class Juncao(models.Model):
    coordenadas = models.CharField(max_length=255)
    vizinhos = models.ManyToManyField('self', blank=True)

class Local(models.Model):
    nome = models.CharField(max_length=255)
    juncao = models.ForeignKey(Juncao, on_delete=models.CASCADE, related_name='locais')
    banner = models.OneToOneField(Banner, on_delete=models.CASCADE, related_name='local')

    def __str__(self):
        return self.nome

class Construcao(models.Model):
    local = models.OneToOneField(Local, on_delete=models.CASCADE, related_name='construcao')

class Amigo(models.Model):
    nome = models.CharField(max_length=255)

    def coordenadas(self):
        pass

    def __str__(self):
        return self.nome
    
class Piso(models.Model):
    planta = models.CharField(max_length=255)
    construcao = models.ForeignKey(Construcao, on_delete=models.CASCADE, related_name='pisos')
    banner = models.OneToOneField(Banner, on_delete=models.CASCADE, related_name='piso')

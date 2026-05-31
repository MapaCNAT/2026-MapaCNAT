from django.db import models

class Local(models.Model):
    nome = models.CharField(max_length=255)

    def __str__(self):
        return self.nome

class Construcao(Local):
    andares = models.IntegerField()

class Juncao(Local):
    coordenadas = models.CharField(max_length=255)
    vizinhos = models.ManyToManyField('self', blank=True)

class Amigo(models.Model):
    nome = models.CharField(max_length=255)

    def coordenadas(self):
        pass

    def __str__(self):
        return self.nome

class Piso(models.Model):
    planta = models.CharField(max_length=255)
    construcao = models.ForeignKey(Construcao, on_delete=models.CASCADE, related_name='pisos')

class Banner(models.Model):
    piso = models.OneToOneField(Piso, on_delete=models.CASCADE, related_name='banner')
    local = models.OneToOneField(Local, on_delete=models.CASCADE, related_name='banner_local')

    def gerar_html(self):
        pass

class BlocoBanner(models.Model):
    titulo = models.CharField(max_length=255)
    texto = models.TextField()
    redirecionamento = models.URLField()
    banner = models.ForeignKey(Banner, on_delete=models.CASCADE, related_name='blocos')

    def __str__(self):
        return self.titulo

class Buscador(models.Model):
    amigos = models.ManyToManyField(Amigo, related_name='buscadores')
    locais = models.ManyToManyField(Local, related_name='buscadores')

    def gerar_rota(self, local_a, local_b):
        pass

    def buscar_local(self, nome):
        return Local.objects.filter(nome__icontains=nome)

    def buscar_amigo(self, nome):
        return Amigo.objects.filter(nome__icontains=nome)

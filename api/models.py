from django.db import models
import jwt

from datetime import datetime, timedelta

from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)

class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        ordering = ['-created_at', '-updated_at']


class UserManager(BaseUserManager):

    def create_user(self, username, email, password=None, is_doctor=False):
        if username is None:
            raise TypeError('Users must have a username.')
        if email is None:
            raise TypeError('Users must have an email address.')

        user = self.model(username=username, email=self.normalize_email(email), is_doctor=is_doctor)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, email, password):
      if password is None:
          raise TypeError('Superusers must have a password.')

      user = self.create_user(username, email, password)
      user.is_superuser = True
      user.is_staff = True
      user.save()
      return user

class User(AbstractBaseUser, PermissionsMixin, TimestampedModel):
    
    username = models.CharField(db_index=True, max_length=255, unique=True)

    
    email = models.EmailField(db_index=True, unique=True)

   
    is_active = models.BooleanField(default=True)

    
    is_staff = models.BooleanField(default=False)

    is_doctor = models.BooleanField(default=False)

    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return self.email

    @property
    def token(self):
        return self._generate_jwt_token()

    def get_full_name(self):
    
      return self.username

    def get_short_name(self):
        return self.username

    def _generate_jwt_token(self):
        dt = datetime.now() + timedelta(days=60)

        token = jwt.encode({
            'id': self.pk,
            'exp': int(dt.timestamp())
        }, settings.SECRET_KEY, algorithm='HS256')

        return token.decode('utf-8')




class College(models.Model):
    name = models.CharField(max_length=100, null=False)
    address = models.CharField(max_length=100, null=False)

class Doctor(TimestampedModel):
    user = models.OneToOneField('User', on_delete=models.CASCADE)
    GENDERS = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Others'),
    )
    first_name =  models.CharField(max_length=100, null=False)
    last_name =  models.CharField(max_length=100, null=False)
    age = models.PositiveSmallIntegerField(null=False)
    gender = models.CharField(max_length=1, choices=GENDERS)
    medical_license_number = models.CharField(max_length=100, null=False)
    designation = models.CharField(max_length=100, null=False)
    speciality = models.CharField(max_length=100, null=False)
    years_of_exp = models.PositiveBigIntegerField(null=False)
    address = models.CharField(max_length=100, null=False)

class EducationQualification(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name="education_qualifications")
    degree = models.CharField(max_length=100, null=False)
    percentage = models.PositiveBigIntegerField(null=False)
    college = models.ForeignKey(College, on_delete=models.CASCADE)

class PlacesOfWork(models.Model):
    name = models.CharField(max_length=100, null=False)
    city = models.CharField(max_length=100, null=False)
    state = models.CharField(max_length=100, null=False)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name="places_of_works")


class Appointment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="takeappointments")
    doctor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="appointments")
    datetime = models.DateTimeField(null=False)
    createdOn = models.DateTimeField(null=False)
    patientname = models.CharField(max_length=100, null=False)
    location = models.CharField(max_length=100, null=False)

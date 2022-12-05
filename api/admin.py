from django.contrib import admin

# Register your models here.
from api.models import User, Doctor, EducationQualification, PlacesOfWork

class UserAdmin(admin.ModelAdmin):
    pass


class DoctorAdmin(admin.ModelAdmin):
    pass

class PlaceAdmin(admin.ModelAdmin):
    pass

class EducationQualificationAdmin(admin.ModelAdmin):
    pass


admin.site.register(User, UserAdmin)
admin.site.register(Doctor, DoctorAdmin)
admin.site.register(PlacesOfWork, PlaceAdmin)
admin.site.register(EducationQualification, EducationQualificationAdmin)
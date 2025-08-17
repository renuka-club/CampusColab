from django.contrib import admin
from .models import * 

admin.site.register(CustomUser)
admin.site.register(Teachers)
admin.site.register(Students)
admin.site.register(Message)
admin.site.register(Course)
admin.site.register(Event)
admin.site.register(StudentCourse)
from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    collagename = models.CharField(max_length=1000, blank=True, null=True)
    collagecode = models.CharField(max_length=10, blank=True, null=True)

class Teachers(models.Model):
    admin=models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name="teacher")
    teachername=models.CharField(max_length=100)
    branch=models.CharField(max_length=20)
    phonenumber=models.IntegerField()
    address=models.TextField()
    password=models.CharField(max_length=20)
    

    def __str__(self):
        return f"{self.teachername} ({self.admin}) "
    
class Students(models.Model):
    admin=models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name="student")
    studentname=models.CharField(max_length=100)
    branch=models.CharField(max_length=20)
    phonenumber=models.IntegerField()
    rollno=models.TextField()
    password=models.CharField(max_length=20)
    
    def __str__(self):
        return f"{self.studentname} ({self.admin}) "


class Message(models.Model):
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="sent_messages")
    sender_name = models.CharField(max_length=255, blank=True)  # Store actual sender name
    receiver = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True, related_name="received_messages")
    content = models.TextField()
    message_type = models.CharField(max_length=50, choices=[("group", "Group"), ("private", "Private")])
    role = models.CharField(max_length=50)  # Store sender role explicitly
    timestamp = models.DateTimeField(auto_now_add=True)
    read_status = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.sender_name}: {self.content[:30]}"


class Course(models.Model):
    teachername=models.ForeignKey(Teachers, on_delete=models.CASCADE, related_name="added_teacher")
    name = models.CharField(max_length=255)
    instructor = models.CharField(max_length=255)
    duration = models.IntegerField()  # In weeks
    description = models.TextField()
    start_date = models.DateField()
    event_type = models.CharField(max_length=10, choices=[('Global', 'Global'), ('Local', 'Local')])
    attachment = models.FileField(upload_to='course_attachments/', null=True, blank=True)

    def __str__(self):
        return self.name
    



class Event(models.Model):
    teachername=models.ForeignKey(Teachers, on_delete=models.CASCADE, related_name="added_teacher_to_course")
    event_name = models.CharField(max_length=255)
    organizer = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    date = models.DateField()
    time = models.TimeField()
    venue = models.CharField(max_length=255)
    description = models.TextField()
    event_type = models.CharField(max_length=50, choices=[("Hackathon", "Hackathon"), ("Fest", "Fest"), ("Seminar", "Seminar"), ("Workshop", "Workshop"), ("Webinar", "Webinar")])
    attachment = models.FileField(upload_to="event_posters/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.event_name


class StudentCourse(models.Model):
    student = models.ForeignKey(Students, on_delete=models.CASCADE, related_name="student_courses")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="student_courses")
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("student", "course")  # Prevent duplicate course entries

    def __str__(self):
        return f"{self.student.studentname} added {self.course.name}"

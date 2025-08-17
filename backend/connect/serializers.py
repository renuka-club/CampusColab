from .models import CustomUser,Teachers,Students,Message,Course,Event
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields=["id","username","password","collagename","collagecode"]
        extra_kwargs={"password":{"write_only":True}}

    def create(self,validated_data):
        user=CustomUser.objects.create_user(**validated_data)
        user.save()
        return user
    

class UserViewSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields=["username","collagecode","collagename"]

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model=Teachers
        fields="__all__"
        extra_kwargs={"password":{"write_only":True}}

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Students
        fields="__all__"
        extra_kwargs={"password":{"write_only":True}}




class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(read_only=True)  # Use stored sender_name directly
    receiver_username = serializers.CharField(source='receiver.username', read_only=True, allow_null=True)
    
    class Meta:
        model = Message
        fields = ['id', 'sender', 'receiver', 'role', 'sender_name', 'receiver_username', 'content', 'message_type', 'timestamp', 'read_status']



class CourseSerializer(serializers.ModelSerializer):
    attachment = serializers.SerializerMethodField()

    def get_attachment(self, obj):
        if obj.attachment:
            clean_path = obj.attachment.name.replace('media/', '', 1)
            return f"{settings.MEDIA_URL}{clean_path}"   
        return None

    class Meta:
        model = Course
        fields = '__all__' 

from django.conf import settings


class EventSerializer(serializers.ModelSerializer):
    attachment = serializers.SerializerMethodField()

    def get_attachment(self, obj):
        if obj.attachment:
            clean_path = obj.attachment.name.replace('media/', '', 1)
            return f"{settings.MEDIA_URL}{clean_path}"
        return None

    class Meta:
        model = Event
        fields = "__all__"
     


class StudentProfileSerializer(serializers.ModelSerializer):
    collagename = serializers.CharField(source="admin.collagename", read_only=True)
    collagecode = serializers.CharField(source="admin.collagecode", read_only=True)

    class Meta:
        model = Students
        fields = ['studentname', 'branch', 'rollno', 'phonenumber', 'collagename', 'collagecode']


from .models import StudentCourse

class StudentCourseSerializer(serializers.ModelSerializer):
    course_details = CourseSerializer(source="course", read_only=True)

    class Meta:
        model = StudentCourse
        fields = ["id", "student", "course", "added_at", "course_details"]


class CourseFeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ["id", "name", "description", "start_date", "duration", "event_type"]

class EventFeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ["id", "event_name", "description", "date", "time", "venue", "event_type"]

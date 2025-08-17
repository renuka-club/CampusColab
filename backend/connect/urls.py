from django.urls import path,include
from .views import CreateUserView,TeacherCreateView,TeacherView,AdminLoginView,TeacherLoginView,StudentView,StudentLoginView,CourseView,EventView,get_messages, send_message, mark_as_read
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from .views import ProfileView,StudentProfileView
from .views import add_student_course, get_student_courses,get_feed_content

urlpatterns=[
    path("adminlogin",CreateUserView.as_view(),name="register"),
    path("adminloginview",AdminLoginView.as_view(),name="admin"),
   
    path("token",TokenObtainPairView.as_view(),name="get_token"),
    path("refresh",TokenRefreshView.as_view(),name="token_refresh"),
    path("api_-auth/",include("rest_framework.urls")),

    path("teachercreate",TeacherCreateView.as_view(),name="create-teacher"),
    path("teacherview",TeacherView.as_view(),name="viewteacher"),
    path("teacherdelete/<str:teacher_name>/", TeacherView.as_view(), name="delete-teacher"), 
    path("teacherlogin",TeacherLoginView.as_view(),name="viewlogin"),

    path("studentcreate",StudentView.as_view(),name="viewstudent"),
    path("studentview",StudentView.as_view(),name="viewstudent"),
    path("studentdelete/<str:student_name>/", StudentView.as_view(), name="delete-student"), 
    path("studentlogin",StudentLoginView.as_view(),name="viewlogin"),

    path('messages', get_messages, name='get_messages'),
    path('send-message', send_message, name='send_message'),
    path('mark-read/<int:message_id>', mark_as_read, name='mark_as_read'),

   
   path('add-course',CourseView.as_view(),name='Course'),
   path('delete-course/<str:coursename>/', CourseView.as_view(), name='delete-course'),

   path('add-event', EventView.as_view(), name='add-event'),
   path('delete-event/<str:eventname>/', EventView.as_view(), name='delete-event'),

   path('profileview',ProfileView.as_view(),name="profiles"),
   path('studentprofile',StudentProfileView.as_view(),name='studentprofile'),


   path("student-courses/", add_student_course, name="add_student_course"),
   path("student-courses/<str:student_name>/", get_student_courses, name="get_student_courses"),


   path("feed/", get_feed_content, name="get_feed_content"),
]
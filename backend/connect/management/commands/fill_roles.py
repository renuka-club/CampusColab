 
from django.core.management.base import BaseCommand
from connect.models import Message, Teachers, Students  # Update 'connect' with your actual app name

class Command(BaseCommand):
    help = "Fill missing role fields in existing messages"

    def handle(self, *args, **kwargs):
        messages = Message.objects.filter(role__isnull=True)  # Find messages with missing roles

        updated_count = 0

        for message in messages:
            sender = message.sender  # Get sender

            # Detect sender role
            role = "Admin"
            if Teachers.objects.filter(admin=sender).exists():
                role = "Teacher"
            elif Students.objects.filter(admin=sender).exists():
                role = "Student"

            # Update the message with the correct role
            message.role = role
            message.save()
            updated_count += 1

        self.stdout.write(self.style.SUCCESS(f"Successfully updated {updated_count} messages with roles."))

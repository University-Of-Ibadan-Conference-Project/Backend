from lib.mail import EmailManager
from user.models import User
from django.conf import settings



def get_affected_users() -> list[User]:
    """Selects the that do not have a event."""
    return User.objects.filter(
        event__isnull=True,
        is_active=True,
        is_staff=False,
        is_superuser=False,
    )


def send_email_notification(affected_users: list[User]):
    """Sends an email notification to the selected users."""
    for user in affected_users:
        EmailManager.send_mail(
            subject=f'Important: Re-Registration Required for the 6th International Conference on Scientific Research in Nigeria',
            recipients=[user.email],
            context={
                'user': user,
                're_registration_link': f'{settings.FRONTENT_URL}/event'
            },
            template_name='re_registration_notification.html',
        )
        print(user.email)


def run():
    affected_users = get_affected_users()
    send_email_notification(affected_users)

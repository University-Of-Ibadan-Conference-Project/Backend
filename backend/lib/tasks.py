import logging
from django.core.mail import send_mail
from django.conf import settings

Logger = logging.getLogger()


def send_mail_task(
    subject: str,
    recipients: list[str], 
    _from: str = 'noreply',
    html_message: str | None = None, 
    text_message: str | None = None,
) -> None:
    """Send emails asynchronously."""

    try:
        send_mail(
            from_email=f'{_from}@{settings.EMAIL_HOST_DOMAIN}',
            subject=subject,
            recipient_list=recipients,
            fail_silently=False,
            message=text_message,
            html_message=html_message,
        )
    except Exception as error:
        Logger.log(msg=error, level=logging.ERROR)

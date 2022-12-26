from typing import Any
from django.template.loader import render_to_string, TemplateDoesNotExist
from lib.tasks import send_mail_task


class EmailManagerError(Exception):
    """Raise this error if an error occurs in the email manager."""


class EmailManager:

    def __init__(self) -> None:
        pass
    
    @classmethod
    def send_mail(
        self,
        subject: str,
        recipients: list[str],
        context: dict[str, Any] | None,
        template_name: str | None,
        message: str | None = None,
    ) -> None:
        """Send email to user's."""

        if (
            (context and template_name is None)
            or (template_name and context is None)
        ):
            raise EmailManagerError('context set but template_name not set OR template_name set and context not set.')

        if ((context is None) and (template_name is None) and (message is None)):
            raise EmailManagerError('Must set either {context and template_name} or message args.')

        html_message : str | None = None

        if context is not None:
            # we prepare the html message
            try:
                html_message = render_to_string(template_name=template_name, context=context)
            except TemplateDoesNotExist as error:
                raise EmailManagerError from error

        send_mail_task.delay(
            subject=subject, 
            recipients=recipients,
            html_message=html_message,
            text_message=message,
        )

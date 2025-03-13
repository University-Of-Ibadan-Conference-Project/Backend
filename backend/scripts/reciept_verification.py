from django.utils import timezone
from event.models import PaymentReceipt
from user.models import User
from lib.mail import EmailManager



def send_verfied_receipt_mail():
    """Send a verfied receipt email."""

    print('\n\n\nSending verfied receipt \n\n\n')
    verified_receipts = PaymentReceipt.objects.filter(
        status=PaymentReceipt.STATUS_VERIFIED,
        user_notified=False 
    )
    
    for receipt in verified_receipts:
        
        if hasattr(receipt, 'clearance_file'):
            user = receipt.clearance_file.user
            subject = 'Payment Receipt: Clearance File Verified'
            message = f'Your clearance file has been verified.'

        elif hasattr(receipt, 'abstract'):
            user = receipt.abstract.user
            subject = 'Payment Receipt: Abstract Submission Verified'
            message = f'Your abstract submission has been verified.'
        
        elif hasattr(receipt, 'userevent'):
            user = receipt.userevent.user
            subject = 'Payment Receipt: Event Registration Verified'
            message = f'Your event registration has been verified.'
        else:
            continue
        
        # Send email notification to the recipients
        EmailManager.send_mail(
            subject=subject,
            recipients=[user],
            context={
                'user': user,
                'message': message,
            },
            template_name='receipt_verification_notification.html',
        )

        receipt.user_notified = True
        receipt.save()


def send_failed_receipt_notifcation():
    """Send all receipt failed in the past hour."""
    
    print('\n\n\nSending failed receipt \n\n\n')
    failed_receipts = PaymentReceipt.objects.filter(
        status=PaymentReceipt.STATUS_FAILED_VERIFICATION,
        user_notified=False
    )
    
    for receipt in failed_receipts:
        
        if hasattr(receipt, 'clearance_file'):
            user = receipt.clearance_file.user
            subject = 'Payment Receipt verification failed'
            message = (
                f"We we're unable to verify your payment reciept for clearance file. \n"
                f"{receipt.failure_reason}"
            )
        elif hasattr(receipt, 'abstract'):
            user = receipt.abstract.user
            subject = 'Payment Receipt verification failed'
            message = (
                f"We we're unable to verify your payment reciept for abstract submission. \n"
                f"{receipt.failure_reason}"
            )
        elif hasattr(receipt, 'userevent'):
            user = receipt.userevent.user
            subject = 'Payment Receipt verification failed'
            message = (
                f"We we're unable to verify your payment reciept for event registration. \n"
                f"{receipt.failure_reason}"
            )
        else:
            continue
        
        
        EmailManager.send_mail(
            subject=subject,
            recipients=[user],
            context={
                'user': user,
                'message': message,
            },
            template_name='receipt_verification_notification.html',
        )

        print(user.email)
        receipt.user_notified = True
        receipt.save()


if __name__ == '__main__':
    send_verfied_receipt_mail()
    send_failed_receipt_notifcation()

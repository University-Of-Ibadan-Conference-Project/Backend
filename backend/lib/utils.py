from rest_framework.request import Request


def get_full_url(request: Request, path: str) -> str:
    return f'{request.scheme}://{request.get_host()}/{path}'


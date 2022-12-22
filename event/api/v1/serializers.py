from typing import Any
from rest_framework import serializers
from event.models import Abstract


class CoAuthorSerializer(serializers.Serializer):

    co_authors = serializers.CharField()

    def validate(self, attrs: dict[str, Any]) -> list[dict[str, Any]]:
        """
            Validate co_authors field.
            field is a string with the format:
            title,Firstname,Lastname,affiliate_institute;
        """
        value = attrs['co_authors']
        co_authors = value.split(';')

        cleaned_data = []

        for author_data in co_authors:
            if author_data.strip() != '':
                data = author_data.split(',')

                if (len(data) < 3) or (len(data) > 4):
                    raise serializers.ValidationError(f'Input Error at {author_data}')

                cleaned_data.append(
                    {
                        'title': data[0].strip(),
                        'first_name': data[1].strip(),
                        'last_name': data[2].strip(),
                        'affiliate_intitute': data[3].strip() if len(data) == 4 else None
                    }
                )

        return cleaned_data
    
    def to_representation(self, instance: list[dict[str, Any]]) -> list[dict[str, Any]]:
        return instance


class AbstarctSerializer(serializers.ModelSerializer):

    class Meta:
        model = Abstract
        fields = [
            'title', 'coresponding_author_email', 'keywords', 'presentation_type',
            'abstract_document_file', 'research_area', 'coresponding_author_phone',
        ]

        read_only_fields = ['coresponding_author']

 
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
            'title', 'coresponding_author', 'coresponding_author_email', 'co_authors', 'keywords',
            'abstract_document_file', 'abstract_text', 'research_area', 'coresponding_author_phone'
        ]

        read_only_fields = ['coresponding_author']

    def validate_co_authors(self, value: Any) -> Any:
        """Overide this validator since we already do validation on CoAuthorSerializer."""
        return value

    def validate(self, attrs: dict[str, Any]) -> dict[str, Any]:
        co_authors_data = attrs.pop('co_authors', None)

        attrs = super().validate(attrs)

        if co_authors_data:
            
            # we do co_author validation here since we want a text-input
            co_authors_serializer = CoAuthorSerializer(data={'co_authors': co_authors_data})
            co_authors_serializer.is_valid(raise_exception=True)
            attrs['co_authors'] = co_authors_serializer.validated_data

        request = self.context.get('request')
 
        if not request:
            raise ValueError('request object needs to be passed to the context.')

        attrs['coresponding_author'] = request.user
        return attrs


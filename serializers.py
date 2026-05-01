from rest_framework import serializers

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project  # Ensure that the model is defined
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill  # Ensure that the model is defined
        fields = '__all__'

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience  # Ensure that the model is defined
        fields = '__all__'
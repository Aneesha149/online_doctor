from rest_framework import serializers
from .models import Doctor, User, EducationQualification, College, PlacesOfWork, Appointment
from django.contrib.auth import authenticate





   
class PlacesOfWorkSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255)
    city = serializers.CharField(max_length=255)
    state = serializers.CharField(max_length=255)
    class Meta:
        model = PlacesOfWork
        fields = ('name', 'city', 'state')

class CollegeSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255)
    address = serializers.CharField(max_length=255)
    class Meta:
        model = College
        fields = ('name', 'address')

class EducationQualificationSerializer(serializers.ModelSerializer):
    degree = serializers.CharField(max_length=255)
    percentage = serializers.IntegerField()
    college = CollegeSerializer()
    class Meta:
        model = EducationQualification
        fields = ('degree', 'percentage', 'college')


class DoctorSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    age = serializers.IntegerField(required =True)
    gender = serializers.CharField(required=True)
    medical_license_number = serializers.CharField(required=True)
    designation = serializers.CharField(required=True)
    speciality =serializers.CharField(required=True)
    years_of_exp = serializers.IntegerField(required=True)
    address = serializers.CharField(required=True)
    education_qualifications = EducationQualificationSerializer(many=True)
    places_of_works = PlacesOfWorkSerializer(many=True)

    
    class Meta:
        model = Doctor
        fields = ('id','first_name', 'address', 'last_name', 'education_qualifications', 'places_of_works', 'age', 'gender', 'medical_license_number', 'designation', 'speciality', 'years_of_exp', )
        read_only_fields = ('username', 'id')

    def create(self, validated_data):
        places_of_works = validated_data.pop('places_of_works')
        # places_of_works = PlacesOfWorkSerializer(places_of_works, many=True)
        education_qualifications = validated_data.pop('education_qualifications')
        # education_qualifications = EducationQualificationSerializer(education_qualifications, many=True)
        # profile: Doctor = super().create(validated_data)
        try:
            existing_profile = Doctor.objects.get(user=self.context['request'].user)
            existing_profile.delete()
        except Exception:
            pass     
        profile = Doctor(**validated_data)
        profile.user = self.context['request'].user
        profile.save()
        for p in places_of_works:
            temp = PlacesOfWork(**p)
            temp.doctor = profile
            temp.save()
        for e in education_qualifications:
            college = e.pop('college')
            college = College(**college)
            college.save()
            temp = EducationQualification(**e)
            temp.doctor = profile
            temp.college = college
            temp.save()
        return profile

class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )
    token = serializers.CharField(max_length=255, read_only=True)
    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'token', 'is_doctor']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=255)
    username = serializers.CharField(max_length=255, read_only=True)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)
    is_doctor = serializers.BooleanField(read_only=True)

    def validate(self, data):
        email = data.get('email', None)
        password = data.get('password', None)
        if email is None:
            raise serializers.ValidationError(
                'An email address is required to log in.'
            )
        if password is None:
            raise serializers.ValidationError(
                'A password is required to log in.'
            )
        user = authenticate(username=email, password=password)
        if user is None:
            raise serializers.ValidationError(
                'A user with this email and password was not found.'
            )
        if not user.is_active:
            raise serializers.ValidationError(
                'This user has been deactivated.'
            )
        return {
            'email': user.email,
            'username': user.username,
            'token': user.token,
            'is_doctor': user.is_doctor
        }


class UserSerializer(serializers.ModelSerializer):
    """Handles serialization and deserialization of User objects."""

    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )

    profile = DoctorSerializer(write_only=True)
    
  

    class Meta:
        model = User
        fields = (
            'email', 'username', 'password', 'token', 'profile', 'is_doctor',
        )

        read_only_fields = ('token',)


    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        profile_data = validated_data.pop('profile', {})

        for (key, value) in validated_data.items():
            setattr(instance, key, value)

        if password is not None:
            instance.set_password(password)
        instance.save()

        for (key, value) in profile_data.items():
            setattr(instance.profile, key, value)
        instance.profile.save()

        return instance



class AppointmentSerializer(serializers.ModelSerializer):
    patientname = serializers.CharField()
    doctor_id = serializers.IntegerField()
    user_id = serializers.IntegerField()
    datetime = serializers.DateTimeField()
    createdOn = serializers.DateTimeField()
    location = serializers.CharField()
    
    
    class Meta:
        model = Appointment
        fields = ('patientname', 'doctor_id', 'user_id', 'datetime', 'createdOn', 'location' )
        # read_only_fields = ('username', )

    def create(self, validated_data):
        # places_of_works = validated_data.pop('places_of_works')
        # # places_of_works = PlacesOfWorkSerializer(places_of_works, many=True)
        # education_qualifications = validated_data.pop('education_qualifications')
        # # education_qualifications = EducationQualificationSerializer(education_qualifications, many=True)
        # # profile: Doctor = super().create(validated_data)
        # existing_profile = Doctor.objects.get(user=self.context['request'].user)
        # if existing_profile:
        #     existing_profile.delete()
        # profile = Doctor(**validated_data)
        # profile.user = self.context['request'].user
        # profile.save()
        # for p in places_of_works:
        #     temp = PlacesOfWork(**p)
        #     temp.doctor = profile
        #     temp.save()
        # for e in education_qualifications:
        #     college = e.pop('college')
        #     college = College(**college)
        #     college.save()
        #     temp = EducationQualification(**e)
        #     temp.doctor = profile
        #     temp.college = college
        #     temp.save()
        # return profile
        appointment = Appointment(**validated_data)
        appointment.save()
        return appointment

   
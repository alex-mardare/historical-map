from django.contrib.auth.models import User
from django.db import IntegrityError
from django.test import TestCase

from .data_provider import DataProvider
from ..models import UserProfile

class UserProfileSignalTestClass(TestCase):
    @classmethod
    def setUp(self):
        data_provider = DataProvider()
        self.user = data_provider.create_user()

    def test_user_profile_creation(self):
        self.assertTrue(UserProfile.objects.filter(user=self.user).exists())

    def test_user_profile_update(self):
        self.user.username = 'updated_test_user'
        self.user.save()
        self.assertEqual(UserProfile.objects.get(user=self.user).user.username, 'updated_test_user')

    def test_user_profile_no_duplicates(self):
        with self.assertRaises(IntegrityError):
            User.objects.create_user(username='test_user', password='test_password2')
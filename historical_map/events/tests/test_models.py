import pytz
import re
import time

from datetime import datetime as dt
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.test import TestCase
from unittest import mock

from .data_provider import DataProvider
from ..models import EventCategory, HistoricalEvent, HistoricalFigure, HistoricalFigureRole, HistoricalState, PresentCountry, UserProfile
from ..validators import dateFormatter, regexDateValidator

class BaseModelTestClass(TestCase):
    data_provider = DataProvider()
    mocked_time = dt.now(tz=pytz.utc)
    sleep_time = 0.1


class CommonFunctionalityModelsTestClass(TestCase):
    @classmethod
    def setUp(self):
        self.regex, _ = regexDateValidator()

    def test_valid_date(self):
        valid_dates = ['1', '-1', '1-12', '-1-12', '1-12-12', '-1-12-12',
                       '12', '-12', '12-12', '-12-12', '12-12-12', '-12-12-12',
                       '123', '-123', '123-12', '-123-12', '123-12-12', '-123-12-12',
                       '1234', '-1234', '1234-12', '-1234-12', '1234-12-12', '-1234-12-12']
        for date in valid_dates:
            self.assertTrue(re.match(self.regex, date))

    def test_invalid_dates(self):
        invalid_dates = ['date', '', '12345', '12-12-1999']
        for date in invalid_dates:
            self.assertFalse(re.match(self.regex, date))


class EventCategoryModelTestClass(BaseModelTestClass):
    @classmethod
    def setUp(self):
        self.user_profile = self.data_provider.create_user()
        with mock.patch('django.utils.timezone.now', mock.Mock(return_value=self.mocked_time)):
            self.event_category = self.data_provider.create_event_category(user_profile=self.user_profile)

    def test_name_max_length(self):
        self.assertEqual(255, EventCategory._meta.get_field('name').max_length)

    def test_display_method(self):
        self.assertEqual(str(self.event_category), self.event_category.name)

    def test_verbose_name_plural(self):
        self.assertEqual(EventCategory._meta.verbose_name_plural, 'event categories')

    def test_auto_add_timestamp_creation(self):
        self.assertEqual(self.mocked_time, self.event_category.created_at)

    def test_auto_add_timestamp_update(self):
        self.event_category.name = 'new name'
        # wait 1 second before storing the data to the database
        time.sleep(self.sleep_time)
        self.event_category.save()
        self.assertLess(self.event_category.created_at, self.event_category.updated_at)
        

class HistoricalStateModelTestClass(BaseModelTestClass):
    @classmethod
    def setUp(self):
        self.user_profile = self.data_provider.create_user()
        with mock.patch('django.utils.timezone.now', mock.Mock(return_value=self.mocked_time)):
            self.present_country_a = self.data_provider.create_present_country(code='AA', name='A country', user_profile=self.user_profile)
            self.present_country_b = self.data_provider.create_present_country(code='BB', name='B country', user_profile=self.user_profile)

            self.historical_state = self.data_provider.create_historical_state(end_date='2345-06-07', name='Historical state', user_profile=self.user_profile)
            self.historical_state_no_end_date = self.data_provider.create_historical_state(name='Historical state', user_profile=self.user_profile)

            self.data_provider.create_historical_state_present_country_period(historical_state=self.historical_state, present_country=self.present_country_a, 
                                                                              user_profile=self.user_profile)
            self.data_provider.create_historical_state_present_country_period(historical_state=self.historical_state, present_country=self.present_country_b, 
                                                                              user_profile=self.user_profile)

    def test_max_length_columns(self):
        self.assertEqual(15, HistoricalState._meta.get_field('start_date').max_length)
        self.assertEqual(15, HistoricalState._meta.get_field('end_date').max_length)
        self.assertEqual(255, HistoricalState._meta.get_field('flag_url').max_length)
        self.assertEqual(255, HistoricalState._meta.get_field('name').max_length)

    def test_display_method_date_from_present(self):
        expected_name = self.historical_state.name + " (" + dateFormatter(self.historical_state.start_date) + " -> " + dateFormatter(self.historical_state.end_date) + ')'
        self.assertEqual(str(self.historical_state), expected_name)

    def test_display_method_date_from_not_present(self):
        self.assertEqual(str(self.historical_state_no_end_date), self.historical_state_no_end_date.name)

    def test_auto_add_timestamp_creation(self):
        self.assertEqual(self.mocked_time, self.historical_state.created_at)

    def test_auto_add_timestamp_update(self):
        self.historical_state.name = 'new name'
        # wait 1 second before storing the data to the database
        time.sleep(self.sleep_time)
        self.historical_state.save()
        self.assertLess(self.historical_state.created_at, self.historical_state.updated_at)

    def test_present_countries(self):
        self.assertTrue(self.historical_state.present_countries.contains(self.present_country_a))
        self.assertTrue(self.historical_state.present_countries.contains(self.present_country_b))
        self.assertEqual(self.historical_state.present_countries.count(), PresentCountry.objects.count())


class PresentCountryModelTestClass(BaseModelTestClass):
    @classmethod
    def setUp(self):
        self.user_profile = self.data_provider.create_user()
        with mock.patch('django.utils.timezone.now', mock.Mock(return_value=self.mocked_time)):
            self.present_country = self.data_provider.create_present_country(code='AA', name='A country', user_profile=self.user_profile)

    def test_max_length_columns(self):
        self.assertEqual(5, PresentCountry._meta.get_field('code').max_length)
        self.assertEqual(255, PresentCountry._meta.get_field('flag_url').max_length)
        self.assertEqual(255, PresentCountry._meta.get_field('name').max_length)

    def test_display_method(self):
        self.assertEqual(str(self.present_country), self.present_country.name)

    def test_verbose_name_plural(self):
        self.assertEqual(PresentCountry._meta.verbose_name_plural, 'present countries')

    def test_auto_add_timestamp_creation(self):
        self.assertEqual(self.mocked_time, self.present_country.created_at)

    def test_auto_add_timestamp_update(self):
        self.present_country.name = 'new name'
        # wait 1 second before storing the data to the database
        time.sleep(self.sleep_time)
        self.present_country.save()
        self.assertLess(self.present_country.created_at, self.present_country.updated_at)


class HistoricalStatePresentCountryPeriod(BaseModelTestClass):
    @classmethod
    def setUp(self):
        self.user_profile = self.data_provider.create_user()
        with mock.patch('django.utils.timezone.now', mock.Mock(return_value=self.mocked_time)):
            self.present_country = self.data_provider.create_present_country(code='AA', name='A country', user_profile=self.user_profile)
            self.historical_state = self.data_provider.create_historical_state(end_date='2345-06-07', name='Historical state', user_profile=self.user_profile)
            self.historical_state_period = self.data_provider.create_historical_state_present_country_period(end_date=self.historical_state.end_date,
                                                                                                             historical_state=self.historical_state,
                                                                                                             present_country=self.present_country,
                                                                                                             start_date=self.historical_state.start_date,
                                                                                                             user_profile=self.user_profile)

    def test_max_length_columns(self):
        self.assertEqual(15, HistoricalState._meta.get_field('start_date').max_length)
        self.assertEqual(15, HistoricalState._meta.get_field('end_date').max_length)

    def test_foreign_keys(self):
        self.assertEqual(self.historical_state_period.historical_state, self.historical_state)
        self.assertEqual(self.historical_state_period.present_country, self.present_country)

    def test_uniqueness_constraint(self):
        with self.assertRaises(ValidationError) as constraint_error:
            self.data_provider.create_historical_state_present_country_period(end_date=self.historical_state.end_date, historical_state=self.historical_state, 
                                                                              present_country=self.present_country, start_date=self.historical_state.start_date, 
                                                                              user_profile=self.user_profile)
        self.assertEqual(constraint_error.exception.message, f'There is an overlapping entry for {self.historical_state.name} and {self.present_country.name} ' + 
                                  f'for the period {self.historical_state.start_date} - {self.historical_state.end_date}.')
        
    def test_no_date_present(self):
        with self.assertRaises(ValidationError) as constraint_error:
            self.data_provider.create_historical_state_present_country_period(end_date=None, historical_state=self.historical_state, present_country=self.present_country, 
                                                                              start_date=None, user_profile=self.user_profile)
        self.assertEqual(constraint_error.exception.message, 'At least one fo the dates must be specified.')

    def test_date_from_before_date_to(self):
        with self.assertRaises(ValidationError) as constraint_error:
            self.data_provider.create_historical_state_present_country_period(end_date=self.historical_state.start_date, historical_state=self.historical_state, 
                                                                              present_country=self.present_country, start_date=self.historical_state.end_date,
                                                                              user_profile=self.user_profile)
        self.assertEqual(constraint_error.exception.message, 'Starting date must be before the end date.')


class HistoricalFigureModelTestClass(BaseModelTestClass):
    @classmethod
    def setUp(self):
        self.user_profile = self.data_provider.create_user()
        with mock.patch('django.utils.timezone.now', mock.Mock(return_value=self.mocked_time)):
            self.birth_historical_state = self.data_provider.create_historical_state(name='Birth historical state', user_profile=self.user_profile)
            self.birth_present_country = self.data_provider.create_present_country(code='BB', name='Birth country', user_profile=self.user_profile)
            self.death_historical_state = self.data_provider.create_historical_state(name='Death historical state', user_profile=self.user_profile)
            self.death_present_country = self.data_provider.create_present_country(code='DD', name='Death country', user_profile=self.user_profile)

            self.historical_figure = self.data_provider.create_historical_figure(birth_historical_state=self.birth_historical_state, 
                                                                                 birth_present_country=self.birth_present_country, 
                                                                                 death_historical_state=self.death_historical_state, 
                                                                                 death_present_country=self.death_present_country, user_profile=self.user_profile)
        
    def test_max_length_columns(self):
        self.assertEqual(15, HistoricalFigure._meta.get_field('birth_date').max_length)
        self.assertEqual(15, HistoricalFigure._meta.get_field('death_date').max_length)
        self.assertEqual(255, HistoricalFigure._meta.get_field('name').max_length)

    def test_display_method(self):
        self.assertEqual(str(self.historical_figure), self.historical_figure.name)

    def test_auto_add_timestamp_creation(self):
        self.assertEqual(self.mocked_time, self.historical_figure.created_at)

    def test_auto_add_timestamp_update(self):
        self.historical_figure.name = 'new name'
        # wait 1 second before storing the data to the database
        time.sleep(self.sleep_time)
        self.historical_figure.save()
        self.assertLess(self.historical_figure.created_at, self.historical_figure.updated_at)

    def test_birth_foreign_keys(self):
        self.assertEqual(self.historical_figure.birth_historical_state, self.birth_historical_state)
        self.assertEqual(self.historical_figure.birth_present_country, self.birth_present_country)

    def test_death_foreign_keys(self):
        self.assertEqual(self.historical_figure.death_historical_state, self.death_historical_state)
        self.assertEqual(self.historical_figure.death_present_country, self.death_present_country)

    def test_allow_death_columns_empty(self):
        self.historical_figure.death_historical_state = None
        self.historical_figure.death_present_country = None
        self.historical_figure.save()
        self.assertIsNone(self.historical_figure.death_historical_state)
        self.assertIsNone(self.historical_figure.death_present_country)


class HistoricalFigureRoleModelTestClass(BaseModelTestClass):
    @classmethod
    def setUp(self):
        self.user_profile = self.data_provider.create_user()
        with mock.patch('django.utils.timezone.now', mock.Mock(return_value=self.mocked_time)):
            self.historical_figure_role = self.data_provider.create_historical_figure_role(user_profile=self.user_profile)

    def test_name_max_length(self):
        self.assertEqual(255, HistoricalFigureRole._meta.get_field('name').max_length)

    def test_display_method(self):
        self.assertEqual(str(self.historical_figure_role), self.historical_figure_role.name)

    def test_auto_add_timestamp_creation(self):
        self.assertEqual(self.mocked_time, self.historical_figure_role.created_at)

    def test_auto_add_timestamp_update(self):
        self.historical_figure_role.name = 'new name'
        # wait 1 second before storing the data to the database
        time.sleep(self.sleep_time)
        self.historical_figure_role.save()
        self.assertLess(self.historical_figure_role.created_at, self.historical_figure_role.updated_at)


class HistoricalEventModelTestClass(BaseModelTestClass):
    @classmethod
    def setUp(self):
        self.user_profile = self.data_provider.create_user()
        with mock.patch('django.utils.timezone.now', mock.Mock(return_value=self.mocked_time)):
            self.event_category = self.data_provider.create_event_category(user_profile=self.user_profile)
            self.present_country = self.data_provider.create_present_country(code='AA', name='A country', user_profile=self.user_profile)
            self.historical_state = self.data_provider.create_historical_state(name='Historical state', user_profile=self.user_profile)
            self.historical_event = self.data_provider.create_historical_event(event_category=self.event_category, historical_state=self.historical_state, 
                                                                               present_country=self.present_country, user_profile=self.user_profile)
            
    def test_max_length_columns(self):
        self.assertEqual(15, HistoricalEvent._meta.get_field('date').max_length)
        self.assertEqual(1000, HistoricalEvent._meta.get_field('description').max_length)
        self.assertEqual(255, HistoricalEvent._meta.get_field('name').max_length)

    def test_display_method(self):
        self.assertEqual(str(self.historical_event), self.historical_event.name)

    def test_auto_add_timestamp_creation(self):
        self.assertEqual(self.mocked_time, self.historical_event.created_at)

    def test_auto_add_timestamp_update(self):
        self.historical_event.name = 'new name'
        # wait 1 second before storing the data to the database
        time.sleep(self.sleep_time)
        self.historical_event.save()
        self.assertLess(self.historical_event.created_at, self.historical_event.updated_at)

    def test_foreign_keys(self):
        self.assertEqual(self.historical_event.event_category, self.event_category)
        self.assertEqual(self.historical_event.historical_state, self.historical_state)
        self.assertEqual(self.historical_event.present_country, self.present_country)

    def test_outside_range_latitude_longitude_values(self):
        self.historical_event.latitude = 200
        self.historical_event.longitude = -180.000001
        with self.assertRaises(ValidationError):
            self.historical_event.full_clean()

    def test_extra_decimals_latitude_longitude_values(self):
        self.historical_event.latitude = 123.4567891
        self.historical_event.longitude = -1.345678987
        with self.assertRaises(ValidationError):
            self.historical_event.full_clean()

    def test_allows_empty_columns(self):
        self.historical_event.time = None
        self.historical_event.latitude = None
        self.historical_event.longitude = None
        self.historical_event.save()
        self.assertEqual(self.historical_event.time, None)
        self.assertEqual(self.historical_event.latitude, None)
        self.assertEqual(self.historical_event.longitude, None)

    def test_approximate_location_not_editable(self):
        self.historical_event.approximate_location = True
        with self.assertRaises(ValidationError):
            self.historical_event.full_clean()


class UserProfileModelTestClass(BaseModelTestClass):
    @classmethod
    def setUp(self):
        self.user = self.data_provider.create_user()
        self.user_profile = UserProfile.objects.filter(user=self.user).first()

    def test_creation_user_profile(self):
        self.assertEqual(self.user_profile.user, self.user)
        self.assertEqual(self.user_profile.user.username, 'test_user')
    
    def test_display_method(self):
        self.assertEqual(str(self.user_profile), self.user_profile.user.username)

    def test_update_user_profile(self):
        self.user.username = 'updated_test_user'
        self.user.save()
        self.assertEqual(self.user_profile.user.username, 'updated_test_user')

    def test_create_user_profile_no_user(self):
        with self.assertRaises(IntegrityError):
            UserProfile.objects.create(user=None)

    def test_create_user_profile_wrong_user_type(self):
        with self.assertRaises(ValueError):
            UserProfile.objects.create(user='user')
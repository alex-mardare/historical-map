import pytz
import re
import time

from datetime import datetime as dt
from django.core.exceptions import ValidationError
from django.test import TestCase
from unittest import mock

from ..models import EventCategory, HistoricalEvent, HistoricalFigure, HistoricalState, PresentCountry
from ..validators import dateFormatter, regexDateValidator

class BaseModelTestClass(TestCase):
    sleep_time = 0.1
    mocked_time = dt.now(tz=pytz.utc)

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
        with mock.patch('django.utils.timezone.now', mock.Mock(return_value=self.mocked_time)):
            self.event_category = EventCategory.objects.create(name='Event category')

    def test_name_max_length(self):
        self.assertEqual(255, EventCategory._meta.get_field('name').max_length)

    def test_display_method(self):
        self.assertEqual(str(self.event_category), self.event_category.name)

    def test_verbose_name_plural(self):
        self.assertEqual(EventCategory._meta.verbose_name_plural, 'event categories')

    def test_auto_add_timestamp_creation(self):
        self.assertEqual(self.mocked_time, self.event_category.createdAt)

    def test_auto_add_timestamp_update(self):
        self.event_category.name = 'new name'
        # wait 1 second before storing the data to the database
        time.sleep(self.sleep_time)
        self.event_category.save()
        self.assertLess(self.event_category.createdAt, self.event_category.updatedAt)
        

class HistoricalStateModelTestClass(BaseModelTestClass):
    @classmethod
    def setUp(self):
        with mock.patch('django.utils.timezone.now', mock.Mock(return_value=self.mocked_time)):
            self.present_country_a = PresentCountry.objects.create(code='AA', name='A country')
            self.present_country_b = PresentCountry.objects.create(code='BB', name='B country')

            self.historical_state = HistoricalState.objects.create(dateFrom='1234-05-06', dateTo='2345-06-07', name='Historical state')
            self.historical_state.presentCountries.add(*[self.present_country_a, self.present_country_b])
            self.historical_state_no_dateTo = HistoricalState.objects.create(dateFrom='123-04-05', name='Historical state no dateTo')

    def test_max_length_columns(self):
        self.assertEqual(15, HistoricalState._meta.get_field('dateFrom').max_length)
        self.assertEqual(15, HistoricalState._meta.get_field('dateTo').max_length)
        self.assertEqual(255, HistoricalState._meta.get_field('flagUrl').max_length)
        self.assertEqual(255, HistoricalState._meta.get_field('name').max_length)

    def test_display_method_date_from_present(self):
        expected_name = self.historical_state.name + " (" + dateFormatter(self.historical_state.dateFrom) + " -> " + dateFormatter(self.historical_state.dateTo) + ')'
        self.assertEqual(str(self.historical_state), expected_name)

    def test_display_method_date_from_not_present(self):
        self.assertEqual(str(self.historical_state_no_dateTo), self.historical_state_no_dateTo.name)

    def test_auto_add_timestamp_creation(self):
        self.assertEqual(self.mocked_time, self.historical_state.createdAt)

    def test_auto_add_timestamp_update(self):
        self.historical_state.name = 'new name'
        # wait 1 second before storing the data to the database
        time.sleep(self.sleep_time)
        self.historical_state.save()
        self.assertLess(self.historical_state.createdAt, self.historical_state.updatedAt)

    def test_present_countries(self):
        self.assertTrue(self.historical_state.presentCountries.contains(self.present_country_a))
        self.assertTrue(self.historical_state.presentCountries.contains(self.present_country_b))
        self.assertEqual(self.historical_state.presentCountries.count(), PresentCountry.objects.count())


class PresentCountryModelTestClass(BaseModelTestClass):
    @classmethod
    def setUp(self):
        with mock.patch('django.utils.timezone.now', mock.Mock(return_value=self.mocked_time)):
            self.present_country = PresentCountry.objects.create(code='AA', name='A country')

    def test_max_length_columns(self):
        self.assertEqual(5, PresentCountry._meta.get_field('code').max_length)
        self.assertEqual(255, PresentCountry._meta.get_field('flagUrl').max_length)
        self.assertEqual(255, PresentCountry._meta.get_field('name').max_length)

    def test_display_method(self):
        self.assertEqual(str(self.present_country), self.present_country.name)

    def test_verbose_name_plural(self):
        self.assertEqual(PresentCountry._meta.verbose_name_plural, 'present countries')

    def test_auto_add_timestamp_creation(self):
        self.assertEqual(self.mocked_time, self.present_country.createdAt)

    def test_auto_add_timestamp_update(self):
        self.present_country.name = 'new name'
        # wait 1 second before storing the data to the database
        time.sleep(self.sleep_time)
        self.present_country.save()
        self.assertLess(self.present_country.createdAt, self.present_country.updatedAt)


class HistoricalFigureModelTestClass(BaseModelTestClass):
    @classmethod
    def setUp(self):
        with mock.patch('django.utils.timezone.now', mock.Mock(return_value=self.mocked_time)):
            self.birth_historical_state = HistoricalState.objects.create(name='Birth historical state')
            self.birth_present_country = PresentCountry.objects.create(code='BB', name='D country')
            self.death_historical_state = HistoricalState.objects.create(name='Death historical state')
            self.death_present_country = PresentCountry.objects.create(code='DD', name='D country')

            self.historical_figure = HistoricalFigure.objects.create(birthDate='1234-05-06',
                                                                     birthHistoricalStateId=self.birth_historical_state, 
                                                                     birthPresentCountryId=self.birth_present_country,
                                                                     deathDate='1345-06-07',
                                                                     deathHistoricalStateId=self.death_historical_state,
                                                                     deathPresentCountryId=self.death_present_country,
                                                                     name='Historical figure')
        
    def test_max_length_columns(self):
        self.assertEqual(15, HistoricalFigure._meta.get_field('birthDate').max_length)
        self.assertEqual(15, HistoricalFigure._meta.get_field('deathDate').max_length)
        self.assertEqual(255, HistoricalFigure._meta.get_field('name').max_length)

    def test_display_method(self):
        self.assertEqual(str(self.historical_figure), self.historical_figure.name)

    def test_auto_add_timestamp_creation(self):
        self.assertEqual(self.mocked_time, self.historical_figure.createdAt)

    def test_auto_add_timestamp_update(self):
        self.historical_figure.name = 'new name'
        # wait 1 second before storing the data to the database
        time.sleep(self.sleep_time)
        self.historical_figure.save()
        self.assertLess(self.historical_figure.createdAt, self.historical_figure.updatedAt)

    def test_birth_foreign_keys(self):
        self.assertEqual(self.historical_figure.birthHistoricalStateId, self.birth_historical_state)
        self.assertEqual(self.historical_figure.birthPresentCountryId, self.birth_present_country)

    def test_death_foreign_keys(self):
        self.assertEqual(self.historical_figure.deathHistoricalStateId, self.death_historical_state)
        self.assertEqual(self.historical_figure.deathPresentCountryId, self.death_present_country)

    def test_allow_death_columns_empty(self):
        self.historical_figure.deathHistoricalStateId = None
        self.historical_figure.deathPresentCountryId = None
        self.historical_figure.save()
        self.assertIsNone(self.historical_figure.deathHistoricalStateId)
        self.assertIsNone(self.historical_figure.deathPresentCountryId)


class HistoricalEventModelTestClass(BaseModelTestClass):
    @classmethod
    def setUp(self):
        with mock.patch('django.utils.timezone.now', mock.Mock(return_value=self.mocked_time)):
            self.event_category = EventCategory.objects.create(name='Event Category')
            self.present_country = PresentCountry.objects.create(code='AA', name='A country')
            self.historical_state = HistoricalState.objects.create(name='Historical state')
            
            self.historical_event = HistoricalEvent.objects.create(date='1234',
                                                                   description='Historical event description',
                                                                   eventCategoryId=self.event_category,
                                                                   historicalStateId=self.historical_state,
                                                                   latitude=123.45,
                                                                   longitude=-12.34,
                                                                   name='Historical event',
                                                                   presentCountryId=self.present_country,
                                                                   time='12:34')
            
    def test_max_length_columns(self):
        self.assertEqual(15, HistoricalEvent._meta.get_field('date').max_length)
        self.assertEqual(1000, HistoricalEvent._meta.get_field('description').max_length)
        self.assertEqual(255, HistoricalEvent._meta.get_field('name').max_length)

    def test_display_method(self):
        self.assertEqual(str(self.historical_event), self.historical_event.name)

    def test_auto_add_timestamp_creation(self):
        self.assertEqual(self.mocked_time, self.historical_event.createdAt)

    def test_auto_add_timestamp_update(self):
        self.historical_event.name = 'new name'
        # wait 1 second before storing the data to the database
        time.sleep(self.sleep_time)
        self.historical_event.save()
        self.assertLess(self.historical_event.createdAt, self.historical_event.updatedAt)

    def test_foreign_keys(self):
        self.assertEqual(self.historical_event.eventCategoryId, self.event_category)
        self.assertEqual(self.historical_event.historicalStateId, self.historical_state)
        self.assertEqual(self.historical_event.presentCountryId, self.present_country)

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

    def test_approximateRealLocation_not_editable(self):
        self.historical_event.approximateRealLocation = True
        with self.assertRaises(ValidationError):
            self.historical_event.full_clean()
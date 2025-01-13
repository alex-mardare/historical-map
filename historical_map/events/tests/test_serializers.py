from collections import OrderedDict
from django.forms.models import model_to_dict
from django.test import TestCase
from unittest.mock import patch

from .data_provider import DataProvider
from ..models import HistoricalEvent
from ..serializers import *

class BaseModelTestClass(TestCase):
    data_provider = DataProvider()


class EventCategorySerializersTestClass(BaseModelTestClass):
    def test_serialization(self):
        user_profile = self.data_provider.create_user()
        event_category = self.data_provider.create_event_category(user_profile=user_profile)
        serializer = EventCategorySerializer(event_category)
        expected_data = {'id': event_category.pk, 'name': event_category.name}

        self.assertEqual(serializer.data, expected_data)

    def test_serialization_valid_data(self):
        user_profile = self.data_provider.create_user()
        event_category = self.data_provider.create_event_category(user_profile=user_profile)
        valid_event_category = model_to_dict(event_category)
        serializer = EventCategorySerializer(data=valid_event_category)

        self.assertTrue(serializer.is_valid())

    def test_validation_name_exceeds_max_length(self):
        invalid_event_category = {'name': 'e' * 256}
        serializer = EventCategorySerializer(data=invalid_event_category)

        self.assertFalse(serializer.is_valid())
        self.assertIn('name', serializer.errors)
        self.assertTrue(any('max_length' in error.code for error in serializer.errors['name']))

    def test_validation_name_not_present(self):
        invalid_event_category = {'other':'property'}
        serializer = EventCategorySerializer(data=invalid_event_category)

        self.assertFalse(serializer.is_valid())
        self.assertIn('name', serializer.errors)
        self.assertTrue(any('required' in error.code for error in serializer.errors['name']))


class HistoricalStateSerializerTestClass(BaseModelTestClass):
    @classmethod
    def setUp(self):
        self.user_profile = self.data_provider.create_user()
        self.present_country = self.data_provider.create_present_country(code='PC', name='Present country', user_profile=self.user_profile)

#region HistoricalStateGetSerializer
    def test_serialization_get_all(self):
        historical_state = self.data_provider.create_historical_state(name='Historical state', user_profile=self.user_profile)
        historical_state_period = self.data_provider.create_historical_state_present_country_period(historical_state=historical_state, present_country=self.present_country, 
                                                                                                    user_profile=self.user_profile)
        serializer = HistoricalStateGetSerializer(historical_state)
        expected_data = {'id': historical_state.pk, 'present_countries': [OrderedDict([('start_date', historical_state_period.start_date),
                                                                                       ('end_date', historical_state_period.end_date), 
                                                                                       ('flag_url', self.present_country.flag_url), ('id', self.present_country.pk),
                                                                                       ('name', self.present_country.name)])],
                         'name': historical_state.name, 'start_date': historical_state.start_date, 'end_date': historical_state.end_date, 'flag_url': None}
        self.assertEqual(serializer.data, expected_data)

    def test_serialization_valid_data_get_all(self):
        historical_state = self.data_provider.create_historical_state(name='Historical state', user_profile=self.user_profile)
        valid_historical_state = model_to_dict(historical_state)
        serializer = HistoricalStateGetSerializer(data=valid_historical_state)

        self.assertTrue(serializer.is_valid())

    def test_validation_name_not_present(self):
        invalid_historical_state = {'start_date': '1234', 'end_date': '4321'}
        serializer = HistoricalStateGetSerializer(data=invalid_historical_state)

        self.assertFalse(serializer.is_valid())
        self.assertIn('name', serializer.errors)
        self.assertIn('present_countries', serializer.errors)
        self.assertTrue(any('required' in error.code for error in serializer.errors['name']))
        self.assertTrue(any('required' in error.code for error in serializer.errors['present_countries']))

    def test_validation_invalid_dates(self):
        invalid_historical_state = {'start_date': '123-1-1', 'end_date': '4321-1', 'name': 'Historical state'}
        serializer = HistoricalStateGetSerializer(data=invalid_historical_state)

        self.assertFalse(serializer.is_valid())
        self.assertIn('start_date', serializer.errors)
        self.assertIn('end_date', serializer.errors)
        self.assertTrue(any('invalid' in error.code for error in serializer.errors['start_date']))
        self.assertTrue(any('invalid' in error.code for error in serializer.errors['end_date']))

    def test_validation_properties_exceed_max_length(self):
        invalid_historical_state = {'start_date': '1234'*4, 'end_date': '4321'*4, 'name': 'h' * 256}
        serializer = HistoricalStateGetSerializer(data=invalid_historical_state)

        self.assertFalse(serializer.is_valid())
        self.assertIn('start_date', serializer.errors)
        self.assertIn('end_date', serializer.errors)
        self.assertIn('name', serializer.errors)
        self.assertTrue(any('max_length' in error.code for error in serializer.errors['start_date']))
        self.assertTrue(any('max_length' in error.code for error in serializer.errors['end_date']))
        self.assertTrue(any('max_length' in error.code for error in serializer.errors['name']))
#endregion
        
#region HistoricalStatePropertySerializer
    def test_serialization_property(self):
        historical_state = self.data_provider.create_historical_state(name='Historical state', user_profile=self.user_profile)
        serializer = HistoricalStatePropertySerializer(historical_state)
        expected_data = {'id': historical_state.pk, 'name': historical_state.name}

        self.assertEqual(serializer.data, expected_data)

    def test_serialization_valid_data_property(self):
        valid_historical_state = {'name': 'Historical state'}
        serializer = HistoricalStatePropertySerializer(data=valid_historical_state)

        self.assertTrue(serializer.is_valid())
#endregion

#region HistoricalStateDeletePostUpdateSerializer
    def test_serialization(self):
        historical_state = self.data_provider.create_historical_state(name='Historical state', user_profile=self.user_profile)
        self.data_provider.create_historical_state_present_country_period(historical_state=historical_state, present_country=self.present_country, 
                                                                          user_profile=self.user_profile)

        serializer = HistoricalStateDeletePostUpdateSerializer(historical_state)
        expected_data = {'id': historical_state.pk, 'present_countries': [OrderedDict([('start_date', '1234-05-06'), ('end_date', '2345-06-07'), 
                                                                                       ('present_country', self.present_country.pk)])],
                         'name': historical_state.name, 'start_date': historical_state.start_date, 'end_date': historical_state.end_date, 
                         'flag_url': historical_state.flag_url}

        self.assertEqual(serializer.data, expected_data)

    def test_serialization_valid_data(self):
        valid_historical_state = {'end_date': '1235', 'name': 'Historical State', 
                                  'present_countries': [OrderedDict([('start_date', '1234-05-06'), ('end_date', '2345-06-07'), 
                                                                     ('present_country', self.present_country.pk)])], 
                                  'start_date': '1234'}
        serializer = HistoricalStateDeletePostUpdateSerializer(data=valid_historical_state)

        self.assertTrue(serializer.is_valid())
#endregion
        

class PresentCountriesSerializerTestClass(BaseModelTestClass):
    @classmethod
    def setUp(self):
        self.user_profile = self.data_provider.create_user()

#region PresentCountriesSerializer
    def test_serialization_get_all(self):
        present_country = self.data_provider.create_present_country(code='PC', name='Present country', user_profile=self.user_profile)
        serializer = PresentCountriesSerializer(present_country)
        expected_data = {'flag_url': present_country.flag_url, 'id': present_country.pk, 'name': present_country.name}

        self.assertEqual(serializer.data, expected_data)

    def test_serialization_valid_data_get_all(self):
        valid_present_country = {'code':'PC', 'flag_url': 'link', 'name': 'Present country'}
        serializer = PresentCountriesSerializer(data=valid_present_country)

        self.assertTrue(serializer.is_valid())

    def test_validation_properties_exceed_max_length(self):
        invalid_present_country = {'flag_url': 'f' * 256, 'name': 'P'*256}
        serializer = PresentCountriesSerializer(data=invalid_present_country)

        self.assertFalse(serializer.is_valid())
        self.assertIn('flag_url', serializer.errors)
        self.assertIn('name', serializer.errors)
        self.assertTrue(any('max_length' in error.code for error in serializer.errors['flag_url']))
        self.assertTrue(any('max_length' in error.code for error in serializer.errors['name']))

    def test_validation_properties_not_present(self):
        invalid_present_country = {}
        serializer = PresentCountriesSerializer(data=invalid_present_country)

        self.assertFalse(serializer.is_valid())
        self.assertIn('name', serializer.errors)
        self.assertTrue(any('required' in error.code for error in serializer.errors['name']))
#endregion
        
#region PresentCountryPropertySerializer
    def test_serialization_property(self):
        present_country = self.data_provider.create_present_country(code='PC', name='Present country', user_profile=self.user_profile)
        serializer = PresentCountryPropertySerializer(present_country)
        expected_data = {'id': present_country.pk, 'name': present_country.name}

        self.assertEqual(serializer.data, expected_data)

    def test_serialization_valid_data_property(self):
        valid_present_country = {'code':'PC', 'name': 'Present country'}
        serializer = PresentCountryPropertySerializer(data=valid_present_country)

        self.assertTrue(serializer.is_valid())
#endregion
        

class HistoricalEventSerializerClass(BaseModelTestClass):
    @classmethod
    def setUp(self):
        self.user_profile = self.data_provider.create_user()
        self.event_category = self.data_provider.create_event_category(user_profile=self.user_profile)
        self.historical_state = self.data_provider.create_historical_state(name='Historical state', user_profile=self.user_profile)
        self.present_country = self.data_provider.create_present_country(code='PC', name='Present country', user_profile=self.user_profile)

#region HistoricalEventDeletePostUpdateSerializer
    def test_serialization_delete_post_update(self):
        historical_event = self.data_provider.create_historical_event(event_category=self.event_category, historical_state=self.historical_state, 
                                                                      present_country=self.present_country, user_profile=self.user_profile)
        serializer = HistoricalEventDeletePostUpdateSerializer(historical_event)
        expected_data = {'id': historical_event.pk, 'name': historical_event.name, 'date': historical_event.date, 'time': historical_event.time, 
                         'description': historical_event.description, 'latitude': format(historical_event.latitude, '.6f'), 
                         'longitude': format(historical_event.longitude, '.6f'), 'approximate_location': False, 'event_category': self.event_category.pk, 
                         'present_country': self.present_country.pk, 'historical_state': self.historical_state.pk}
        
        self.assertEqual(serializer.data, expected_data)

    def test_serialization_valid_delete_post_update(self):
        valid_historical_event = {'date': '1234',  'description': 'description', 'event_category': self.event_category.pk, 'historical_state': self.historical_state.pk, 
                                  'latitude': 12.345678, 'longitude': 23.456789, 'name':'Historical event', 'present_country': self.present_country.pk, 'time': '12:34'}
        serializer = HistoricalEventDeletePostUpdateSerializer(data=valid_historical_event)

        self.assertTrue(serializer.is_valid())

    def test_validation_properties_exceed_max_length(self):
        invalid_historical_event = {'date': '1234'*4,  'description': 'd'*1001, 'event_category': self.event_category.pk, 'historical_state': self.historical_state.pk, 
                                    'latitude': 12.345678, 'longitude': 23.456789, 'name':'H'*256, 'present_country': self.present_country.pk, 'time': '12:34'}
        
        serializer = HistoricalEventDeletePostUpdateSerializer(data=invalid_historical_event)

        self.assertFalse(serializer.is_valid())
        self.assertIn('date', serializer.errors)
        self.assertIn('description', serializer.errors)
        self.assertIn('name', serializer.errors)
        self.assertTrue(any('max_length' in error.code for error in serializer.errors['date']))
        self.assertTrue(any('max_length' in error.code for error in serializer.errors['description']))
        self.assertTrue(any('max_length' in error.code for error in serializer.errors['name']))

    def test_validation_mandatory_properties_not_present(self):
        invalid_historical_event = {'latitude': 12.345678, 'longitude': 23.456789, 'time': '12:34'}
        serializer = HistoricalEventDeletePostUpdateSerializer(data=invalid_historical_event)

        self.assertFalse(serializer.is_valid())
        self.assertIn('date', serializer.errors)
        self.assertIn('description', serializer.errors)
        self.assertIn('event_category', serializer.errors)
        self.assertIn('historical_state', serializer.errors)
        self.assertIn('name', serializer.errors)
        self.assertIn('present_country', serializer.errors)
        self.assertTrue(any('required' in error.code for error in serializer.errors['date']))
        self.assertTrue(any('required' in error.code for error in serializer.errors['description']))
        self.assertTrue(any('required' in error.code for error in serializer.errors['event_category']))
        self.assertTrue(any('required' in error.code for error in serializer.errors['historical_state']))
        self.assertTrue(any('required' in error.code for error in serializer.errors['name']))
        self.assertTrue(any('required' in error.code for error in serializer.errors['present_country']))

    def test_validation_invalid_date(self):
        invalid_historical_event = {'date': '1234-1', 'description': 'description', 'event_category': self.event_category.pk, 'historical_state': self.historical_state.pk, 
                                    'latitude': 12.345678, 'longitude': 23.456789, 'name':'Historical event', 'present_country': self.present_country.pk, 'time': '12:34'}
        serializer = HistoricalEventDeletePostUpdateSerializer(data=invalid_historical_event)

        self.assertFalse(serializer.is_valid())
        self.assertIn('date', serializer.errors)
        self.assertTrue(any('invalid' in error.code for error in serializer.errors['date']))

    def test_validation_coordinates_outside_range(self):
        invalid_historical_event = {'date': '1234-1', 'description': 'description', 'event_category': self.event_category.pk, 'historical_state': self.historical_state.pk, 
                                    'latitude': -180.000001, 'longitude': 180.000001, 'name':'Historical event', 'present_country': self.present_country.pk, 
                                    'time': '12:34'}
        serializer = HistoricalEventDeletePostUpdateSerializer(data=invalid_historical_event)

        self.assertFalse(serializer.is_valid())
        self.assertTrue(any('min_value' in error.code for error in serializer.errors['latitude']))
        self.assertTrue(any('max_value' in error.code for error in serializer.errors['longitude']))

    def test_validation_coordinates_exceed_max_digits(self):
        invalid_historical_event = {'date': '1234-1', 'description': 'description', 'event_category': self.event_category.pk, 'historical_state': self.historical_state.pk, 
                                    'latitude': 123456.7899, 'longitude': -123456.7899, 'name':'Historical event', 'present_country': self.present_country.pk, 
                                    'time': '12:34'}
        serializer = HistoricalEventDeletePostUpdateSerializer(data=invalid_historical_event)

        self.assertFalse(serializer.is_valid())
        self.assertTrue(any('max_digits' in error.code for error in serializer.errors['latitude']))
        self.assertTrue(any('max_digits' in error.code for error in serializer.errors['longitude']))

    def test_validation_coordinates_exceed_max_decimals(self):
        invalid_historical_event = {'date': '1234-1', 'description': 'description', 'event_category': self.event_category.pk, 'historical_state': self.historical_state.pk, 
                                    'latitude': 12.3456789, 'longitude': -12.3456789, 'name':'Historical event', 'present_country': self.present_country.pk, 
                                    'time': '12:34'}
        serializer = HistoricalEventDeletePostUpdateSerializer(data=invalid_historical_event)

        self.assertFalse(serializer.is_valid())
        self.assertTrue(any('max_decimal_places' in error.code for error in serializer.errors['latitude']))
        self.assertTrue(any('max_decimal_places' in error.code for error in serializer.errors['longitude']))

    def test_validation_create_event_coordinates(self):
        historical_event = {'date': '1234', 'description': 'description', 'event_category': self.event_category.pk, 'historical_state': self.historical_state.pk, 
                            'latitude': 12.345678, 'longitude': 23.456789, 'name':'Historical event', 'present_country': self.present_country.pk, 'time': '12:34'}

        with patch('events.models.get_current_user', return_value=self.user_profile):
            serializer = HistoricalEventDeletePostUpdateSerializer(data=historical_event)
            if serializer.is_valid():
                instance = serializer.save()
                self.assertIsInstance(instance, HistoricalEvent)
                self.assertEqual(instance.approximate_location, True)
                self.assertEqual(instance.created_by, self.user_profile)
                self.assertEqual(instance.updated_by, self.user_profile)

    def test_validation_create_event_no_coordinates(self):
        historical_event = {'date': '1234', 'description': 'description', 'event_category': self.event_category.pk, 'historical_state': self.historical_state.pk, 
                            'name':'Historical event', 'present_country': self.present_country.pk, 'time': '12:34'}
        with patch('events.models.get_current_user', return_value=self.user_profile):
            serializer = HistoricalEventDeletePostUpdateSerializer(data=historical_event)
            if serializer.is_valid():
                instance = serializer.save()
                self.assertIsInstance(instance, HistoricalEvent)
                self.assertEqual(instance.approximate_location, False)
                self.assertEqual(instance.created_by, self.user_profile)
                self.assertEqual(instance.updated_by, self.user_profile)
#endregion
    
#region HistoricalEventGetSerializer
    def test_serialization_get(self):
        historical_event = self.data_provider.create_historical_event(event_category=self.event_category, historical_state=self.historical_state, 
                                                                      present_country=self.present_country, user_profile=self.user_profile)
        serializer = HistoricalEventGetSerializer(historical_event)
        
        self.assertEqual(serializer.data['approximate_location'], False)
        self.assertEqual(serializer.data['date'], historical_event.date)
        self.assertEqual(serializer.data['description'], historical_event.description)
        self.assertEqual(serializer.data['event_category']['id'], self.event_category.pk)
        self.assertEqual(serializer.data['event_category']['name'], self.event_category.name)
        self.assertEqual(serializer.data['historical_state']['id'], self.historical_state.pk)
        self.assertEqual(serializer.data['historical_state']['name'], self.historical_state.name)
        self.assertEqual(serializer.data['id'], historical_event.pk)
        self.assertEqual(serializer.data['latitude'], format(historical_event.latitude, '.6f'))
        self.assertEqual(serializer.data['longitude'], format(historical_event.longitude, '.6f'))
        self.assertEqual(serializer.data['name'], historical_event.name)
        self.assertEqual(serializer.data['present_country']['id'], self.present_country.pk)
        self.assertEqual(serializer.data['present_country']['name'], self.present_country.name)
        self.assertEqual(serializer.data['time'], historical_event.time)

    def test_serialization_valid_get(self):
        valid_historical_event = {'date': '1234', 'description': 'description', 
                                  'event_category': OrderedDict([('id', self.event_category.pk), ('name', self.event_category.name)]), 
                                  'historical_state': OrderedDict([('id', self.historical_state.pk), ('name', self.historical_state.name)]), 'latitude': 12.345678, 
                                  'longitude': 23.456789, 'name':'Historical event', 
                                  'present_country': OrderedDict([('id', self.present_country.pk), ('name', self.present_country.name)]) , 'time': '12:34',}
        serializer = HistoricalEventGetSerializer(data=valid_historical_event)

        self.assertTrue(serializer.is_valid())
#endregion


class HistoricalFigureSerializerClass(BaseModelTestClass):
    @classmethod
    def setUp(self):
        self.user_profile = self.data_provider.create_user()
        self.historical_state = self.data_provider.create_historical_state(name='Historical state', user_profile=self.user_profile)
        self.present_country = self.data_provider.create_present_country(code='PC', name='Present country', user_profile=self.user_profile)

#region HistoricalFigureDeletePostUpdateSerializer
    def test_serialization_delete_post_update(self):
        historical_figure = self.data_provider.create_historical_figure(birth_historical_state=self.historical_state, birth_present_country=self.present_country,
                                                                        death_historical_state=self.historical_state, death_present_country=self.present_country,
                                                                        user_profile=self.user_profile)
        serializer = HistoricalFigureDeletePostUpdateSerializer(historical_figure)
        expected_data = {'birth_date': historical_figure.birth_date, 'birth_historical_state': self.historical_state.pk, 'birth_present_country': self.present_country.pk, 
                         'death_date': historical_figure.death_date, 'death_historical_state': self.historical_state.pk, 'death_present_country': self.present_country.pk, 
                         'name': historical_figure.name}
        
        self.assertEqual(serializer.data, expected_data)

    def test_serialization_valid_delete_post_update(self):
        valid_historical_figure = {'birth_date': '1234', 'birth_historical_state': self.historical_state.pk, 'birth_present_country': self.present_country.pk, 
                                   'death_date': '1345-01-02', 'death_historical_state': self.historical_state.pk, 'death_present_country': self.present_country.pk, 
                                   'name':'Historical figure'}
        serializer = HistoricalFigureDeletePostUpdateSerializer(data=valid_historical_figure)

        self.assertTrue(serializer.is_valid())

    def test_validation_properties_exceed_max_length(self):
        invalid_historical_figure = {'birth_date': '1234'*4, 'birth_historical_state': self.historical_state.pk, 'birth_present_country': self.present_country.pk, 
                                     'death_date': '1'*16, 'death_historical_state': self.historical_state.pk, 'death_present_country': self.present_country.pk, 
                                     'name':'H'*256}
        serializer = HistoricalFigureDeletePostUpdateSerializer(data=invalid_historical_figure)

        self.assertFalse(serializer.is_valid())
        self.assertIn('birth_date', serializer.errors)
        self.assertIn('death_date', serializer.errors)
        self.assertIn('name', serializer.errors)
        self.assertTrue(any('max_length' in error.code for error in serializer.errors['birth_date']))
        self.assertTrue(any('max_length' in error.code for error in serializer.errors['death_date']))
        self.assertTrue(any('max_length' in error.code for error in serializer.errors['name']))

    def test_validation_mandatory_properties_not_present(self):
        invalid_historical_figure = {'death_date': '1345-01-02', 'death_historical_state': self.historical_state.pk, 'death_present_country': self.present_country.pk}
        serializer = HistoricalFigureDeletePostUpdateSerializer(data=invalid_historical_figure)

        self.assertFalse(serializer.is_valid())
        self.assertIn('birth_date', serializer.errors)
        self.assertIn('birth_historical_state', serializer.errors)
        self.assertIn('birth_present_country', serializer.errors)
        self.assertIn('name', serializer.errors)
        self.assertTrue(any('required' in error.code for error in serializer.errors['birth_date']))
        self.assertTrue(any('required' in error.code for error in serializer.errors['birth_historical_state']))
        self.assertTrue(any('required' in error.code for error in serializer.errors['birth_present_country']))    
        self.assertTrue(any('required' in error.code for error in serializer.errors['name']))

    def test_validation_invalid_dates(self):
        invalid_historical_figure = {'birth_date': '1-1', 'birth_historical_state': self.historical_state.pk, 'birth_present_country': self.present_country.pk, 
                                     'death_date': '100-1-1', 'death_historical_state': self.historical_state.pk, 'death_present_country': self.present_country.pk, 
                                     'name':'Historical figure'}
        serializer = HistoricalFigureDeletePostUpdateSerializer(data=invalid_historical_figure)

        self.assertFalse(serializer.is_valid())
        self.assertIn('birth_date', serializer.errors)
        self.assertIn('death_date', serializer.errors)
        self.assertTrue(any('invalid' in error.code for error in serializer.errors['birth_date']))
        self.assertTrue(any('invalid' in error.code for error in serializer.errors['death_date']))
#endregion

#region HistoricalFigureGetSerializer
    def test_serialization_get(self):
        historical_figure = self.data_provider.create_historical_figure(birth_historical_state=self.historical_state, birth_present_country=self.present_country,
                                                                        death_historical_state=self.historical_state, death_present_country=self.present_country,
                                                                        user_profile=self.user_profile)
        serializer = HistoricalFigureGetSerializer(historical_figure)
        
        self.assertEqual(serializer.data['birth_date'], historical_figure.birth_date)
        self.assertEqual(serializer.data['birth_historical_state']['id'], self.historical_state.pk)
        self.assertEqual(serializer.data['birth_historical_state']['name'], self.historical_state.name)
        self.assertEqual(serializer.data['birth_present_country']['id'], self.present_country.pk)
        self.assertEqual(serializer.data['birth_present_country']['name'], self.present_country.name)
        self.assertEqual(serializer.data['death_date'], historical_figure.death_date)
        self.assertEqual(serializer.data['death_historical_state']['id'], self.historical_state.pk)
        self.assertEqual(serializer.data['death_historical_state']['name'], self.historical_state.name)
        self.assertEqual(serializer.data['death_present_country']['id'], self.present_country.pk)
        self.assertEqual(serializer.data['death_present_country']['name'], self.present_country.name)
        self.assertEqual(serializer.data['id'], historical_figure.pk)
        self.assertEqual(serializer.data['name'], historical_figure.name)

    def test_serialization_valid_get(self):
        valid_historical_figure = {'birth_date': '1234', 'birth_historical_state': OrderedDict([('id', self.historical_state.pk), ('name', self.historical_state.name)]), 
                                   'birth_present_country': OrderedDict([('id', self.present_country.pk), ('name', self.present_country.name)]), 'death_date': '1345-01-02',
                                   'death_historical_state': OrderedDict([('id', self.historical_state.pk), ('name', self.historical_state.name)]), 
                                   'death_present_country': OrderedDict([('id', self.present_country.pk), ('name', self.present_country.name)]), 
                                   'name': 'Historical Figure'}
        serializer = HistoricalFigureGetSerializer(data=valid_historical_figure)

        self.assertTrue(serializer.is_valid())
#endregion


class HistoricalFigureRoleSerializersTestClass(BaseModelTestClass):
    @classmethod
    def setUp(self):
        self.user_profile = self.data_provider.create_user()

#region HistoricalFigureRoleSerializer
    def test_serialization(self):
        figure_role = self.data_provider.create_historical_figure_role(user_profile=self.user_profile)
        serializer = HistoricalFigureRoleSerializer(figure_role)
        expected_data = {'id': figure_role.pk, 'description': figure_role.description, 'name': figure_role.name}

        self.assertEqual(serializer.data, expected_data)

    def test_serialization_valid_data(self):
        valid_figure_role = {'name': 'Figure role'}
        serializer = HistoricalFigureRoleSerializer(data=valid_figure_role)

        self.assertTrue(serializer.is_valid())

    def test_validation_properties_exceeds_max_length(self):
        invalid_figure_role = {'description': 'd' * 1001, 'name': 'f' * 256}
        serializer = HistoricalFigureRoleSerializer(data=invalid_figure_role)

        self.assertFalse(serializer.is_valid())
        self.assertIn('description', serializer.errors)
        self.assertIn('name', serializer.errors)
        self.assertTrue(any('max_length' in error.code for error in serializer.errors['description']))
        self.assertTrue(any('max_length' in error.code for error in serializer.errors['name']))

    def test_validation_name_not_present(self):
        invalid_figure_role = {'other':'property'}
        serializer = HistoricalFigureRoleSerializer(data=invalid_figure_role)

        self.assertFalse(serializer.is_valid())
        self.assertIn('name', serializer.errors)
        self.assertTrue(any('required' in error.code for error in serializer.errors['name']))
#endregion

#region HistoricalFigureRolePropertySerializer
    def test_serialization_property(self):
        figure_role = self.data_provider.create_historical_figure_role(user_profile=self.user_profile)
        serializer = HistoricalFigureRolePropertySerializer(figure_role)
        expected_data = {'id': figure_role.pk, 'name': figure_role.name}

        self.assertEqual(serializer.data, expected_data)

    def test_serialization_valid_data_property(self):
        valid_figure_role = {'name': 'Figure role'}
        serializer = HistoricalFigureRolePropertySerializer(data=valid_figure_role)

        self.assertTrue(serializer.is_valid())
#endregion


class HistoricalStatePresentCountryPeriodSerializersTestClass(BaseModelTestClass):
    @classmethod
    def setUp(self):
        self.user_profile = self.data_provider.create_user()
        self.present_country = self.data_provider.create_present_country(code='AA', name='A country', user_profile=self.user_profile)
        self.historical_state = self.data_provider.create_historical_state(end_date='2345-06-07', name='Historical state', user_profile=self.user_profile)
        self.historical_state_period = self.data_provider.create_historical_state_present_country_period(historical_state=self.historical_state, 
                                                                                                         present_country=self.present_country, 
                                                                                                         user_profile=self.user_profile)
#region PresentCountryPeriodGetSerializer        
    def test_serializer_get(self):
        serializer = PresentCountryPeriodGetSerializer(self.historical_state_period)
        expected_data = {'start_date': self.historical_state_period.start_date, 'flag_url': self.present_country.flag_url, 
                         'end_date': self.historical_state_period.end_date, 'id': self.present_country.pk, 'name': self.present_country.name}
        self.assertEqual(serializer.data, expected_data)
#endregion

#region PresentCountryPeriodDeletePostUpdateSerializer
    def test_serializer_delete_post_update(self):
        serializer = PresentCountryPeriodDeletePostUpdateSerializer(self.historical_state_period)
        expected_data = {'start_date': self.historical_state_period.start_date, 'end_date': self.historical_state_period.end_date, 
                         'present_country': self.present_country.pk}
        self.assertEqual(serializer.data, expected_data)
#endregion
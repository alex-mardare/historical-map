from collections import OrderedDict
from django.contrib.auth.models import User
from django.test import TestCase
from unittest.mock import patch

from ..models import EventCategory, HistoricalEvent, HistoricalFigure, HistoricalFigureRole, HistoricalState, PresentCountry
from ..serializers import *


class EventCategorySerializersTestClass(TestCase):
    def test_serialization(self):
        user_profile = User.objects.create(username='test_user', password='test_password')
        event_category = EventCategory.objects.create(createdBy=user_profile, name='Event category', updatedBy=user_profile)
        serializer = EventCategorySerializer(event_category)
        expected_data = {'id': event_category.id, 'name': event_category.name}

        self.assertEqual(serializer.data, expected_data)

    def test_serialization_valid_data(self):
        valid_event_category = {'name': 'Event category'}
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


class HistoricalStateSerializerTestClass(TestCase):
    def setUp(self):
        self.user_profile = User.objects.create(username='test_user', password='test_password')
        self.present_country = PresentCountry.objects.create(createdBy=self.user_profile, code='PC', name='Present country', updatedBy=self.user_profile)

#region HistoricalStateGetSerializer
    def test_serialization_get_all(self):
        historical_state = HistoricalState.objects.create(createdBy=self.user_profile, dateFrom='1234-05-06', dateTo='2345-06-07', name='Historical state', 
                                                          updatedBy=self.user_profile)
        serializer = HistoricalStateGetSerializer(historical_state)
        expected_data = {'id': historical_state.id, 'presentCountries': [], 'name': historical_state.name, 'dateFrom': historical_state.dateFrom, 
                         'dateTo': historical_state.dateTo, 'flagUrl': None}

        self.assertEqual(serializer.data, expected_data)

    def test_serialization_valid_data_get_all(self):
        valid_historical_state = {'dateFrom': '1234', 'dateTo': '4321', 'name': 'Historical state', 
                                  'presentCountries': [{'id': self.present_country.id, 'name': self.present_country.name}]}
        serializer = HistoricalStateGetSerializer(data=valid_historical_state)

        self.assertTrue(serializer.is_valid())

    def test_validation_name_not_present(self):
        invalid_historical_state = {'dateFrom': '1234', 'dateTo': '4321'}
        serializer = HistoricalStateGetSerializer(data=invalid_historical_state)

        self.assertFalse(serializer.is_valid())
        self.assertIn('name', serializer.errors)
        self.assertIn('presentCountries', serializer.errors)
        self.assertTrue(any('required' in error.code for error in serializer.errors['name']))
        self.assertTrue(any('required' in error.code for error in serializer.errors['presentCountries']))

    def test_validation_invalid_dates(self):
        invalid_historical_state = {'dateFrom': '123-1-1', 'dateTo': '4321-1', 'name': 'Historical state'}
        serializer = HistoricalStateGetSerializer(data=invalid_historical_state)

        self.assertFalse(serializer.is_valid())
        self.assertIn('dateFrom', serializer.errors)
        self.assertIn('dateTo', serializer.errors)
        self.assertTrue(any('invalid' in error.code for error in serializer.errors['dateFrom']))
        self.assertTrue(any('invalid' in error.code for error in serializer.errors['dateTo']))

    def test_validation_properties_exceed_max_length(self):
        invalid_historical_state = {'dateFrom': '1234'*4, 'dateTo': '4321'*4, 'name': 'h' * 256}
        serializer = HistoricalStateGetSerializer(data=invalid_historical_state)

        self.assertFalse(serializer.is_valid())
        self.assertIn('dateFrom', serializer.errors)
        self.assertIn('dateTo', serializer.errors)
        self.assertIn('name', serializer.errors)
        self.assertTrue(any('max_length' in error.code for error in serializer.errors['dateFrom']))
        self.assertTrue(any('max_length' in error.code for error in serializer.errors['dateTo']))
        self.assertTrue(any('max_length' in error.code for error in serializer.errors['name']))
#endregion
        
#region HistoricalStatePropertySerializer
    def test_serialization_property(self):
        historical_state = HistoricalState.objects.create(createdBy=self.user_profile, dateFrom='1234-05-06', dateTo='2345-06-07', name='Historical state', 
                                                          updatedBy=self.user_profile)
        serializer = HistoricalStatePropertySerializer(historical_state)
        expected_data = {'id': historical_state.id, 'name': historical_state.name}

        self.assertEqual(serializer.data, expected_data)

    def test_serialization_valid_data_property(self):
        valid_historical_state = {'name': 'Historical state'}
        serializer = HistoricalStatePropertySerializer(data=valid_historical_state)

        self.assertTrue(serializer.is_valid())
#endregion

#region HistoricalStateDeletePostUpdateSerializer
    def test_serialization(self):
        historical_state = HistoricalState.objects.create(createdBy=self.user_profile, dateFrom='1234-05-06', dateTo='2345-06-07', flagUrl='', name='Historical state',
                                                          updatedBy=self.user_profile)
        historical_state.presentCountries.set(PresentCountry.objects.all())

        serializer = HistoricalStateDeletePostUpdateSerializer(historical_state)
        expected_data = {'id': historical_state.id, 'name': historical_state.name, 'dateFrom': historical_state.dateFrom, 'dateTo': historical_state.dateTo, 
                         'flagUrl': historical_state.flagUrl, 'presentCountries': [self.present_country.id]}

        self.assertEqual(serializer.data, expected_data)

    def test_serialization_valid_data(self):
        valid_historical_state = {'dateFrom': '1234', 'dateTo': '1235', 'name': 'HistoricalState', 'presentCountries': [self.present_country.id]}
        serializer = HistoricalStateDeletePostUpdateSerializer(data=valid_historical_state)

        self.assertTrue(serializer.is_valid())

    def test_serialization_presentCountries_not_present(self):
        valid_historical_state = {'dateFrom': '1234', 'dateTo': '1235', 'name': 'HistoricalState'}
        serializer = HistoricalStateDeletePostUpdateSerializer(data=valid_historical_state)

        self.assertFalse(serializer.is_valid())
        self.assertIn('presentCountries', serializer.errors)
        self.assertTrue(any('required' in error.code for error in serializer.errors['presentCountries']))

    def test_serialization_presentCountries_invalid(self):
        valid_historical_state = {'dateFrom': '1234', 'dateTo': '1235', 'name': 'HistoricalState', 'presentCountries': [self.present_country.id - 1]}
        serializer = HistoricalStateDeletePostUpdateSerializer(data=valid_historical_state)

        self.assertFalse(serializer.is_valid())
        self.assertIn('presentCountries', serializer.errors)
        self.assertTrue(any('does_not_exist' in error.code for error in serializer.errors['presentCountries']))
#endregion
        

class PresentCountrySerializerTestClass(TestCase):
    def setUp(self):
        self.user_profile = User.objects.create(username='test_user', password='test_password')

#region PresentCountryGetAllSerializer
    def test_serialization_get_all(self):
        present_country = PresentCountry.objects.create(code='PC', createdBy=self.user_profile, flagUrl='link', name='Present country', updatedBy=self.user_profile)
        serializer = PresentCountryGetAllSerializer(present_country)
        expected_data = {'code': present_country.code, 'flagUrl': present_country.flagUrl, 'id': present_country.id, 'name': present_country.name}

        self.assertEqual(serializer.data, expected_data)

    def test_serialization_valid_data_get_all(self):
        valid_present_country = {'code':'PC', 'flagUrl': 'link', 'name': 'Present country'}
        serializer = PresentCountryGetAllSerializer(data=valid_present_country)

        self.assertTrue(serializer.is_valid())

    def test_validation_properties_exceed_max_length(self):
        invalid_present_country = {'code':'PC'*3, 'flagUrl': 'f' * 256, 'name': 'P'*256}
        serializer = PresentCountryGetAllSerializer(data=invalid_present_country)

        self.assertFalse(serializer.is_valid())
        self.assertIn('code', serializer.errors)
        self.assertIn('flagUrl', serializer.errors)
        self.assertIn('name', serializer.errors)
        self.assertTrue(any('max_length' in error.code for error in serializer.errors['code']))
        self.assertTrue(any('max_length' in error.code for error in serializer.errors['flagUrl']))
        self.assertTrue(any('max_length' in error.code for error in serializer.errors['name']))

    def test_validation_properties_not_present(self):
        invalid_present_country = {}
        serializer = PresentCountryGetAllSerializer(data=invalid_present_country)

        self.assertFalse(serializer.is_valid())
        self.assertIn('code', serializer.errors)
        self.assertIn('name', serializer.errors)
        self.assertTrue(any('required' in error.code for error in serializer.errors['code']))
        self.assertTrue(any('required' in error.code for error in serializer.errors['name']))
#endregion
        
#region PresentCountryPropertySerializer
    def test_serialization_property(self):
        present_country = PresentCountry.objects.create(code='PC', createdBy=self.user_profile, name='Present country', updatedBy=self.user_profile)
        serializer = PresentCountryPropertySerializer(present_country)
        expected_data = {'id': present_country.id, 'name': present_country.name}

        self.assertEqual(serializer.data, expected_data)

    def test_serialization_valid_data_property(self):
        valid_present_country = {'code':'PC', 'name': 'Present country'}
        serializer = PresentCountryPropertySerializer(data=valid_present_country)

        self.assertTrue(serializer.is_valid())
#endregion
        

class HistoricalEventSerializerClass(TestCase):
    @classmethod
    def setUp(self):
        self.user_profile = User.objects.create(username='test_user', password='test_password')
        self.event_category = EventCategory.objects.create(createdBy=self.user_profile, name='Event category', updatedBy=self.user_profile)
        self.historical_state = HistoricalState.objects.create(createdBy=self.user_profile, dateFrom='1234-05-06', dateTo='2345-06-07', name='Historical state', 
                                                               updatedBy=self.user_profile)
        self.present_country = PresentCountry.objects.create(code='PC', createdBy=self.user_profile, name='Present country', updatedBy=self.user_profile)

#region HistoricalEventDeletePostUpdateSerializer
    def test_serialization_delete_post_update(self):
        historical_event = HistoricalEvent.objects.create(createdBy=self.user_profile, date='1234', description='description', eventCategoryId=self.event_category, 
                                                          historicalStateId=self.historical_state, latitude=12.345678, longitude=23.456789, name='Historical event', 
                                                          presentCountryId=self.present_country, time='12:34', updatedBy=self.user_profile)
        serializer = HistoricalEventDeletePostUpdateSerializer(historical_event)
        expected_data = {'id': historical_event.id, 'name': historical_event.name, 'date': historical_event.date, 'time': historical_event.time, 
                         'description': historical_event.description, 'latitude': str(historical_event.latitude), 'longitude': str(historical_event.longitude), 
                         'approximateRealLocation': False, 'eventCategoryId': self.event_category.id, 'presentCountryId': self.present_country.id, 
                         'historicalStateId': self.historical_state.id}
        
        self.assertEqual(serializer.data, expected_data)

    def test_serialization_valid_delete_post_update(self):
        valid_historical_event = {'date': '1234',  'description': 'description', 'eventCategoryId': self.event_category.id, 'historicalStateId': self.historical_state.id, 
                                  'latitude': 12.345678, 'longitude': 23.456789, 'name':'Historical event', 'presentCountryId': self.present_country.id, 'time': '12:34'}
        serializer = HistoricalEventDeletePostUpdateSerializer(data=valid_historical_event)

        self.assertTrue(serializer.is_valid())

    def test_validation_properties_exceed_max_length(self):
        invalid_historical_event = {'date': '1234'*4,  'description': 'd'*1001, 'eventCategoryId': self.event_category.id, 'historicalStateId': self.historical_state.id, 
                                    'latitude': 12.345678, 'longitude': 23.456789, 'name':'H'*256, 'presentCountryId': self.present_country.id, 'time': '12:34'}
        
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
        self.assertIn('eventCategoryId', serializer.errors)
        self.assertIn('historicalStateId', serializer.errors)
        self.assertIn('name', serializer.errors)
        self.assertIn('presentCountryId', serializer.errors)
        self.assertTrue(any('required' in error.code for error in serializer.errors['date']))
        self.assertTrue(any('required' in error.code for error in serializer.errors['description']))
        self.assertTrue(any('required' in error.code for error in serializer.errors['eventCategoryId']))
        self.assertTrue(any('required' in error.code for error in serializer.errors['historicalStateId']))
        self.assertTrue(any('required' in error.code for error in serializer.errors['name']))
        self.assertTrue(any('required' in error.code for error in serializer.errors['presentCountryId']))

    def test_validation_invalid_date(self):
        invalid_historical_event = {'date': '1234-1', 'description': 'description', 'eventCategoryId': self.event_category.id, 'historicalStateId': self.historical_state.id, 
                                    'latitude': 12.345678, 'longitude': 23.456789, 'name':'Historical event', 'presentCountryId': self.present_country.id, 'time': '12:34'}
        serializer = HistoricalEventDeletePostUpdateSerializer(data=invalid_historical_event)

        self.assertFalse(serializer.is_valid())
        self.assertIn('date', serializer.errors)
        self.assertTrue(any('invalid' in error.code for error in serializer.errors['date']))

    def test_validation_coordinates_outside_range(self):
        invalid_historical_event = {'date': '1234-1', 'description': 'description', 'eventCategoryId': self.event_category.id, 'historicalStateId': self.historical_state.id, 
                                    'latitude': -180.000001, 'longitude': 180.000001, 'name':'Historical event', 'presentCountryId': self.present_country.id, 'time': '12:34'}
        serializer = HistoricalEventDeletePostUpdateSerializer(data=invalid_historical_event)

        self.assertFalse(serializer.is_valid())
        self.assertTrue(any('min_value' in error.code for error in serializer.errors['latitude']))
        self.assertTrue(any('max_value' in error.code for error in serializer.errors['longitude']))

    def test_validation_coordinates_exceed_max_digits(self):
        invalid_historical_event = {'date': '1234-1', 'description': 'description', 'eventCategoryId': self.event_category.id, 'historicalStateId': self.historical_state.id, 
                                    'latitude': 123456.7899, 'longitude': -123456.7899, 'name':'Historical event', 'presentCountryId': self.present_country.id, 'time': '12:34'}
        serializer = HistoricalEventDeletePostUpdateSerializer(data=invalid_historical_event)

        self.assertFalse(serializer.is_valid())
        self.assertTrue(any('max_digits' in error.code for error in serializer.errors['latitude']))
        self.assertTrue(any('max_digits' in error.code for error in serializer.errors['longitude']))

    def test_validation_coordinates_exceed_max_decimals(self):
        invalid_historical_event = {'date': '1234-1', 'description': 'description', 'eventCategoryId': self.event_category.id, 'historicalStateId': self.historical_state.id, 
                                    'latitude': 12.3456789, 'longitude': -12.3456789, 'name':'Historical event', 'presentCountryId': self.present_country.id, 'time': '12:34'}
        serializer = HistoricalEventDeletePostUpdateSerializer(data=invalid_historical_event)

        self.assertFalse(serializer.is_valid())
        self.assertTrue(any('max_decimal_places' in error.code for error in serializer.errors['latitude']))
        self.assertTrue(any('max_decimal_places' in error.code for error in serializer.errors['longitude']))

    def test_validation_create_event_coordinates(self):
        historical_event = {'date': '1234', 'description': 'description', 'eventCategoryId': self.event_category.id, 'historicalStateId': self.historical_state.id, 
                            'latitude': 12.345678, 'longitude': 23.456789, 'name':'Historical event', 'presentCountryId': self.present_country.id, 'time': '12:34'}

        with patch('events.models.get_current_user', return_value=self.user_profile):
            serializer = HistoricalEventDeletePostUpdateSerializer(data=historical_event)
            if serializer.is_valid():
                instance = serializer.save()
                self.assertIsInstance(instance, HistoricalEvent)
                self.assertEqual(instance.approximateRealLocation, True)
                self.assertEqual(instance.createdBy, self.user_profile)
                self.assertEqual(instance.updatedBy, self.user_profile)

    def test_validation_create_event_no_coordinates(self):
        historical_event = {'date': '1234', 'description': 'description', 'eventCategoryId': self.event_category.id, 'historicalStateId': self.historical_state.id, 
                            'name':'Historical event', 'presentCountryId': self.present_country.id, 'time': '12:34'}
        with patch('events.models.get_current_user', return_value=self.user_profile):
            serializer = HistoricalEventDeletePostUpdateSerializer(data=historical_event)
            if serializer.is_valid():
                instance = serializer.save()
                self.assertIsInstance(instance, HistoricalEvent)
                self.assertEqual(instance.approximateRealLocation, False)
                self.assertEqual(instance.createdBy, self.user_profile)
                self.assertEqual(instance.updatedBy, self.user_profile)
#endregion
    
#region HistoricalEventGetSerializer
    def test_serialization_get(self):
        historical_event = HistoricalEvent.objects.create(createdBy=self.user_profile, date='1234', description='description', eventCategoryId=self.event_category, 
                                                          historicalStateId=self.historical_state, latitude=12.345678, longitude=23.456789, name='Historical event', 
                                                          presentCountryId=self.present_country, time='12:34', updatedBy=self.user_profile)
        serializer = HistoricalEventGetSerializer(historical_event)
        
        self.assertEqual(serializer.data['approximateRealLocation'], False)
        self.assertEqual(serializer.data['date'], historical_event.date)
        self.assertEqual(serializer.data['description'], historical_event.description)
        self.assertEqual(serializer.data['eventCategory']['id'], self.event_category.id)
        self.assertEqual(serializer.data['eventCategory']['name'], self.event_category.name)
        self.assertEqual(serializer.data['historicalState']['id'], self.historical_state.id)
        self.assertEqual(serializer.data['historicalState']['name'], self.historical_state.name)
        self.assertEqual(serializer.data['id'], historical_event.id)
        self.assertEqual(serializer.data['latitude'], str(historical_event.latitude))
        self.assertEqual(serializer.data['longitude'], str(historical_event.longitude))
        self.assertEqual(serializer.data['name'], historical_event.name)
        self.assertEqual(serializer.data['presentCountry']['id'], self.present_country.id)
        self.assertEqual(serializer.data['presentCountry']['name'], self.present_country.name)
        self.assertEqual(serializer.data['time'], historical_event.time)

    def test_serialization_valid_get(self):
        valid_historical_event = {'date': '1234', 'description': 'description', 'eventCategory': OrderedDict([('id', self.event_category.id), ('name', self.event_category.name)]), 
                                  'historicalState': OrderedDict([('id', self.historical_state.id), ('name', self.historical_state.name)]), 'latitude': 12.345678, 
                                  'longitude': 23.456789, 'name':'Historical event', 
                                  'presentCountry': OrderedDict([('id', self.present_country.id), ('name', self.present_country.name)]) , 'time': '12:34',}
        serializer = HistoricalEventGetSerializer(data=valid_historical_event)

        self.assertTrue(serializer.is_valid())
#endregion


class HistoricalFigureSerializerClass(TestCase):
    @classmethod
    def setUp(self):
        self.user_profile = User.objects.create(username='test_user', password='test_password')
        self.historical_state = HistoricalState.objects.create(createdBy=self.user_profile, dateFrom='1234-05-06', dateTo='2345-06-07', name='Historical state', 
                                                               updatedBy=self.user_profile)
        self.present_country = PresentCountry.objects.create(code='PC', createdBy=self.user_profile, name='Present country', updatedBy=self.user_profile)

#region HistoricalFigureDeletePostUpdateSerializer
    def test_serialization_delete_post_update(self):
        historical_figure = HistoricalFigure.objects.create(birthDate='1234', birthHistoricalStateId=self.historical_state, birthPresentCountryId=self.present_country, 
                                                            createdBy=self.user_profile, deathDate='1345-01-02', deathHistoricalStateId=self.historical_state, 
                                                            deathPresentCountryId=self.present_country, name='Historical Figure', updatedBy=self.user_profile)
        serializer = HistoricalFigureDeletePostUpdateSerializer(historical_figure)
        expected_data = {'birthDate': historical_figure.birthDate, 'birthHistoricalStateId': self.historical_state.id, 'birthPresentCountryId': self.present_country.id, 
                         'deathDate': historical_figure.deathDate, 'deathHistoricalStateId': self.historical_state.id, 'deathPresentCountryId': self.present_country.id, 
                         'name': historical_figure.name}
        
        self.assertEqual(serializer.data, expected_data)

    def test_serialization_valid_delete_post_update(self):
        valid_historical_figure = {'birthDate': '1234', 'birthHistoricalStateId': self.historical_state.id, 'birthPresentCountryId': self.present_country.id, 
                                   'deathDate': '1345-01-02', 'deathHistoricalStateId': self.historical_state.id, 'deathPresentCountryId': self.present_country.id, 
                                   'name':'Historical figure'}
        serializer = HistoricalFigureDeletePostUpdateSerializer(data=valid_historical_figure)

        self.assertTrue(serializer.is_valid())

    def test_validation_properties_exceed_max_length(self):
        invalid_historical_figure = {'birthDate': '1234'*4, 'birthHistoricalStateId': self.historical_state.id, 'birthPresentCountryId': self.present_country.id, 
                                     'deathDate': '1'*16, 'deathHistoricalStateId': self.historical_state.id, 'deathPresentCountryId': self.present_country.id, 
                                     'name':'H'*256}
        serializer = HistoricalFigureDeletePostUpdateSerializer(data=invalid_historical_figure)

        self.assertFalse(serializer.is_valid())
        self.assertIn('birthDate', serializer.errors)
        self.assertIn('deathDate', serializer.errors)
        self.assertIn('name', serializer.errors)
        self.assertTrue(any('max_length' in error.code for error in serializer.errors['birthDate']))
        self.assertTrue(any('max_length' in error.code for error in serializer.errors['deathDate']))
        self.assertTrue(any('max_length' in error.code for error in serializer.errors['name']))

    def test_validation_mandatory_properties_not_present(self):
        invalid_historical_figure = {'deathDate': '1345-01-02', 'deathHistoricalStateId': self.historical_state.id, 'deathPresentCountryId': self.present_country.id}
        serializer = HistoricalFigureDeletePostUpdateSerializer(data=invalid_historical_figure)

        self.assertFalse(serializer.is_valid())
        self.assertIn('birthDate', serializer.errors)
        self.assertIn('birthHistoricalStateId', serializer.errors)
        self.assertIn('birthPresentCountryId', serializer.errors)
        self.assertIn('name', serializer.errors)
        self.assertTrue(any('required' in error.code for error in serializer.errors['birthDate']))
        self.assertTrue(any('required' in error.code for error in serializer.errors['birthHistoricalStateId']))
        self.assertTrue(any('required' in error.code for error in serializer.errors['birthPresentCountryId']))    
        self.assertTrue(any('required' in error.code for error in serializer.errors['name']))

    def test_validation_invalid_dates(self):
        invalid_historical_figure = {'birthDate': '1-1', 'birthHistoricalStateId': self.historical_state.id, 'birthPresentCountryId': self.present_country.id, 
                                     'deathDate': '100-1-1', 'deathHistoricalStateId': self.historical_state.id, 'deathPresentCountryId': self.present_country.id, 
                                     'name':'Historical figure'}
        serializer = HistoricalFigureDeletePostUpdateSerializer(data=invalid_historical_figure)

        self.assertFalse(serializer.is_valid())
        self.assertIn('birthDate', serializer.errors)
        self.assertIn('deathDate', serializer.errors)
        self.assertTrue(any('invalid' in error.code for error in serializer.errors['birthDate']))
        self.assertTrue(any('invalid' in error.code for error in serializer.errors['deathDate']))
#endregion

#region HistoricalFigureGetSerializer
    def test_serialization_get(self):
        historical_figure = HistoricalFigure.objects.create(birthDate='1234', birthHistoricalStateId=self.historical_state, birthPresentCountryId=self.present_country, 
                                                            createdBy=self.user_profile, deathDate='1345-01-02', deathHistoricalStateId=self.historical_state, 
                                                            deathPresentCountryId=self.present_country, name='Historical Figure', updatedBy=self.user_profile)
        serializer = HistoricalFigureGetSerializer(historical_figure)
        
        self.assertEqual(serializer.data['birthDate'], historical_figure.birthDate)
        self.assertEqual(serializer.data['birthHistoricalState']['id'], self.historical_state.id)
        self.assertEqual(serializer.data['birthHistoricalState']['name'], self.historical_state.name)
        self.assertEqual(serializer.data['birthPresentCountry']['id'], self.present_country.id)
        self.assertEqual(serializer.data['birthPresentCountry']['name'], self.present_country.name)
        self.assertEqual(serializer.data['deathDate'], historical_figure.deathDate)
        self.assertEqual(serializer.data['deathHistoricalState']['id'], self.historical_state.id)
        self.assertEqual(serializer.data['deathHistoricalState']['name'], self.historical_state.name)
        self.assertEqual(serializer.data['deathPresentCountry']['id'], self.present_country.id)
        self.assertEqual(serializer.data['deathPresentCountry']['name'], self.present_country.name)
        self.assertEqual(serializer.data['id'], historical_figure.id)
        self.assertEqual(serializer.data['name'], historical_figure.name)

    def test_serialization_valid_get(self):
        valid_historical_figure = {'birthDate': '1234', 'birthHistoricalState': OrderedDict([('id', self.historical_state.id), ('name', self.historical_state.name)]), 
                                   'birthPresentCountry': OrderedDict([('id', self.present_country.id), ('name', self.present_country.name)]), 'deathDate': '1345-01-02',
                                   'deathHistoricalState': OrderedDict([('id', self.historical_state.id), ('name', self.historical_state.name)]), 
                                   'deathPresentCountry': OrderedDict([('id', self.present_country.id), ('name', self.present_country.name)]), 'name': 'Historical Figure'}
        serializer = HistoricalFigureGetSerializer(data=valid_historical_figure)

        self.assertTrue(serializer.is_valid())
#endregion


class HistoricalFigureRoleSerializersTestClass(TestCase):
    @classmethod
    def setUp(self):
        self.user_profile = User.objects.create(username='test_user', password='test_password')

#region HistoricalFigureRoleSerializer
    def test_serialization(self):
        figure_role = HistoricalFigureRole.objects.create(createdBy=self.user_profile, description='Figure role description', name='Figure role', 
                                                          updatedBy=self.user_profile)
        serializer = HistoricalFigureRoleSerializer(figure_role)
        expected_data = {'id': figure_role.id, 'description': figure_role.description, 'name': figure_role.name}

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
        figure_role = HistoricalFigureRole.objects.create(createdBy=self.user_profile, name='Figure role', updatedBy=self.user_profile)
        serializer = HistoricalFigureRolePropertySerializer(figure_role)
        expected_data = {'id': figure_role.id, 'name': figure_role.name}

        self.assertEqual(serializer.data, expected_data)

    def test_serialization_valid_data_property(self):
        valid_figure_role = {'name': 'Figure role'}
        serializer = HistoricalFigureRolePropertySerializer(data=valid_figure_role)

        self.assertTrue(serializer.is_valid())
#endregion
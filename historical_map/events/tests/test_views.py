from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from .data_provider import DataProvider
from ..models import EventCategory, HistoricalEvent, HistoricalFigure, HistoricalFigureRole, HistoricalState, PresentCountry
from ..serializers import *

class BaseViewTestClass(TestCase):
    client = APIClient()
    data_provider = DataProvider()


class EventCategoryViewTestClass(BaseViewTestClass):
    @classmethod
    def setUp(self):
        self.user_profile = self.data_provider.create_user()
        self.event_category = self.data_provider.create_event_category(name='Event category 1', user_profile=self.user_profile)
        self.data_provider.create_event_category(name='Event category 2', user_profile=self.user_profile)

        self.url_list = reverse('event-category-list')
        self.url_item = reverse('event-category-item', kwargs={'pk':self.event_category.pk})

    def tearDown(self):
        EventCategory.objects.all().delete()

    def test_get_list(self):
        self.client.force_login(self.user_profile)
        response = self.client.get(self.url_list)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotIn('next', response.data)
        self.assertNotIn('previous', response.data)
        
        event_category_list = EventCategory.objects.all()
        serializer = EventCategorySerializer(event_category_list, many=True)
        self.assertEqual(response.data, serializer.data)

    def test_get_list_no_object(self):
        EventCategory.objects.all().delete()
        self.client.force_login(self.user_profile)
        response = self.client.get(self.url_list)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

    def test_post_event_category(self):
        event_category = EventCategorySerializer(data={'name': 'Event category'})
        event_category.is_valid()

        self.client.force_login(self.user_profile)
        response = self.client.post(self.url_list, data=event_category.data, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], event_category.data['name'])

    def test_delete_item(self):
        self.client.force_login(self.user_profile)
        response = self.client.delete(self.url_item)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsNone(response.data)

    def test_delete_item_non_existent(self):
        self.client.force_login(self.user_profile)
        response = self.client.delete(reverse('event-category-item', kwargs={'pk':self.event_category.pk - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')

    def test_put_item(self):
        updated_event_category = {'name': 'Event Category updated'}
        serializer = EventCategorySerializer(data=updated_event_category)
        serializer.is_valid()

        self.client.force_login(self.user_profile)
        response = self.client.put(self.url_item, serializer.data, content_type='application/json')
        self.assertEqual(response.data['name'], updated_event_category['name'])

    def test_put_item_non_existent(self):
        self.client.force_login(self.user_profile)
        response = self.client.put(reverse('event-category-item', kwargs={'pk':self.event_category.pk - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')

    def test_patch_item(self):
        updated_event_category = {'name': 'Event Category updated'}
        serializer = EventCategorySerializer(data=updated_event_category)
        serializer.is_valid()

        self.client.force_login(self.user_profile)
        response = self.client.patch(self.url_item, serializer.data, content_type='application/json')
        self.assertEqual(response.data['name'], updated_event_category['name'])

    def test_patch_item_non_existent(self):
        self.client.force_login(self.user_profile)
        response = self.client.patch(reverse('event-category-item', kwargs={'pk':self.event_category.pk - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')


class HistoricalStateViewTestClass(BaseViewTestClass):
    @classmethod
    def setUp(self):
        self.user_profile = self.data_provider.create_user()
        self.historical_state = self.data_provider.create_historical_state(name='Historical State 1', user_profile=self.user_profile)
        self.present_country = self.data_provider.create_present_country(code='PC', name='Present country', user_profile=self.user_profile)
        self.data_provider.create_historical_state(name='Historical State 2', user_profile=self.user_profile)

        self.url_list = reverse('historical-state-list')
        self.url_item = reverse('historical-state-item', kwargs={'pk':self.historical_state.pk})

    def tearDown(self):
        HistoricalState.objects.all().delete()
        PresentCountry.objects.all().delete()

    def test_get_list(self):
        self.client.force_login(self.user_profile)
        response = self.client.get(self.url_list)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotIn('next', response.data)
        self.assertNotIn('previous', response.data)
        
        historical_state_list = HistoricalState.objects.all()
        serializer = HistoricalStateGetSerializer(historical_state_list, many=True)
        self.assertEqual(response.data, serializer.data)

    def test_get_list_no_object(self):
        HistoricalState.objects.all().delete()
        self.client.force_login(self.user_profile)
        response = self.client.get(self.url_list)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

    def test_post_historical_state(self):
        historical_state = HistoricalStateDeletePostUpdateSerializer(data={'end_date': '1235', 'name': 'Historical State', 
                                                                           'present_countries': [{'end_date': '1235', 'present_country': self.present_country.pk,
                                                                                                  'start_date': '1234'}], 'start_date': '1234'})
        historical_state.is_valid()
        
        self.client.force_login(self.user_profile)
        response = self.client.post(self.url_list, data=historical_state.data, content_type='application/json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['start_date'], historical_state.data['start_date'])
        self.assertEqual(response.data['end_date'], historical_state.data['end_date'])
        self.assertEqual(response.data['name'], historical_state.data['name'])
        self.assertEqual(response.data['present_countries'], historical_state.data['present_countries'])

    def test_delete_item(self):
        self.client.force_login(self.user_profile)
        response = self.client.delete(self.url_item)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsNone(response.data)

    def test_delete_item_non_existent(self):
        self.client.force_login(self.user_profile)
        response = self.client.delete(reverse('historical-state-item', kwargs={'pk':self.historical_state.pk - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')

    def test_put_item(self):
        updated_historical_state = {'end_date': '1235', 'name': 'HistoricalState updated', 
                                    'present_countries': [{'end_date': '1236', 'present_country': self.present_country.pk, 'start_date': '1234'}], 'start_date': '1234'}
        serializer = HistoricalStateDeletePostUpdateSerializer(data=updated_historical_state)
        serializer.is_valid()

        self.client.force_login(self.user_profile)
        response = self.client.put(self.url_item, serializer.data, content_type='application/json')
        self.assertEqual(response.data['name'], updated_historical_state['name'])
        self.assertEqual(len(response.data['present_countries']), 1)
        self.assertEqual(response.data['present_countries'][0]['start_date'], updated_historical_state['present_countries'][0]['start_date'])
        self.assertEqual(response.data['present_countries'][0]['end_date'], updated_historical_state['present_countries'][0]['end_date'])
        self.assertEqual(response.data['present_countries'][0]['present_country'], updated_historical_state['present_countries'][0]['present_country'])

    def test_put_item_non_existent(self):
        self.client.force_login(self.user_profile)
        response = self.client.put(reverse('historical-state-item', kwargs={'pk':self.historical_state.pk - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')

    def test_patch_item(self):
        updated_historical_state = {'end_date': '1235', 'name': 'HistoricalState updated', 
                                    'present_countries': [{'end_date': '1236', 'present_country': self.present_country.pk, 'start_date': '1234'}], 'start_date': '1234'}
        serializer = HistoricalStateDeletePostUpdateSerializer(data=updated_historical_state)
        serializer.is_valid()

        self.client.force_login(self.user_profile)
        response = self.client.patch(self.url_item, serializer.data, content_type='application/json')
        self.assertEqual(response.data['name'], updated_historical_state['name'])
        self.assertEqual(len(response.data['present_countries']), 1)
        self.assertEqual(response.data['present_countries'][0]['start_date'], updated_historical_state['present_countries'][0]['start_date'])
        self.assertEqual(response.data['present_countries'][0]['end_date'], updated_historical_state['present_countries'][0]['end_date'])
        self.assertEqual(response.data['present_countries'][0]['present_country'], updated_historical_state['present_countries'][0]['present_country'])

    def test_patch_item_non_existent(self):
        self.client.force_login(self.user_profile)
        response = self.client.patch(reverse('historical-state-item', kwargs={'pk':self.historical_state.pk - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')


class PresentCountryViewTestClass(BaseViewTestClass):
    @classmethod
    def setUp(self):
        self.user_profile = self.data_provider.create_user()
        self.present_country = self.data_provider.create_present_country(code='PC1', name='Present country 1', user_profile=self.user_profile)
        self.data_provider.create_present_country(code='PC2', name='Present country 2', user_profile=self.user_profile)

        self.historical_state = self.data_provider.create_historical_state(name='Historical State', user_profile=self.user_profile)
        self.data_provider.create_historical_state_present_country_period(historical_state=self.historical_state, present_country=self.present_country, 
                                                                          user_profile=self.user_profile)

        self.url = reverse('present-country-list')

    def tearDown(self):
        HistoricalState.objects.all().delete()
        PresentCountry.objects.all().delete()

    def test_get_list_no_historical_state_parameter(self):
        self.client.force_login(self.user_profile)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotIn('next', response.data)
        self.assertNotIn('previous', response.data)
        
        present_country_list = PresentCountry.objects.all()
        serializer = PresentCountryGetAllSerializer(present_country_list, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(len(response.data), 2)

    def test_get_list_with_historical_state_parameter(self):
        self.client.force_login(self.user_profile)
        response = self.client.get(self.url, data={'histStateId': self.historical_state.pk})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        linked_present_country_list = PresentCountry.objects.filter(id=self.present_country.pk)
        serializer = PresentCountryGetAllSerializer(linked_present_country_list, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(len(response.data), 1)

    def test_get_list_no_object(self):
        PresentCountry.objects.all().delete()
        self.client.force_login(self.user_profile)
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])


class HistoricalEventViewTestClass(BaseViewTestClass):
    @classmethod
    def setUp(self):
        self.user_profile = self.data_provider.create_user()
        self.event_category = self.data_provider.create_event_category(user_profile=self.user_profile)
        self.historical_state = self.data_provider.create_historical_state(name='Historical State', user_profile=self.user_profile)
        self.present_country = self.data_provider.create_present_country(code='PC', name='Present Country', user_profile=self.user_profile)
        self.historical_event = self.data_provider.create_historical_event(event_category=self.event_category, historical_state=self.historical_state, 
                                                                           present_country=self.present_country, user_profile=self.user_profile)
        self.data_provider.create_historical_event(event_category=self.event_category, historical_state=self.historical_state, name='Historical event 2',
                                                   present_country=self.present_country, user_profile=self.user_profile)
        
        self.url_list = reverse('event-list')
        self.url_create = reverse('event-create')
        self.url_item = reverse('event-item', kwargs={'pk':self.historical_event.pk})

    def tearDown(self):
        HistoricalEvent.objects.all().delete()
        EventCategory.objects.all().delete()
        HistoricalState.objects.all().delete()
        PresentCountry.objects.all().delete()
        
    def test_get_list(self):
        response = self.client.get(self.url_list)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('next', response.data)
        self.assertIn('previous', response.data)
        self.assertIn('results', response.data)
        self.assertIn('count', response.data)
        
        historical_event_list = HistoricalEvent.objects.all()
        serializer = HistoricalEventGetSerializer(historical_event_list, many=True)
        self.assertEqual(response.data['results'], serializer.data)
        self.assertEqual(response.data['count'], 2)

    def test_get_list_no_object(self):
        HistoricalEvent.objects.all().delete()
        response = self.client.get(self.url_list)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'], [])

    def test_post_event_with_coordinates(self):
        historical_event = HistoricalEventDeletePostUpdateSerializer(data= {'date': '1234-01-02', 'description': 'post description', 
                                                                            'event_category': self.event_category.pk, 'historical_state': self.historical_state.pk, 
                                                                            'latitude': 12.34, 'longitude': 23.45, 'name': 'Historical event with coordinates', 
                                                                            'present_country': self.present_country.pk})
        historical_event.is_valid()
        self.client.force_login(self.user_profile)
        response = self.client.post(self.url_create, data=historical_event.data, content_type='application/json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['approximate_location'], True)
        self.assertEqual(response.data['date'], historical_event.data['date'])
        self.assertEqual(response.data['description'], historical_event.data['description'])
        self.assertEqual(response.data['event_category'], historical_event.data['event_category'])
        self.assertEqual(response.data['historical_state'], historical_event.data['historical_state'])
        self.assertEqual(response.data['latitude'], historical_event.data['latitude'])
        self.assertEqual(response.data['longitude'], historical_event.data['longitude'])
        self.assertEqual(response.data['name'], historical_event.data['name'])
        self.assertEqual(response.data['present_country'], historical_event.data['present_country'])

    def test_post_event_no_coordinates(self):
        historical_event = HistoricalEventDeletePostUpdateSerializer(data= {'date': '1234-01-02', 'description': 'post description', 
                                                                            'event_category': self.event_category.pk, 'historical_state': self.historical_state.pk, 
                                                                            'name': 'Historical event without coordinates', 'present_country': self.present_country.pk})
        historical_event.is_valid()
        self.client.force_login(self.user_profile)
        response = self.client.post(self.url_create, data=historical_event.data, content_type='application/json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['approximate_location'], False)
        self.assertEqual(response.data['date'], historical_event.data['date'])
        self.assertEqual(response.data['description'], historical_event.data['description'])
        self.assertEqual(response.data['event_category'], historical_event.data['event_category'])
        self.assertEqual(response.data['historical_state'], historical_event.data['historical_state'])
        self.assertEqual(response.data['latitude'], historical_event.data['latitude'])
        self.assertEqual(response.data['longitude'], historical_event.data['longitude'])
        self.assertEqual(response.data['name'], historical_event.data['name'])
        self.assertEqual(response.data['present_country'], historical_event.data['present_country'])

    def test_get_item(self):
        self.client.force_login(self.user_profile)
        response = self.client.get(self.url_item)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(response.data['approximate_location'], False)
        self.assertEqual(response.data['date'], self.historical_event.date)
        self.assertEqual(response.data['description'], self.historical_event.description)
        self.assertEqual(response.data['event_category']['id'], self.event_category.pk)
        self.assertEqual(response.data['event_category']['name'], self.event_category.name)
        self.assertEqual(response.data['historical_state']['id'], self.historical_state.pk)
        self.assertEqual(response.data['historical_state']['name'], self.historical_state.name)
        self.assertEqual(response.data['latitude'], format(self.historical_event.latitude, '.6f'))
        self.assertEqual(response.data['longitude'], format(self.historical_event.longitude, '.6f'))
        self.assertEqual(response.data['name'], self.historical_event.name)
        self.assertEqual(response.data['present_country']['id'], self.present_country.pk)
        self.assertEqual(response.data['present_country']['name'], self.present_country.name)

    def test_get_item_non_existent(self):
        self.client.force_login(self.user_profile)
        response = self.client.get(reverse('event-item', kwargs={'pk':self.historical_event.pk - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')

    def test_delete_item(self):
        self.client.force_login(self.user_profile)
        response = self.client.delete(self.url_item)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsNone(response.data)

    def test_delete_item_non_existent(self):
        self.client.force_login(self.user_profile)
        response = self.client.delete(reverse('event-item', kwargs={'pk':self.historical_event.pk - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')

    def test_put_item(self):
        updated_historical_event = {'date': '1234-01-02', 'description': 'post description', 'event_category': self.event_category.pk, 'latitude': 12.34, 
                                    'longitude': 23.45, 'historical_state': self.historical_state.pk, 'name': 'Historical event updated name', 
                                    'present_country': self.present_country.pk, 'time':'12:34'}
        serializer = HistoricalEventDeletePostUpdateSerializer(data=updated_historical_event)
        serializer.is_valid()

        self.client.force_login(self.user_profile)
        response = self.client.put(self.url_item, serializer.data, content_type='application/json')
        self.assertEqual(response.data['name'], updated_historical_event['name'])

    def test_put_item_non_existent(self):
        self.client.force_login(self.user_profile)
        response = self.client.put(reverse('event-item', kwargs={'pk':self.historical_event.pk - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')

    def test_patch_item(self):
        updated_historical_event = {'date': '1234-01-02', 'description': 'post description', 'event_category': self.event_category.pk, 'latitude': 12.34, 'longitude': 23.45, 
                                    'historical_state': self.historical_state.pk, 'name': 'Historical event updated name', 'present_country': self.present_country.pk, 
                                    'time':'12:34'}
        serializer = HistoricalEventDeletePostUpdateSerializer(data=updated_historical_event)
        serializer.is_valid()

        self.client.force_login(self.user_profile)
        response = self.client.patch(self.url_item, serializer.data, content_type='application/json')
        self.assertEqual(response.data['name'], updated_historical_event['name'])

    def test_patch_item_non_existent(self):
        self.client.force_login(self.user_profile)
        response = self.client.patch(reverse('event-item', kwargs={'pk':self.historical_event.pk - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')


class HistoricalFigureViewTestClass(BaseViewTestClass):
    @classmethod
    def setUp(self):
        self.user_profile = self.data_provider.create_user()
        self.historical_state = self.data_provider.create_historical_state(name='Historical State', user_profile=self.user_profile)
        self.present_country = self.data_provider.create_present_country(code='PC', name='Present Country', user_profile=self.user_profile)
        self.historical_figure = self.data_provider.create_historical_figure(birth_historical_state=self.historical_state, birth_present_country=self.present_country,
                                                                              death_historical_state=self.historical_state, death_present_country=self.present_country,
                                                                              user_profile=self.user_profile)
        self.data_provider.create_historical_figure(birth_historical_state=self.historical_state, birth_present_country=self.present_country, death_date=None,
                                                    death_historical_state=None, death_present_country=None, user_profile=self.user_profile)
        
        self.url_list = reverse('figure-list')
        self.url_item = reverse('figure-item', kwargs={'pk':self.historical_figure.pk})

    def tearDown(self):
        HistoricalFigure.objects.all().delete()
        HistoricalState.objects.all().delete()
        PresentCountry.objects.all().delete()
        
    def test_get_list(self):
        self.client.force_login(self.user_profile)
        response = self.client.get(self.url_list)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('next', response.data)
        self.assertIn('previous', response.data)
        self.assertIn('results', response.data)
        self.assertIn('count', response.data)
        
        historical_figure_list = HistoricalFigure.objects.all()
        serializer = HistoricalFigureGetSerializer(historical_figure_list, many=True)
        self.assertEqual(response.data['results'], serializer.data)
        self.assertEqual(response.data['count'], 2)

    def test_get_list_no_object(self):
        HistoricalFigure.objects.all().delete()
        self.client.force_login(self.user_profile)
        response = self.client.get(self.url_list)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'], [])

    def test_post_figure(self):
        historical_figure = HistoricalFigureDeletePostUpdateSerializer(data= {'birth_date': '1900-12-11', 'birth_historical_state': self.historical_state.pk, 
                                                                             'birth_present_country': self.present_country.pk, 'death_date': '2000-10-09', 
                                                                             'death_historical_state': self.historical_state.pk, 
                                                                             'death_present_country': self.present_country.pk, 'name': 'Historical Figure Post'})
        historical_figure.is_valid()
        self.client.force_login(self.user_profile)
        response = self.client.post(self.url_list, data=historical_figure.data, content_type='application/json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['birth_date'], historical_figure.data['birth_date'])
        self.assertEqual(response.data['birth_historical_state'], historical_figure.data['birth_historical_state'])
        self.assertEqual(response.data['birth_present_country'], historical_figure.data['birth_present_country'])
        self.assertEqual(response.data['death_date'], historical_figure.data['death_date'])
        self.assertEqual(response.data['death_historical_state'], historical_figure.data['death_historical_state'])
        self.assertEqual(response.data['death_present_country'], historical_figure.data['death_present_country'])
        self.assertEqual(response.data['name'], historical_figure.data['name'])

    def test_get_item(self):
        self.client.force_login(self.user_profile)
        response = self.client.get(self.url_item)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(response.data['birth_date'], self.historical_figure.birth_date)
        self.assertEqual(response.data['birth_historical_state']['id'], self.historical_state.pk)
        self.assertEqual(response.data['birth_historical_state']['name'], self.historical_state.name)
        self.assertEqual(response.data['birth_present_country']['id'], self.present_country.pk)
        self.assertEqual(response.data['birth_present_country']['name'], self.present_country.name)
        self.assertEqual(response.data['death_date'], self.historical_figure.death_date)
        self.assertEqual(response.data['death_historical_state']['id'], self.historical_state.pk)
        self.assertEqual(response.data['death_historical_state']['name'], self.historical_state.name)
        self.assertEqual(response.data['death_present_country']['id'], self.present_country.pk)
        self.assertEqual(response.data['death_present_country']['name'], self.present_country.name)
        self.assertEqual(response.data['name'], self.historical_figure.name)

    def test_get_item_non_existent(self):
        self.client.force_login(self.user_profile)
        response = self.client.get(reverse('figure-item', kwargs={'pk':self.historical_figure.pk - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')

    def test_delete_item(self):
        self.client.force_login(self.user_profile)
        response = self.client.delete(self.url_item)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsNone(response.data)

    def test_delete_item_non_existent(self):
        self.client.force_login(self.user_profile)
        response = self.client.delete(reverse('figure-item', kwargs={'pk':self.historical_figure.pk - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')

    def test_put_item(self):
        updated_historical_figure = {'birth_date': '1900-12-11', 'birth_historical_state': self.historical_state.pk, 'birth_present_country': self.present_country.pk, 
                                     'death_date': '2000-10-09', 'death_historical_state': self.historical_state.pk, 'death_present_country': self.present_country.pk, 
                                     'name': 'Historical Figure Updated'}
        serializer = HistoricalFigureDeletePostUpdateSerializer(data=updated_historical_figure)
        serializer.is_valid()
        self.client.force_login(self.user_profile)
        response = self.client.put(self.url_item, serializer.data, content_type='application/json')
        self.assertEqual(response.data['name'], updated_historical_figure['name'])

    def test_put_item_non_existent(self):
        self.client.force_login(self.user_profile)
        response = self.client.put(reverse('figure-item', kwargs={'pk':self.historical_figure.pk - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')

    def test_patch_item(self):
        updated_historical_figure = {'birth_date': '1900-12-11', 'birth_historical_state': self.historical_state.pk, 'birth_present_country': self.present_country.pk, 
                                     'death_date': '2000-10-09', 'death_historical_state': self.historical_state.pk, 'death_present_country': self.present_country.pk, 
                                     'name': 'Historical Figure Updated'}
        serializer = HistoricalFigureDeletePostUpdateSerializer(data=updated_historical_figure)
        serializer.is_valid()
        self.client.force_login(self.user_profile)
        response = self.client.patch(self.url_item, serializer.data, content_type='application/json')
        self.assertEqual(response.data['name'], updated_historical_figure['name'])

    def test_patch_item_non_existent(self):
        self.client.force_login(self.user_profile)
        response = self.client.patch(reverse('figure-item', kwargs={'pk':self.historical_figure.pk - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')


class HistoricalFigureRoleViewTestClass(BaseViewTestClass):
    @classmethod
    def setUp(self):
        self.user_profile = self.data_provider.create_user()
        self.figure_role = self.data_provider.create_historical_figure_role(user_profile=self.user_profile)
        self.data_provider.create_historical_figure_role(name='Figure role 2', user_profile=self.user_profile)

        self.url_list = reverse('figure-role-list')
        self.url_item = reverse('figure-role-item', kwargs={'pk':self.figure_role.pk})

    def tearDown(self):
        HistoricalFigureRole.objects.all().delete()

    def test_get_list(self):
        self.client.force_login(self.user_profile)
        response = self.client.get(self.url_list)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotIn('next', response.data)
        self.assertNotIn('previous', response.data)
        
        figure_role_list = HistoricalFigureRole.objects.all()
        serializer = HistoricalFigureRoleSerializer(figure_role_list, many=True)
        self.assertEqual(response.data, serializer.data)

    def test_get_list_no_object(self):
        HistoricalFigureRole.objects.all().delete()
        self.client.force_login(self.user_profile)
        response = self.client.get(self.url_list)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

    def test_post_figure_role(self):
        figure_role = HistoricalFigureRoleSerializer(data={'description': 'Figure role description post', 'name': 'Figure role post'})
        figure_role.is_valid()

        self.client.force_login(self.user_profile)
        response = self.client.post(self.url_list, data=figure_role.data, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['description'], figure_role.data['description'])
        self.assertEqual(response.data['name'], figure_role.data['name'])

    def test_delete_item(self):
        self.client.force_login(self.user_profile)
        response = self.client.delete(self.url_item)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsNone(response.data)

    def test_delete_item_non_existent(self):
        self.client.force_login(self.user_profile)
        response = self.client.delete(reverse('figure-role-item', kwargs={'pk':self.figure_role.pk - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')

    def test_put_item(self):
        updated_figure_role = {'name': 'Figure role updated'}
        serializer = HistoricalFigureRoleSerializer(data=updated_figure_role)
        serializer.is_valid()

        self.client.force_login(self.user_profile)
        response = self.client.put(self.url_item, serializer.data, content_type='application/json')
        self.assertEqual(response.data['name'], updated_figure_role['name'])

    def test_put_item_non_existent(self):
        self.client.force_login(self.user_profile)
        response = self.client.put(reverse('figure-role-item', kwargs={'pk':self.figure_role.pk - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')

    def test_patch_item(self):
        updated_figure_role = {'name': 'Figure role updated'}
        serializer = HistoricalFigureRoleSerializer(data=updated_figure_role)
        serializer.is_valid()

        self.client.force_login(self.user_profile)
        response = self.client.patch(self.url_item, serializer.data, content_type='application/json')
        self.assertEqual(response.data['name'], updated_figure_role['name'])

    def test_patch_item_non_existent(self):
        self.client.force_login(self.user_profile)
        response = self.client.patch(reverse('figure-role-item', kwargs={'pk':self.figure_role.pk - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from ..models import EventCategory, HistoricalEvent, HistoricalFigure, HistoricalState, PresentCountry
from ..serializers import *

class BaseViewTestClass(TestCase):
    client = APIClient()

class EventCategoryViewTestClass(BaseViewTestClass):
    @classmethod
    def setUp(self):
        self.url = reverse('event-category-list')
        EventCategory.objects.create(name='Event category 1')
        EventCategory.objects.create(name='Event category 2')

    def test_get_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotIn('next', response.data)
        self.assertNotIn('previous', response.data)
        
        event_category_list = EventCategory.objects.all()
        serializer = EventCategoryGetAllSerializer(event_category_list, many=True)
        self.assertEqual(response.data, serializer.data)

    def test_get_list_no_object(self):
        EventCategory.objects.all().delete()
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])


class HistoricalStateViewTestClass(BaseViewTestClass):
    @classmethod
    def setUp(self):
        self.historical_state = HistoricalState.objects.create(dateFrom='1234', dateTo='1245', name='Historical State 1')
        self.present_country = PresentCountry.objects.create(code='PC', name='Present country')
        HistoricalState.objects.create(dateFrom='2345', dateTo='2356', name='Historical State 2')

        self.url_list = reverse('historical-state-list')
        self.url_item = reverse('historical-state-item', kwargs={'pk':self.historical_state.id})

    def test_get_list(self):
        response = self.client.get(self.url_list)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotIn('next', response.data)
        self.assertNotIn('previous', response.data)
        
        historical_state_list = HistoricalState.objects.all()
        serializer = HistoricalStateGetSerializer(historical_state_list, many=True)
        self.assertEqual(response.data, serializer.data)

    def test_get_list_no_object(self):
        HistoricalState.objects.all().delete()
        response = self.client.get(self.url_list)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

    def test_post_historical_state(self):
        historical_state = HistoricalStateDeletePostUpdateSerializer(data={'dateFrom': '1234', 'dateTo': '1235', 'name': 'Historical State', 
                                                                           'presentCountries': [self.present_country.id]})
        historical_state.is_valid()

        response = self.client.post(self.url_list, data=historical_state.data, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['dateFrom'], historical_state.data['dateFrom'])
        self.assertEqual(response.data['dateTo'], historical_state.data['dateTo'])
        self.assertEqual(response.data['name'], historical_state.data['name'])
        self.assertEqual(response.data['presentCountries'], historical_state.data['presentCountries'])

    def test_delete_item(self):
        response = self.client.delete(self.url_item)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertIsNone(response.data)

    def test_delete_item_non_existent(self):
        response = self.client.delete(reverse('historical-state-item', kwargs={'pk':self.historical_state.id - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')

    def test_put_item(self):
        updated_historical_state = {'dateFrom': '1234', 'dateTo': '1235', 'name': 'HistoricalState updated', 'presentCountries': [self.present_country.id]}

        serializer = HistoricalStateDeletePostUpdateSerializer(data=updated_historical_state)
        serializer.is_valid()
        response = self.client.put(self.url_item, serializer.data, content_type='application/json')
        self.assertEqual(response.data['name'], updated_historical_state['name'])

    def test_put_item_non_existent(self):
        response = self.client.put(reverse('event-item', kwargs={'pk':self.historical_state.id - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')

    def test_patch_item(self):
        updated_historical_state = {'dateFrom': '1234', 'dateTo': '1235', 'name': 'HistoricalState updated', 'presentCountries': [self.present_country.id]}
        serializer = HistoricalStateDeletePostUpdateSerializer(data=updated_historical_state)

        serializer.is_valid()
        response = self.client.patch(self.url_item, serializer.data, content_type='application/json')
        self.assertEqual(response.data['name'], updated_historical_state['name'])

    def test_patch_item_non_existent(self):
        response = self.client.patch(reverse('event-item', kwargs={'pk':self.historical_state.id - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')


class PresentCountryViewTestClass(BaseViewTestClass):
    @classmethod
    def setUp(self):
        self.url = reverse('present-country-list')
        self.present_country = PresentCountry.objects.create(code='PC1', name='Present Country 1')
        PresentCountry.objects.create(code='PC2', name='Present Country 2')

        self.historical_state = HistoricalState.objects.create(dateFrom='1234', dateTo='1245', name='Historical State 1')
        self.historical_state.presentCountries.add(self.present_country)

    def test_get_list_no_historical_state_parameter(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotIn('next', response.data)
        self.assertNotIn('previous', response.data)
        
        present_country_list = PresentCountry.objects.all()
        serializer = PresentCountryGetAllSerializer(present_country_list, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(len(response.data), 2)

    def test_get_list_with_historical_state_parameter(self):
        response = self.client.get(self.url, data={'histStateId': self.historical_state.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        linked_present_country_list = PresentCountry.objects.filter(id=self.present_country.id)
        serializer = PresentCountryGetAllSerializer(linked_present_country_list, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(len(response.data), 1)

    def test_get_list_no_object(self):
        PresentCountry.objects.all().delete()
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])


class HistoricalEventViewTestClass(BaseViewTestClass):
    @classmethod
    def setUp(self):
        self.event_category = EventCategory.objects.create(name='Event category')
        self.historical_state = HistoricalState.objects.create(dateFrom='1234', dateTo='1245', name='Historical State')
        self.present_country = PresentCountry.objects.create(code='PC', name='Present Country')
        self.historical_event = HistoricalEvent.objects.create(date='1234', description='description', eventCategoryId=self.event_category, 
                                                               historicalStateId=self.historical_state, latitude=12.345678, longitude=23.456789, name='Historical event', 
                                                               presentCountryId=self.present_country, time='12:34')
        HistoricalEvent.objects.create(date='2345', description='some more description', eventCategoryId=self.event_category, historicalStateId=self.historical_state, 
                                       latitude=12.345678, longitude=23.456789, name='Historical event with no time', presentCountryId=self.present_country)
        
        self.url_list = reverse('event-list')
        self.url_item = reverse('event-item', kwargs={'pk':self.historical_event.id})
        
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
        historical_event = HistoricalEventDeletePostUpdateSerializer(data= {'date': '1234-01-02', 'description': 'post description', 'eventCategoryId': self.event_category.id, 
                                                                            'historicalStateId': self.historical_state.id, 'latitude': 12.34, 'longitude': 23.45, 
                                                                            'name': 'Historical event with coordinates', 'presentCountryId': self.present_country.id})
        historical_event.is_valid()
        response = self.client.post(self.url_list, data=historical_event.data, content_type='application/json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['approximateRealLocation'], True)
        self.assertEqual(response.data['date'], historical_event.data['date'])
        self.assertEqual(response.data['description'], historical_event.data['description'])
        self.assertEqual(response.data['eventCategoryId'], historical_event.data['eventCategoryId'])
        self.assertEqual(response.data['historicalStateId'], historical_event.data['historicalStateId'])
        self.assertEqual(response.data['latitude'], historical_event.data['latitude'])
        self.assertEqual(response.data['longitude'], historical_event.data['longitude'])
        self.assertEqual(response.data['name'], historical_event.data['name'])
        self.assertEqual(response.data['presentCountryId'], historical_event.data['presentCountryId'])

    def test_post_event_no_coordinates(self):
        historical_event = HistoricalEventDeletePostUpdateSerializer(data= {'date': '1234-01-02', 'description': 'post description', 'eventCategoryId': self.event_category.id, 
                                                                            'historicalStateId': self.historical_state.id, 'name': 'Historical event without coordinates', 
                                                                            'presentCountryId': self.present_country.id})
        historical_event.is_valid()
        response = self.client.post(self.url_list, data=historical_event.data, content_type='application/json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['approximateRealLocation'], False)
        self.assertEqual(response.data['date'], historical_event.data['date'])
        self.assertEqual(response.data['description'], historical_event.data['description'])
        self.assertEqual(response.data['eventCategoryId'], historical_event.data['eventCategoryId'])
        self.assertEqual(response.data['historicalStateId'], historical_event.data['historicalStateId'])
        self.assertEqual(response.data['latitude'], historical_event.data['latitude'])
        self.assertEqual(response.data['longitude'], historical_event.data['longitude'])
        self.assertEqual(response.data['name'], historical_event.data['name'])
        self.assertEqual(response.data['presentCountryId'], historical_event.data['presentCountryId'])

    def test_get_item(self):
        response = self.client.get(self.url_item)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(response.data['approximateRealLocation'], False)
        self.assertEqual(response.data['date'], self.historical_event.date)
        self.assertEqual(response.data['description'], self.historical_event.description)
        self.assertEqual(response.data['eventCategory']['id'], self.event_category.id)
        self.assertEqual(response.data['eventCategory']['name'], self.event_category.name)
        self.assertEqual(response.data['historicalState']['id'], self.historical_state.id)
        self.assertEqual(response.data['historicalState']['name'], self.historical_state.name)
        self.assertEqual(response.data['latitude'], str(self.historical_event.latitude))
        self.assertEqual(response.data['longitude'], str(self.historical_event.longitude))
        self.assertEqual(response.data['name'], self.historical_event.name)
        self.assertEqual(response.data['presentCountry']['id'], self.present_country.id)
        self.assertEqual(response.data['presentCountry']['name'], self.present_country.name)

    def test_get_item_non_existent(self):
        response = self.client.get(reverse('event-item', kwargs={'pk':self.historical_event.id - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')

    def test_delete_item(self):
        response = self.client.delete(self.url_item)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertIsNone(response.data)

    def test_delete_item_non_existent(self):
        response = self.client.delete(reverse('event-item', kwargs={'pk':self.historical_event.id - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')

    def test_put_item(self):
        updated_historical_event = {'date': '1234-01-02', 'description': 'post description', 'eventCategoryId': self.event_category.id, 'latitude': 12.34, 'longitude': 23.45, 
                                    'historicalStateId': self.historical_state.id, 'name': 'Historical event updated name', 'presentCountryId': self.present_country.id, 
                                    'time':'12:34'}
        serializer = HistoricalEventDeletePostUpdateSerializer(data=updated_historical_event)
        serializer.is_valid()
        response = self.client.put(self.url_item, serializer.data, content_type='application/json')
        self.assertEqual(response.data['name'], updated_historical_event['name'])

    def test_put_item_non_existent(self):
        response = self.client.put(reverse('event-item', kwargs={'pk':self.historical_event.id - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')

    def test_patch_item(self):
        updated_historical_event = {'date': '1234-01-02', 'description': 'post description', 'eventCategoryId': self.event_category.id, 'latitude': 12.34, 'longitude': 23.45, 
                                    'historicalStateId': self.historical_state.id, 'name': 'Historical event updated name', 'presentCountryId': self.present_country.id, 
                                    'time':'12:34'}
        serializer = HistoricalEventDeletePostUpdateSerializer(data=updated_historical_event)
        serializer.is_valid()
        response = self.client.patch(self.url_item, serializer.data, content_type='application/json')
        self.assertEqual(response.data['name'], updated_historical_event['name'])

    def test_patch_item_non_existent(self):
        response = self.client.patch(reverse('event-item', kwargs={'pk':self.historical_event.id - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')


class HistoricalFigureViewTestClass(BaseViewTestClass):
    @classmethod
    def setUp(self):
        self.historical_state = HistoricalState.objects.create(dateFrom='1234', dateTo='1245', name='Historical State')
        self.present_country = PresentCountry.objects.create(code='PC', name='Present Country')
        self.historical_figure = HistoricalFigure.objects.create(birthDate='1234', birthHistoricalStateId=self.historical_state, birthPresentCountryId=self.present_country, 
                                                                 deathDate='1345-01-02', deathHistoricalStateId=self.historical_state, deathPresentCountryId=self.present_country, 
                                                                 name='Historical Figure')
        HistoricalFigure.objects.create(birthDate='1234', birthHistoricalStateId=self.historical_state, birthPresentCountryId=self.present_country, name='Alive Historical Figure')
        
        self.url_list = reverse('figure-list')
        self.url_item = reverse('figure-item', kwargs={'pk':self.historical_figure.id})
        
    def test_get_list(self):
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
        response = self.client.get(self.url_list)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'], [])

    def test_post_figure(self):
        historical_figure = HistoricalFigureDeletePostUpdateSerializer(data= {'birthDate': '1900-12-11', 'birthHistoricalStateId': self.historical_state.id, 
                                                                             'birthPresentCountryId': self.present_country.id, 'deathDate': '2000-10-09', 
                                                                             'deathHistoricalStateId': self.historical_state.id, 'deathPresentCountryId': self.present_country.id, 
                                                                             'name': 'Historical Figure Post'})
        historical_figure.is_valid()
        response = self.client.post(self.url_list, data=historical_figure.data, content_type='application/json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['birthDate'], historical_figure.data['birthDate'])
        self.assertEqual(response.data['birthHistoricalStateId'], historical_figure.data['birthHistoricalStateId'])
        self.assertEqual(response.data['birthPresentCountryId'], historical_figure.data['birthPresentCountryId'])
        self.assertEqual(response.data['deathDate'], historical_figure.data['deathDate'])
        self.assertEqual(response.data['deathHistoricalStateId'], historical_figure.data['deathHistoricalStateId'])
        self.assertEqual(response.data['deathPresentCountryId'], historical_figure.data['deathPresentCountryId'])
        self.assertEqual(response.data['name'], historical_figure.data['name'])

    def test_get_item(self):
        response = self.client.get(self.url_item)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(response.data['birthDate'], self.historical_figure.birthDate)
        self.assertEqual(response.data['birthHistoricalState']['id'], self.historical_state.id)
        self.assertEqual(response.data['birthHistoricalState']['name'], self.historical_state.name)
        self.assertEqual(response.data['birthPresentCountry']['id'], self.present_country.id)
        self.assertEqual(response.data['birthPresentCountry']['name'], self.present_country.name)
        self.assertEqual(response.data['deathDate'], self.historical_figure.deathDate)
        self.assertEqual(response.data['deathHistoricalState']['id'], self.historical_state.id)
        self.assertEqual(response.data['deathHistoricalState']['name'], self.historical_state.name)
        self.assertEqual(response.data['deathPresentCountry']['id'], self.present_country.id)
        self.assertEqual(response.data['deathPresentCountry']['name'], self.present_country.name)
        self.assertEqual(response.data['name'], self.historical_figure.name)

    def test_get_item_non_existent(self):
        response = self.client.get(reverse('figure-item', kwargs={'pk':self.historical_figure.id - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')

    def test_delete_item(self):
        response = self.client.delete(self.url_item)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertIsNone(response.data)

    def test_delete_item_non_existent(self):
        response = self.client.delete(reverse('figure-item', kwargs={'pk':self.historical_figure.id - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')

    def test_put_item(self):
        updated_historical_figure = {'birthDate': '1900-12-11', 'birthHistoricalStateId': self.historical_state.id, 'birthPresentCountryId': self.present_country.id, 
                                     'deathDate': '2000-10-09', 'deathHistoricalStateId': self.historical_state.id, 'deathPresentCountryId': self.present_country.id, 
                                     'name': 'Historical Figure Updated'}
        serializer = HistoricalFigureDeletePostUpdateSerializer(data=updated_historical_figure)
        serializer.is_valid()
        response = self.client.put(self.url_item, serializer.data, content_type='application/json')
        self.assertEqual(response.data['name'], updated_historical_figure['name'])

    def test_put_item_non_existent(self):
        response = self.client.put(reverse('figure-item', kwargs={'pk':self.historical_figure.id - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')

    def test_patch_item(self):
        updated_historical_figure = {'birthDate': '1900-12-11', 'birthHistoricalStateId': self.historical_state.id, 'birthPresentCountryId': self.present_country.id, 
                                     'deathDate': '2000-10-09', 'deathHistoricalStateId': self.historical_state.id, 'deathPresentCountryId': self.present_country.id, 
                                     'name': 'Historical Figure Updated'}
        serializer = HistoricalFigureDeletePostUpdateSerializer(data=updated_historical_figure)
        serializer.is_valid()
        response = self.client.patch(self.url_item, serializer.data, content_type='application/json')
        self.assertEqual(response.data['name'], updated_historical_figure['name'])

    def test_patch_item_non_existent(self):
        response = self.client.patch(reverse('figure-item', kwargs={'pk':self.historical_figure.id - 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'].code, 'not_found')
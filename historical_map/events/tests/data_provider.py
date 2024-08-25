from django.contrib.auth.models import User

from events.models import EventCategory, HistoricalEvent, HistoricalFigure, HistoricalFigureRole, HistoricalState, PresentCountry

class DataProvider:
    def create_event_category(self, user_profile: User, name: str = 'Event category') -> EventCategory:
        return EventCategory.objects.create(createdBy=user_profile, name=name, updatedBy=user_profile)
    
    def create_historical_event(self, event_category: EventCategory, historical_state: HistoricalState, present_country: PresentCountry, 
                                user_profile: User, name: str = 'Historical event') -> HistoricalEvent:
        return HistoricalEvent.objects.create(createdBy=user_profile, date='1234', description='Historical event description', eventCategoryId=event_category, 
                                              historicalStateId=historical_state, latitude=123.45, longitude=-12.34, name=name, presentCountryId=present_country, 
                                              time='12:34', updatedBy=user_profile)

    def create_historical_figure(self, birth_historical_state: HistoricalState, birth_present_country: PresentCountry, death_historical_state: HistoricalState, 
                                 death_present_country: PresentCountry, user_profile: User, deathDate: str = '1345-06-07') -> HistoricalFigure:
        return HistoricalFigure.objects.create(birthDate='1234-05-06', birthHistoricalStateId=birth_historical_state, birthPresentCountryId=birth_present_country, 
                                               createdBy=user_profile, deathDate=deathDate, deathHistoricalStateId=death_historical_state, 
                                               deathPresentCountryId=death_present_country, name='Historical figure', updatedBy=user_profile)
    
    def create_historical_figure_role(self, user_profile: User, name: str = 'Figure role') -> HistoricalFigureRole:
        return HistoricalFigureRole.objects.create(createdBy=user_profile, name=name, updatedBy=user_profile)
    
    def create_historical_state(self, name: str, user_profile: User, dateTo: str = None) -> HistoricalState:
        return HistoricalState.objects.create(createdBy=user_profile, dateFrom='1234-05-06', dateTo=dateTo, name=name, updatedBy=user_profile)
    
    def create_present_country(self, code: str, name: str, user_profile: User) -> PresentCountry:
        return PresentCountry.objects.create(createdBy=user_profile, code=code, name=name, updatedBy=user_profile)
    
    def create_user(self) -> User:
        return User.objects.create(username='test_user', password='test_password')
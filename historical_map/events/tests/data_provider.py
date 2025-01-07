from django.contrib.auth.models import User

from events.models import EventCategory, HistoricalEvent, HistoricalFigure, HistoricalFigureRole, HistoricalState, HistoricalStatePresentCountryPeriod, PresentCountry

class DataProvider:
    def create_event_category(self, user_profile: User, name: str = 'Event category') -> EventCategory:
        return EventCategory.objects.create(created_by=user_profile, name=name, updated_by=user_profile)
    
    def create_historical_event(self, event_category: EventCategory, historical_state: HistoricalState, present_country: PresentCountry, 
                                user_profile: User, name: str = 'Historical event') -> HistoricalEvent:
        return HistoricalEvent.objects.create(created_by=user_profile, date='1234', description='Historical event description', event_category=event_category, 
                                              historical_state=historical_state, latitude=123.45, longitude=-12.34, name=name, present_country=present_country, 
                                              time='12:34', updated_by=user_profile)

    def create_historical_figure(self, birth_historical_state: HistoricalState, birth_present_country: PresentCountry, death_historical_state: HistoricalState, 
                                 death_present_country: PresentCountry, user_profile: User, death_date: str = '1345-06-07') -> HistoricalFigure:
        return HistoricalFigure.objects.create(birth_date='1234-05-06', birth_historical_state=birth_historical_state, birth_present_country=birth_present_country, 
                                               created_by=user_profile, death_date=death_date, death_historical_state=death_historical_state, 
                                               death_present_country=death_present_country, name='Historical figure', updated_by=user_profile)
    
    def create_historical_figure_role(self, user_profile: User, name: str = 'Figure role') -> HistoricalFigureRole:
        return HistoricalFigureRole.objects.create(created_by=user_profile, name=name, updated_by=user_profile)
    
    def create_historical_state(self, name: str, user_profile: User, end_date: str = None) -> HistoricalState:
        return HistoricalState.objects.create(created_by=user_profile, end_date=end_date, name=name, start_date='1234-05-06', updated_by=user_profile)
    
    def create_historical_state_present_country_period(self, historical_state: HistoricalState, present_country: PresentCountry, user_profile: User, 
                                                       end_date: str='2345-06-07', start_date: str='1234-05-06') -> HistoricalStatePresentCountryPeriod:
        return HistoricalStatePresentCountryPeriod.objects.create(created_by=user_profile, end_date=end_date, historical_state=historical_state, 
                                                                  present_country=present_country, start_date=start_date, updated_by=user_profile)
    
    def create_present_country(self, code: str, name: str, user_profile: User) -> PresentCountry:
        return PresentCountry.objects.create(created_by=user_profile, code=code, name=name, updated_by=user_profile)
    
    def create_user(self) -> User:
        return User.objects.create(username='test_user', password='test_password')
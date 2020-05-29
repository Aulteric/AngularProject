import { createAction, props } from '@ngrx/store';
import { IPerson } from 'src/app/interfaces/people';

export const loadPeople = createAction(
    '[People List Component] Load People',
);

export const loadPeopleSuccess = createAction(
    '[People List Component] Load People Success',
    props<{people: IPerson[]}>()
);

export const loadPeopleFailure = createAction(
    '[People List Component] Load People Failure',
    props<{error: any}>()
);

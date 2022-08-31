import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import store from '../../RTK/store';

import type { RootState, AppDispatch } from '../../RTK/store';

export const useAppDispatch = (): typeof store.dispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

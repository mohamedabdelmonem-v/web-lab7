import { useReducer, useEffect } from 'react';
const initialState = { data: null, loading: true, error: null };

function fetchReducer(state, action) {
  switch (action.type) {
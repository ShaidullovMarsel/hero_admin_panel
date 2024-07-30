import {heroesFetching, heroesFetched, heroesFetchingError} from '../components/heroesList/heroesSlice'

export const fetchFilters = (request) => (dispatch) => {
    request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
}

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const activeFilterChanged = (filter) => {
    return {
        type: 'ACTIVE_FILTER_CHANGED',
        payload: filter
    }
}

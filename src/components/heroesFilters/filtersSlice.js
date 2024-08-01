import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';


const filtersAdapter = createEntityAdapter();

const initialState= filtersAdapter.getInitialState({
    activeFilter: 'all'
})

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/filters");
    }
)

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.fulfilled, (state, action) => {
                filtersAdapter.setAll(state, action.payload);
            })
            .addDefaultCase(()=> {});
    }
});

const {actions, reducer} = filtersSlice;

export default reducer;

export const {selectAll} = filtersAdapter.getSelectors(state => state.filters);

export const {
    filtersFetched,
    activeFilterChanged
} = actions;
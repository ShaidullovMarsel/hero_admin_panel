import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import classNames from 'classnames'
import {store} from '../../store'


import {activeFilterChanged, fetchFilters, selectAll} from "./filtersSlice";

const HeroesFilters = () => {
    const {activeFilter} = useSelector(state => state.filters)
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters());
                    // eslint-disable-next-line
// eslint-disable-next-line
    }, []);

    const renderFilters = (arr) => {
        
        return arr.map(({name, label, className}) => {

            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            });
            
            return <button 
                        key={name} 
                        id={name} 
                        className={btnClass}
                        onClick={() => dispatch(activeFilterChanged(name))}
                        >{label}
                    </button>
        })
    }

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;
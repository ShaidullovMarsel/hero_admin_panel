import {useHttp} from '../../hooks/http.hook';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { heroesCreated } from '../heroesList/heroesSlice';
import { nanoid } from '@reduxjs/toolkit'
import { selectAll } from '../heroesFilters/filtersSlice';

import store from '../../store';


const HeroesAddForm = () => {
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();
    const {request} = useHttp();

    const [heroName, setHeroName] = useState('');
    const [heroDescr, setHeroDescr] = useState('');
    const [heroElement, setHeroElement] = useState('');

    const onSubmitHandler = (e) => {
        e.preventDefault()
        const newHero = {
            id: nanoid(),
            name: heroName,
            description: heroDescr,
            element: heroElement
        }

        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
            .then(dispatch(heroesCreated(newHero)))
    }

    const renderFilters = (filters) => {
        if (filters && filters.length > 0) {
            return filters.map(({name, label}) => {
                // eslint-disable-next-line
                if (name === 'all') return;

                return <option key={name} value={name}>{label}</option>
        })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                    />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={heroDescr}
                    onChange={(e) => setHeroDescr(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}>
                    <option >Я владею элементом...</option>
                    {renderFilters(filters)}
                </select>
            </div>

            <button onClick={onSubmitHandler} type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;
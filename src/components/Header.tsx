import { useEffect, useMemo, useState } from 'react'
import{ NavLink, useLocation } from 'react-router-dom'
import { useAppStore } from '../stores/useAppStore'

export default function Header() {
    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })
    const { pathname } = useLocation()
    const isHome = useMemo(() => pathname === '/', [pathname])

    const fetchCategories = useAppStore((state) => state.fetchCategories)
    const categories = useAppStore((state) => state.categories)
    const searchRecipes = useAppStore((state) => state.searchRecipes)
    const showNotificatin = useAppStore((state) => state.showNotification)

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Validamos
        if(Object.values(searchFilters).includes('')) {
            showNotificatin({text: 'Todos los campos son obligatorios', error: true})
            return
        }
        // Consultar recetas
        searchRecipes(searchFilters)
    }

  return (
    <header className={isHome ? 'bg-[url(/bg.jpg)] bg-center bg-cover' : 'bg-slate-800'}>
        <div className="mx-auto container px-5 py-5">
            <div className="flex justify-between items-center">
                <div>
                    <img 
                        src="/logo.svg" 
                        alt="Logotipo" 
                        className="w-32"
                    />
                </div>

                <nav className='flex gap-4'>
                    <NavLink to="/" className={({isActive}) => /* NavLink nos permite tener un prop para saber cuando esta activa */
                        isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                    }>Inicio</NavLink>
                    <NavLink to="/favoritos" className={({isActive}) => 
                        isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                    }>Favoritos</NavLink>
                    <NavLink to="/generate" className={({isActive}) => 
                        isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                    }>Generar con AI</NavLink>
                </nav>
            </div>

            {isHome && (
                <form 
                    className='md:w-1/2 2xl:1/3 bg-orange-400 my-10 p-10 rounded-lg shadow space-y-6'
                    onSubmit={handleSubmit}
                >
                    <div className='space-y-4'>
                        <label 
                            htmlFor="ingredient"
                            className='block text-white uppercase font-extrabold text-lg'
                        >Nombre o Ingredientes</label>
                        <input 
                            id='ingredient'
                            type="text"
                            name='ingredient'
                            className='p-3 w-full rounded-lg focus:outline-none bg-white'
                            placeholder='Nombre o Ingrediente. EJ. Vodka, Tequila, Café'
                            onChange={handleChange}
                            value={searchFilters.ingredient}
                        />
                    </div>
                    <div className='space-y-4'>
                        <label 
                            htmlFor="category"
                            className='block text-white uppercase font-extrabold text-lg'
                        >Categoria</label>
                        <select 
                            id='category'
                            name='category'
                            className='p-3 w-full rounded-lg focus:outline-none bg-white'
                            onChange={handleChange}
                            value={searchFilters.category}
                        >
                            <option value="">-- Seleccion --</option>
                            {categories.drinks.map(category => (
                                <option 
                                    key={category.strCategory} 
                                    value={category.strCategory}
                                >{category.strCategory}</option>
                            ))}
                        </select>
                        <input type="submit" 
                            value={'Buscar Recetas'}
                            className='cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase'
                        />
                    </div>
                </form>
            )}
        </div>
    </header>
  )
}

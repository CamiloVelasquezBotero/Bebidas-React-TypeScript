import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layouts/Layout'
// Utilizando (lazy) cargara este componente unicamente cuando el usuario ingrese a esta pagina
const FavoritesPage = lazy(() => import('./views/FavoritesPage'))
const IndexPage = lazy(() => import('./views/IndexPage'))

export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}> {/* Sera el diseño principal para las paginas hijas */}
                <Route path='/' element={<Suspense fallback='Cargando...'><IndexPage /></Suspense>} index /> {/* el prop (index) indica que sera la pagina principal */}
                <Route path='/favoritos' 
                  element={
                    <Suspense fallback='Cargando...'>
                      <FavoritesPage />
                    </Suspense>
                  } 
                />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

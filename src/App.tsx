import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

import './scss/app.scss'
import FullSushi from './pages/FullSushi'
import Layout from './layouts/Layout'

const Cart = React.lazy(() => import('./pages/Cart'))

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route path='' element={<Home />} />
				<Route path='sushi/:id' element={<FullSushi />} />
				<Route path='*' element={<NotFound />} />
				<Route path='cart' element={
					<React.Suspense fallback={<div>Loading...</div>}>
						<Cart />
					</React.Suspense>
				} />
			</Route>
		</Routes>
	)
}

export default App

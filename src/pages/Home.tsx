import React from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setFilters } from '../redux/slices/filterSlice'
import { fetchSushi } from '../redux/slices/sushiSlice'
import { RootState, useAppDispatch } from '../redux/store'
import qs from 'qs'

import {
	SushiBlock,
	SushiBlockSkeleton,
	Pagination,
	Categories,
	Sort,
	listSort,
	listTypeSort,
} from '../components'

interface ISushiBlock {
	id: string
	title: string
	size: number[]
	imageUrl: string
	price: number
}

const Home = () => {
	const [allPages, setAllPages] = React.useState([])
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const isSearch = React.useRef(false)
	const isMounted = React.useRef(false)

	const { categoryId, sort, typeSort, nameCategory, searchInput, selectedPage } = useSelector(
		(state: RootState) => state.filterSlice,
	)
	const { items, status } = useSelector((state: RootState) => state.sushiSlice)

	React.useEffect(() => {
		axios.get(`https://65807ad76ae0629a3f554ec4.mockapi.io/items`).then((arr) => {
			setAllPages(arr.data)
		})
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))

			const sort = listSort.find((obj) => obj.sort === params.sortProperty)
			const typeSort = listTypeSort.find((obj) => obj.sort === params.typeSortProperty)

			dispatch(
				setFilters({
					...params,
					sort,
					typeSort,
				}),
			)
		}

		isSearch.current = false
	}, [])

	const getSushi = async () => {
		const categoryParam: string = `${
			categoryId > 0 && !searchInput ? `category=${categoryId}` : ''
		}`
		const sortParam: string = `&sortBy=${sort.sort}`
		const orderParam: string = `&order=${typeSort.sort}`
		const inputParam: string = `${searchInput && `&search=${searchInput}`}`

		dispatch(
			fetchSushi({
				categoryParam,
				sortParam,
				orderParam,
				inputParam,
				selectedPage: String(selectedPage),
			}),
		)

		window.scrollTo(0, 0)
	}

	React.useEffect(() => {
		if (!isSearch.current) {
			getSushi()
		}
		isSearch.current = false
	}, [categoryId, sort.sort, typeSort.sort, searchInput, selectedPage])

	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sort,
				typeSortProperty: typeSort.sort,
				categoryId,
				selectedPage,
				nameCategory,
			})

			navigate(`?${queryString}`)
		}
		isMounted.current = true
	}, [categoryId, sort.sort, typeSort.sort, selectedPage, nameCategory])

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories />
				<Sort value={sort} />
			</div>
			<h2 className='content__title'>{nameCategory}</h2>
			{status === 'error' ? (
				<div className='content__err'>
					<h2>Произошла ошибка 😓</h2>
					<p>К сожалению, не удалось получить данные. Попробуйте повторить попытку позже.</p>
				</div>
			) : (
				<div className='content__items'>
					{status == 'loading'
						? [...new Array(6)].map((_, index) => <SushiBlockSkeleton key={index} />)
						: items.map((item: ISushiBlock) => <SushiBlock key={item.id} {...item} />)}
				</div>
			)}

			{status == 'success' && <Pagination allPages={allPages} />}
		</div>
	)
}

export default Home

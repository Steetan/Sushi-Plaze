import React from 'react'
import { useSelector } from 'react-redux'
import { addItem, plusItem, typeCartItem } from '../../redux/slices/cartSlice'
import { Link } from 'react-router-dom'
import { RootState, useAppDispatch } from '../../redux/store'

interface ISushiBlock {
	id: string
	title: string
	size: number[]
	imageUrl: string
	price: number
}

export const SushiBlock: React.FC<ISushiBlock> = ({ id, title, size, imageUrl, price }) => {
	const [activeIndex, setActiveIndex] = React.useState(0)
	const cartItem = useSelector((state: RootState) =>
		state.cartSlice.cartItems.find((obj: ISushiBlock) => obj.id === id),
	)
	const dispatch = useAppDispatch()

	const countItem = cartItem ? cartItem.count : 0

	const onClickAdd = () => {
		const item = {
			id,
			title,
			price,
			imageUrl,
		} as typeCartItem
		dispatch(addItem(item))
		dispatch(plusItem(item.id))
	}

	return (
		<div className='sushi-block'>
			<Link to={`sushi/${id}`} title='посмотреть подробную информацию'>
				<img className='sushi-block__image' src={imageUrl} alt='Sushi' />
			</Link>
			<h4 className='sushi-block__title'>{title}</h4>
			<div className='sushi-block__selector'>
				<ul>
					{size.map((item: number, index: number) => (
						<li
							onClick={() => setActiveIndex(index)}
							className={activeIndex === index ? 'active' : ''}
							key={index}
						>
							x{item}
						</li>
					))}
				</ul>
			</div>
			<div className='sushi-block__bottom'>
				<div className='sushi-block__price'>от {price} ₽</div>
				<button onClick={() => onClickAdd()} className='button button--outline button--add'>
					<span>Добавить</span>
					{countItem !== 0 && <i>{countItem}</i>}
				</button>
			</div>
		</div>
	)
}
import React from "react"
import axios from "axios";
import { useParams } from "react-router-dom";

interface ISushi {
  imageUrl: string
  title: string
}

const FullSushi: React.FC = () => {
  const {id} = useParams()
  const [dataSushi, setDataSushi] = React.useState<ISushi>({imageUrl: "", title: ""})

  React.useEffect(() => {
    const fetchSushi = async () => {
      try {
        const {data} = await axios.get(`https://65807ad76ae0629a3f554ec4.mockapi.io/items/${id}`)
        setDataSushi(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchSushi()
  }, [])

  return (
    <div className="container container--fullSushi">
      <img className='sushi-block__image' src={dataSushi.imageUrl} alt='Sushi' />
      <h2>{dataSushi.title}</h2>
    </div>
  )
}

export default FullSushi;

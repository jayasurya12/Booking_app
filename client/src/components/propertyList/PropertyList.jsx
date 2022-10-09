import useFetch from '../../hooks/useFetch';
import './propertyList.css';

const PropertyList = () => {
    const {data,error,loading} = useFetch("/hotel/countByType");
    const images=[
        "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGhvdGVsfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
        "https://pix10.agoda.net/hotelImages/103/1030438/1030438_15081214210034117680.png?ca=5&ce=1&s=1024x768",
        "https://digital.ihg.com/is/image/ihg/intercontinental-phu-quoc-5630347934-2x1",
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmlsbGFzfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
        "https://afar.brightspotcdn.com/dims4/default/e946355/2147483647/strip/true/crop/1000x500+0+56/resize/1440x720!/quality/90/?url=https%3A%2F%2Fafar-media-production-web.s3.amazonaws.com%2Fbrightspot%2Fde%2F34%2F38cf4bffe67272d766ca356811b8%2Foriginal-airbnb-cr-20thunder-20bird-20production.png"
    ]   

  return (
    <div className="pList">
        {
            loading ? "Loading plz wait "
            :<>
                {
                    data && images.map((img,index)=>(
                        <div className="pListItem" key={index}>
                            <img src={img} alt="" className="pListImg" />
                            <div className="pListTitles">
                                <h1>{data[index]?.type}</h1>
                                <h2>{data[index]?.count} {data[index]?.type}</h2>
                            </div>
                        </div>
                    ))
                }
            </>
        }
    </div>
  )
}

export default PropertyList
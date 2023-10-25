import { useSelector } from "react-redux";
import { getAllAds } from '../../../redux/adsRedux';
import { Row } from "react-bootstrap";
import CardAds from "../../features/CardAds";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAds } from "../../../redux/adsRedux";


const AdsAll = () => {
  const dispatch = useDispatch();
  const ads = useSelector(getAllAds);
  console.log(ads);


  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

 
	return (
    <Row className="justify-content-between">
        {ads && ads.map((ad) => (
        <CardAds key={ad._id} {...ad} />
      ))} 
    </Row>  
	);
};

export default AdsAll;
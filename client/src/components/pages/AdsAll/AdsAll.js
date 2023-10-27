import { useSelector } from "react-redux";
import { getAllAds } from "../../../redux/adsRedux";
import { Row } from "react-bootstrap";
import CardAds from '../../features/CardAds';

const AdsAll = () => {
  const ads = useSelector(getAllAds);
  console.log(ads);

	return (
    <Row className="justify-content-between">
   {ads ? (
        ads.map((ad) => (
          <CardAds key={ad._id} {...ad} />
        ))
      ) : (
        <p>Loading...</p>
      )} 
  </Row> 
	);
};

export default AdsAll;
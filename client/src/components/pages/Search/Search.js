/* eslint-disable no-unused-expressions */
import { useEffect, useState } from 'react';
import { Row } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAds, fetchAds } from '../../../redux/adsRedux';
import CardAds from '../../features/CardAds';

const Search = () => {
  const { searchPhrase } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const ads = useSelector(getAllAds);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ads.length === 0) {
      dispatch(fetchAds())
        .then(() => setLoading(false))
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [dispatch, ads]);

  useEffect(() => {
    const filteredAds = ads.filter((ad) =>
      ad.title.toLowerCase().includes(searchPhrase.toLowerCase())
    );
    setData(filteredAds);
  }, [ads, searchPhrase]);

  return (
    <div>
      {loading}
      {!loading && (
        <div>
          <h2>Your found ads</h2>
          <Row className="justify-content-between">
            {data.map(ad => <CardAds key={ad._id} {...ad} />)} 
          </Row>
        </div>
      )}
    </div>
  );
};

export default Search;
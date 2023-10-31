import AdsAll from "../AdsAll/AdsAll";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_URL } from "../../../config";
import { updateAds } from "../../../redux/adsRedux";

const Home = () => {
  const [pending, setPending] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleUpdate = () => {
      setPending(true);
      fetch(`${API_URL}/api/ads`)
        .then((res) => {
          if (res.status === 200) {
            return res.json().then((ads) => {
              dispatch(updateAds(ads));
              setPending(false);
            });
          }
        });
    };
    handleUpdate();
  }, [dispatch]);

  return (
    <div>
      <h1>All ads:</h1>
      <AdsAll />
    </div>
  )
}

export default Home;
import AdsAll from "../AdsAll/AdsAll";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../../config";
import { getAllUsers } from "../../../redux/userRedux";
import { updateAds } from "../../../redux/adsRedux";

const Home = () => {
  const [pending, setPending] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(getAllUsers);

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
  
    if (user) {
      fetch(`${API_URL}/auth/user/${user.login}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json().then((data) => {
            dispatch(updateAds(data._id));
          });
        }
      });
    }
  }, [dispatch, user]);
  return (
      <div>
          <h1>All ads:</h1>
          <AdsAll />
        </div>
  )  
}

export default Home;
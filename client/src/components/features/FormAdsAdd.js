import { useDispatch } from "react-redux";

import { updateAds } from '../../redux/adsRedux';
import { useNavigate } from "react-router-dom";
import FormAds from "./FormAds";

const FormAdsAdd = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleAdd = ad => {
    navigate("/");
    dispatch(updateAds(ad));
  }; 

  return (
    <div>
      <FormAds user={user}  actionText="Add new ad" action={handleAdd}/>
    </div>
    
  );
};

export default FormAdsAdd;
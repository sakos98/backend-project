import { Navigate, useNavigate } from 'react-router-dom';
import styles from '../features/CardAds.module.scss'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editAd, getAdById } from '../../redux/adsRedux';
import FormEdit from './FormEdit';

const FormAdsEdit = () => {

  const { id } = useParams();
  const adsData = useSelector(state => getAdById(state, id));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = ad => {
    navigate("/");
    dispatch(editAd({ ...ad, id }));
  };

  if (!adsData) return <Navigate to='/' />;
  return (
    <div className={styles.editAds}>
      <FormEdit
      actionText='EditAds'
      action={handleEdit}
      title={adsData.title}
      describe={adsData.describe}
      datePublish={adsData.datePublish}
      photo={adsData.photo}
      price={adsData.price}
      location={adsData.location}
      infoOfSeller={adsData.infoOfSeller}
      />
    </div>
  )
}

export default FormAdsEdit;
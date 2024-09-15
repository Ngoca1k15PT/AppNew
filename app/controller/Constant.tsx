import {Dimensions} from 'react-native';

const Constant = {
  screen: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  fonts: {
    SVNSofia: 'SVN-Sofia',
    MidAutumn: 'Mid-Autumn',
    AlmonteRegular: 'Almonte-Regular',
    VNBrenza: 'VN-Brenza',
    VNSeventiesRegular: 'VN-Seventies-Regular',
    Designer: 'Designer',
    Milker: 'Milker',
    SuperDream: 'Super-Dream',
    VNVan: 'VN-Van',
  },
  images: {
    logo: require('../assets/images/logo.jpg'),
    icon: {},
  },
  duration: {
    LAYOUT_ANIM_DURATION: 250,
    CHILD_ANIM_DURATION: 200,
    MODAL_ANIM_DURATION: 250,
  },
};

export default Constant;

import { environment } from '../../environments/environment.development';

let url = environment.APIURL;

export const Months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

export const createAccount = url + '/createAccount';
export const verifyOtpAndRegister = url + '/verifyOtpAndRegister';
export const login = url + '/login';
export const getProfiles = url + '/getProfiles';
export const updateProfile = url + '/updateProfile';
export const getProfile = url + '/getProfile';
export const getCountries = url + '/getCountries';
export const getStates = url + '/getStates';
export const getCities = url + '/getCities';
export const getZipCodes = url + '/getZipCodes';
export const getTrainings = url + '/getTrainings';
export const trainingContactUs = url + '/trainingContactUs';
export const ContactUs = url + '/ContactUs';
export const postEvents = url + '/postEvents';
export const getEvents = url + '/getEvents';
export const getTools = url + '/getTools'
export const markInterest = url + '/markInterest';
export const addRecentTool = url + '/addRecentTool';
export const getRecentTools = url + '/getRecentTools';
export const postJob = url + '/postJob';
export const getJobs = url + '/getJobs';
export const deleteJob = url + '/deleteJob';
export const getJobStats = url + '/getJobStats';
export const applyJob = url + '/applyJob';
export const postItem = url + '/postItem';
export const updateProduct = url + '/updateProduct';
export const getProducts = url + '/getProducts';
export const addToCart = url + '/addToCart';
export const getCartItems = url + '/getCartItems';
export const updateCartQuantity = url + '/updateCartQuantity';
export const deleteCartItem = url +  '/deleteCartItem';
export const checkout = url + '/checkout';
export const deleteAllCartItem = url + '/deleteAllCartItem';
export const addCoins = url + '/addCoins';
export const getCoinHistory = url + '/getCoinHistory';
export const getPointsLeaderboard = url + '/getPointsLeaderboard';
export const addNotification = url + '/addNotification';
export const getNotifications = url + '/getNotifications';
export const markAsRead = url + '/markAsRead';
export const dismissNotification = url + '/dismissNotification';
export const SubscribeNewsletter = url + '/SubscribeNewsletter';
export const getRewards = url + '/getRewards';
export const redeemReward = url + '/redeemReward';
export const deleteCertificationApi = url + '/deleteCertification';
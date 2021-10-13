import storage from '@react-native-firebase/storage';
const LoadImageUrl = async (image) => {
    try {
        const url = await storage().ref(image).getDownloadURL();
        return url;
    }
    catch (err) {
        console.log('ERROR')
        return '';
    }
}

export default LoadImageUrl;
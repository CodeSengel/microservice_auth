
const useApi = require('./useApi');

const api = useApi();



function platformKeyFactory() {
    

    
    const getAvailablePlatformList = async () => {
      const data = await api.list(process.env.TAB_PLATFORM_LIST_NAME)
        
        return data;
    };

    return {
        getAvailablePlatformList
    };
}

module.exports = platformKeyFactory;

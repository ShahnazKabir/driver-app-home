import axios from 'axios';

/**
 * Request Wrapper with default success/error actions
 */

const request = async (config)=> axios(config);

export default request;
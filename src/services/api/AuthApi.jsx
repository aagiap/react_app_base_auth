import ApiClient from "../ApiClient";
import {ApiUrl} from "../ApiUrl";

const AuthApi = {
    login: (username, password) => {
        return ApiClient.post(ApiUrl.LOGIN, { username, password }, {auth: false});
    }
};

export default AuthApi
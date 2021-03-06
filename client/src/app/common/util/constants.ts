export class Constants {
    // the api URL
    static BASE_URL = 'http://localhost:8081/mta/cntt/httt/market/';

    static API_URL = 'http://localhost:8081/mta/cntt/httt/market/';

    // the status of object
    static STATUS_LIST = [
        { id: 1, name: 'Active' },
        { id: 0, name: 'Inactive' }
    ];

    static PAGE_SIZE = 5;

    static PRICE_PATTERN = "/^(0|[1-9]\d*)(\.\d{2})?$/"

    static NAME_PATTERN = "(( *)[a-zA-Z\*%^!@#$\:;&=\(\)'\\-`.+,/\"0-9_-ẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹý]( *)+)*$";
// [^a-z]*[a-z]*[^a-z]
    static CODE_PATTERN = "^( *)[^a-zA-Z\*%^!@#$\:;&=\(\)'\\-`.+,/\"0-9_-ẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹý]*[a-zA-Z\*%^!@#$\:;&=\(\)'\\-`.+,/\"0-9_-ẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹý]*[^a-zA-Z\*%^!@#$\:;&=\(\)'\\-`.+,/\"0-9_-ẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹý]*$";

    static IP_PATTERN = "^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$";

    static USERNAME_PATTERN = "^[a-z0-9_-]{3,15}$";

    static PASSWORD_PATTERN = "((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})";

    static EMAIL_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

    static IMAGE_PATTERN = "([^\\s]+(\\.(?i)(jpg|png|gif|bmp))$)";

    static PHONE_NUMBER_PATTERN = "\\d{10}|(?:\\d{3}-){2}\\d{4}|\\(\\d{3}\\)\\d{3}-?\\d{4}";

    static SSO_CLIENT_ID = "GmoK_Fy7JFsqQPP36SkceDN3AIsa";

    static SSO_CALLBACK_URL = "http://192.168.11.115:4200/processing/";

    static SSO_IS_AUTH_URL = "https://sso.savis.vn";

    static SSO_IS_AUTH_INFO_URL = "http://sso.savis.vn:9763";

    static SSO_LOGOUT_URL = "https://sso.savis.vn/commonauth?commonAuthLogout=true&type=oidc&commonAuthCallerPath=http://192.168.11.115:4200";

    static AUTHORIZATION_CODE = "authorizationCode";
    static IS_AUTHENTIC = "isAuthentic";
    static CURRENT_USER = "currentUser";
    static ACCESS_TOKEN = "accessToken";
    static REFRESH_TOKEN = "refreshToken";
    static EXPIRE_TIME = "expireYime";
    static SESSION_STATE = "sessionState";
    static KEY_LANGUAGE = "keyLanguage";
    static RETURN_URL = "returnUrl";

    /* Variables export excel*/
    static EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    static EXCEL_EXTENSION = '.xlsx';

    /* Names of file export excel */
    static COUNTRY_EXCEL = "Country_Excel";
    static CURRENCY_EXCEL = "Currency_Excel";
    static DEPARTMENT_EXCEL = "Department_Excel";
    static DISTRICT_EXCEL = "District_Excel";
    static DMDVKIEMTOAN_EXCEL = "Dmdvkiemtoan_Excel"
    static LINHVUCKT_EXCEL = "Linhvuckt_Excel"
    static NATION_EXCEL = "Nation_Excel";
    static ORGANIZATION_EXCEL = "Organization_Excel"
    static POSITION_EXCEL = "Position_Excel"
    static PROVICNE_EXCEL = "Province_Excel";
    static RELIGION_EXCEL = "Religion_Excel";
    static REPORTFORM_EXCEL = "ReportForm_Excel";
    static REPORTTARGET_EXCEL = "ReportTarget_Excel";
    static WARD_EXCEL = "Ward_Excel";
    
}
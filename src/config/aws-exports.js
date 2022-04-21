const awsmobile = {
    "aws_project_region": process.env.REACT_APP_AWS_CONGITO_REGION,
    "aws_cognito_region": process.env.REACT_APP_AWS_CONGITO_REGION,
    "aws_user_pools_id": process.env.REACT_APP_USER_POOL_ID,
    "aws_user_pools_web_client_id": process.env.REACT_APP_POOLS_WEB_CLIENT_ID,
    'aws_appsync_graphqlEndpoint': process.env.REACT_APP_AWS_APPSYNC_ENDPOINT,
    'aws_appsync_region': process.env.REACT_APP_AWS_APPSYNC_REGION,
    'aws_appsync_authenticationType': process.env.REACT_APP_AWS_APPSYNC_AUTHINTICATION_TYPE, // You have configured Auth with Amazon Cognito User Pool ID and Web Client Id


    "oauth": {},
    "aws_cognito_login_mechanisms": [
        "EMAIL"
    ],
    "aws_cognito_signup_attributes": [
        "EMAIL"
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [
        "SMS"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": []
    }
};


export default awsmobile;
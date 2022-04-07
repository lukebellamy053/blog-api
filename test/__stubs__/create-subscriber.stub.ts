export const CREATE_SUBSCRIBER_BAD_REQUESTS = [{
    "name": "",
    "email": "test2@test.com",
    "frequency": "weekly",
    "country": "GB"
}, {
    "name": "Joe Doe",
    "email": "",
    "frequency": "weekly",
    "country": "GB"
}, {
    "name": "Joe Doe",
    "email": "test2@test.com",
    "frequency": "",
    "country": "GB"
}, {
    "name": "Joe Doe",
    "email": "test2@test.com",
    "frequency": "weekly",
    "country": ""
}];


export const CREATE_SUBSCRIBER_HAPPY_PATH = [
    {
        "name": "Joe Doe",
        "email": "test@test.com",
        "frequency": "weekly",
        "country": "GB"
    },
    {
        "name": "Joe Doe",
        "email": "test2@test.com",
        "frequency": "weekly",
        "country": "GB"
    },
    {
        "name": "Joe Doe",
        "email": "test3@test.com",
        "frequency": "monthly",
        "country": "GB"
    },
    {
        "name": "Joe Doe",
        "email": "test4@test.com",
        "frequency": "daily",
        "country": "GB"
    }
]

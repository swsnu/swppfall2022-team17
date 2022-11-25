export const user = {
  id: 1,
  email: "test1@test.com",
  password: "qwer1234",
};

export const token = {
  refresh:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6OTk5OTk5OTk5OSwiaWF0IjoxNjY4NDE0NzU2LCJqdGkiOiIzYzAzZmRlOWRjOWQ0NTc0YjRjZjY1ZDJiODNiMzkwZCIsInVzZXJfaWQiOjF9.NfmDDpV44LzALhorjzRUwgKItv5WB2AY-IfK36weJi0",
  access:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjo5OTk5OTk5OTk5LCJpYXQiOjE2Njg0MTQ3NTYsImp0aSI6ImE3MDVhNTVjNDUzYzQzOWM4ZDNiMzIyOGU4MjA3YzU5IiwidXNlcl9pZCI6MX0.yMYnNSHIyVEoXu56903lQv0fkp-MZZXHfo2Tzq8s-nQ",
};

export const profile = {
  id: 1,
  user: 1,
  display_name: "test1",
  avatar:
    "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678099-profile-filled-512.png",
};

export const managedCafe_1 = {
  id: 1,
  name: "랜더링 확인용 카페",
  phone_number: "+8212345678",
  address: "랜더링 확인용 주소",
  avatar: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678099-profile-filled-512.png",
  introduction: "랜더링 확인용 설명",
  force_closed: false
}

export const managedCafe_2 = {
  id: 2,
  name: "휴업 확인용 카페",
  phone_number: "+82876654321",
  address: "휴업 확인용 주소",
  avatar: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678099-profile-filled-512.png",
  introduction: "휴업 확인용 설명",
  force_closed: true
}

export const managedCafeList = [{
  managedCafe_1,
  managedCafe_2
}];
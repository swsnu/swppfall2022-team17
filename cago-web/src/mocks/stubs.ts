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
  avatar: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678099-profile-filled-512.png",
};

export const cafes = [
  {
    id: 1,
    is_managed: true,
    name: "cafe1",
    phone_number: "+821012341234",
    location: ["127", "37"],
    address: "address1",
    avatar: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678099-profile-filled-512.png",
    crowdedness: 1,
    force_closed: false,
    introduction: "hello",
    managers: [1],
    owner: 1,
    registration_number: "1234567890",
  },
  {
    id: 2,
    is_managed: false,
    name: "cafe2",
    phone_number: "+821012341234",
    location: ["127", "37"],
    address: "address2",
  },
];

export const cafe_menu = [
  {
    id: 1,
    cafe: 1,
    name: "아메리카노",
    is_main: true,
    category: "커피",
    price: "5000",
    image: "https://cdn4.iconfinder.com/data/icons/sketchy-basic-icons/94/coffee-512.png",
  },
  {
    id: 2,
    cafe: 1,
    name: "카페라떼",
    is_main: false,
    category: "커피",
    price: "6000",
    image: "https://cdn4.iconfinder.com/data/icons/sketchy-basic-icons/94/coffee-512.png",
  },
  {
    id: 3,
    cafe: 1,
    name: "치크 케이크",
    is_main: true,
    category: "케이크",
    price: "10000",
    image: "https://cdn4.iconfinder.com/data/icons/sketchy-basic-icons/94/coffee-512.png",
  },
];

export const articles = [
  {
    id: 1,
    cafe: 1,
    title: "title1",
    content: "content1",
    comments: [],
    created_at: "2022-12-7",
    updated_at: "2022-12-7",
    is_updated: false,
  },
];

export const images = [
  {
    id: 1,
    cafe: 1,
    url: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678099-profile-filled-512.png",
    is_main: true,
  },
  {
    id: 2,
    cafe: 1,
    url: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678099-profile-filled-512.png",
    is_main: false,
  },
];

export const reviews = [
  {
    id: 1,
    cafe: 1,
    author: {
      id: 1,
      user: 2,
      display_name: "test2",
      avatar: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678099-profile-filled-512.png",
    },
    content: "review 1",
    rating: 3,
    strength: "Taste",
    created_at: "2022-12-10",
  },
];

import { Cafe, ManagedCafe } from "components/contents/CafesMap";
import { Article, Comment } from "lib/board";
import { CafeImage } from "lib/image";
import { Menu } from "lib/menu";
import { Profile } from "lib/profile";
import { Review } from "lib/review";

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

export const profile: Profile = {
  id: 1,
  user: 1,
  display_name: "test1",
  avatar: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678099-profile-filled-512.png",
};

export const profile2: Profile = {
  id: 1,
  user: 2,
  display_name: "test2",
  avatar: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678099-profile-filled-512.png",
};

export const cafes: (Cafe | ManagedCafe)[] = [
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
    registration_number: 1234567890,
    is_liked: true,
    num_likes: 2,
    num_reviews: 2,
    num_taste: 1,
    num_service: 3,
    num_mood: 2,
    average_rating: 4.2,
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

export const cafe_menu: Menu[] = [
  {
    id: 1,
    cafe: 1,
    name: "아메리카노",
    is_main: true,
    category: "커피",
    price: 5000,
    image: "https://cdn4.iconfinder.com/data/icons/sketchy-basic-icons/94/coffee-512.png",
  },
  {
    id: 2,
    cafe: 1,
    name: "카페라떼",
    is_main: false,
    category: "커피",
    price: 6000,
    image: "https://cdn4.iconfinder.com/data/icons/sketchy-basic-icons/94/coffee-512.png",
  },
  {
    id: 3,
    cafe: 1,
    name: "치크 케이크",
    is_main: true,
    category: "케이크",
    price: 10000,
    image: "https://cdn4.iconfinder.com/data/icons/sketchy-basic-icons/94/coffee-512.png",
  },
];

export const comments: Comment[] = [
  {
    id: 1,
    article: 1,
    content: "hello",
    is_customer: true,
    author: profile,
    created_at: "",
    updated_at: "",
    is_updated: false,
  },
  {
    id: 2,
    article: 1,
    content: "world",
    is_customer: true,
    author: profile2,
    created_at: "",
    updated_at: "",
    is_updated: true,
  },
];

export const articles: Article[] = [
  {
    id: 1,
    cafe: 1,
    title: "title1",
    content: "content1",
    comments,
    created_at: "2022-12-7",
    updated_at: "2022-12-7",
    is_updated: false,
  },
];

export const images: CafeImage[] = [
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

// Ignore 'one review per user' policy.
export const reviews: Review[] = [
  {
    id: 1,
    cafe: 1,
    author: profile,
    content: "review 1",
    rating: 5,
    strength: "Taste",
    created_at: "2022-12-10",
  },
  {
    id: 2,
    cafe: 1,
    author: profile,
    content: "review 2",
    rating: 3,
    strength: "Service",
    created_at: "2022-12-10",
  },
  {
    id: 3,
    cafe: 1,
    author: profile2,
    content: "review 3",
    rating: 4,
    strength: "Taste",
    created_at: "2022-12-10",
  },
  {
    id: 4,
    cafe: 4,
    author: profile2,
    content: "review 4",
    rating: 1,
    strength: "Mood",
    created_at: "2022-12-10",
  },
  {
    id: 5,
    cafe: 5,
    author: profile2,
    content: "review 5",
    rating: 2,
    strength: "Service",
    created_at: "2022-12-10",
  },
];

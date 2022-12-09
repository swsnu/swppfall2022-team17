import json

from locust import HttpUser, between, task

credentials = {"email": "test1@test.com", "password": "qwer1234"}
cafe_id = 1


class APIUser(HttpUser):
    wait_time = between(2, 10)

    def on_start(self):
        self.client.headers = {"Content-Type": "application/json"}
        res = self.client.post(
            "/auth/login/",
            data=json.dumps(credentials),
        )
        if res.status_code == 200:
            access_token = res.json().get("access")
            self.client.headers |= {"Authorization": f"Bearer {access_token}"}

    @task(10)
    def refresh(self):
        if dict(self.client.cookies).get("refresh_token"):
            res = self.client.post("/auth/refresh/")
            if res.status_code == 200:
                access_token = res.json().get("access")
                self.client.headers |= {"Authorization": f"Bearer {access_token}"}

    @task(10)
    def get_profile(self):
        if self.client.headers.get("Authorization", None):
            self.client.get("/customer-profiles/me/")

    @task(8)
    def list_cafe(self):
        self.client.get("/cafes/")

    @task(6)
    def list_images(self):
        self.client.get(f"/cafe-images/?cafe_id={cafe_id}")

    @task(4)
    def list_menu(self):
        self.client.get(f"/menus/?cafe_id={cafe_id}")

    @task(4)
    def list_reviews(self):
        self.client.get(f"/reviews/?cafe_id={cafe_id}")

    @task(4)
    def list_articles(self):
        self.client.get(f"/board/?cafe_id={cafe_id}")

    @task(1)
    def like_on(self):
        if self.client.headers.get("Authorization", None):
            self.client.post(f"/like/", data=json.dumps({"cafe": cafe_id}))

    @task(1)
    def like_off(self):
        if self.client.headers.get("Authorization", None):
            self.client.delete(f"/like/", data=json.dumps({"cafe": cafe_id}))

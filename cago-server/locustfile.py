from locust import HttpUser, between, task

credentials = {"email": "test1@test.com", "password": "qwer1234"}
cafe_id = 1


class APIUser(HttpUser):
    wait_time = between(2, 10)

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

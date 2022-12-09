from django.core.cache import cache
from django.db.models.signals import m2m_changed, post_delete, post_save
from rest_framework_extensions.key_constructor import bits, constructors

from cago.cafe.models import (
    BoardArticle,
    BoardComment,
    Cafe,
    CafeImage,
    CafeMenu,
    CafeReview,
    CustomerProfile,
    ManagedCafe,
)


# Key constructors
class PrefixedKeyConstructor(constructors.DefaultKeyConstructor):
    query_params = bits.QueryParamsKeyBit()
    kwargs = bits.KwargsKeyBit()

    def __init__(self, prefix="default", *args, **kwargs):
        self.prefix = prefix
        super().__init__(*args, **kwargs)

    def prepare_key(self, key_dict):
        key = super().prepare_key(key_dict)
        return "{}:{}".format(self.prefix, key)


class UserKeyConstructor(PrefixedKeyConstructor):
    user = bits.UserKeyBit()


# Cache Invalidation (naive)

PROFILE_PREFIX = "profile"
CAFE_PREFIX = "cafe"
CAFE_MENU_PREFIX = "cafe-menu"
CAFE_IMAGE_PREFIX = "cafe-image"
CAFE_ARTICLE_PREFIX = "cafe-article"
CAFE_COMMENT_PREFIX = "cafe-comment"
CAFE_REVIEW_PREFIX = "cafe-review"


def set_receivers_for_invalidation(prefix, model, m2m_fields=[]):
    def invalidate(sender=None, instance=None, *args, **kwargs):
        cache.delete_pattern(f"{prefix}:*")

    post_save.connect(receiver=invalidate, sender=model)
    post_delete.connect(receiver=invalidate, sender=model)

    for m2m_field in m2m_fields:
        m2m_changed.connect(
            receiver=invalidate, sender=getattr(model, m2m_field).through
        )


set_receivers_for_invalidation(PROFILE_PREFIX, CustomerProfile)
set_receivers_for_invalidation(CAFE_PREFIX, Cafe)
set_receivers_for_invalidation(CAFE_PREFIX, ManagedCafe, ["liked_users"])
set_receivers_for_invalidation(CAFE_PREFIX, CafeReview)
set_receivers_for_invalidation(CAFE_MENU_PREFIX, CafeMenu)
set_receivers_for_invalidation(CAFE_IMAGE_PREFIX, CafeImage)
set_receivers_for_invalidation(CAFE_ARTICLE_PREFIX, BoardArticle)
set_receivers_for_invalidation(CAFE_ARTICLE_PREFIX, BoardComment)
set_receivers_for_invalidation(CAFE_COMMENT_PREFIX, BoardComment)
set_receivers_for_invalidation(CAFE_REVIEW_PREFIX, CafeReview)

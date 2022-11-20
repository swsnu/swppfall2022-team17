from django.contrib.auth import get_user_model
from rest_framework import permissions

User = get_user_model()


class BaseEditOwnerOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    """

    owner_field = None  # ForeignKeyField
    owners_field = None  # ManyToManyField

    def has_object_permission(self, request, view, obj):
        # Always allow safe methods (get, head, and options)
        if request.method in permissions.SAFE_METHODS:
            return True

        # Pass if none of the fields is set.
        if self.owner_field is None and self.owners_field is None:
            return True

        is_owner, is_owners = False, False

        # Check owner field
        if self.owner_field is not None and hasattr(obj, self.owner_field):
            is_owner = getattr(obj, self.owner_field) == request.user

        # Check owners field
        if self.owners_field is not None and hasattr(obj, self.owners_field):
            try:
                getattr(obj, self.owners_field).get(pk=request.user.pk)
                is_owners = True
            except User.DoesNotExist:
                is_owners = False

        return is_owner or is_owners

from rest_framework import permissions


class BaseEditOwnerOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    """

    owner_field = None

    def has_object_permission(self, request, view, obj):
        # Has no effect when owner_field is not properly set.
        if self.owner_field is None or not hasattr(obj, self.owner_field):
            return True

        # Always allow GET, HEAD, OPTIONS, or POST requests.
        if request.method in permissions.SAFE_METHODS + ("POST",):
            return True

        return getattr(obj, self.owner_field) == request.user

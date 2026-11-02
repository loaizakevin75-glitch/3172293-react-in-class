INSERT INTO group_permissions (
    group_id,
    permissions_id
)
SELECT
    39,
    permissions_id
FROM permissions
WHERE permission_codename IN (
    'list_user',
    'create_user'
);

-- database/migrations/create_user_permissions.sql
CREATE TABLE user_permissions (
    user_id INTEGER NOT NULL,
    permissions_id INTEGER NOT NULL,

    PRIMARY KEY (user_id, permissions_id),

    CONSTRAINT fk_user_permissions_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_user_permissions_permission
        FOREIGN KEY (permissions_id)
        REFERENCES permissions(permissions_id)
        ON DELETE CASCADE
);
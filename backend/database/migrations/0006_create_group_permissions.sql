-- database/migrations/create_group_permissions.sql

CREATE TABLE group_permissions (
    group_id INTEGER NOT NULL,
    permissions_id INTEGER NOT NULL,

    PRIMARY KEY (group_id, permissions_id),

    CONSTRAINT fk_group_permissions_group
        FOREIGN KEY (group_id)
        REFERENCES groups(group_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_group_permissions_permission
        FOREIGN KEY (permissions_id)
        REFERENCES permissions(permissions_id)
        ON DELETE CASCADE
);
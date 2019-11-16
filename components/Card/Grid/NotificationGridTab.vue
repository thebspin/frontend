/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #content>
            <BaseForm>
                <div class="notifications-list">
                    <List v-if="notifications.length">
                        <NotificationListElement
                            v-for="notification in notifications"
                            :key="notification.id"
                            :notification="notification" />
                        <NotificationListFooter>
                            <BaseButton
                                :title="buttonTitle"
                                @click.native="onLoadMoreNotifications" />
                        </NotificationListFooter>
                    </List>
                    <NotificationPlaceholder
                        v-else
                        :layout-orientation="horizontalOrientation" />
                </div>
            </BaseForm>
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { LayoutOrientation } from '~/defaults/layout';
import { DATA_LIMIT } from '~/defaults/grid';
import ResponsiveCenteredViewTemplate from '~/components/Layout/ResponsiveCenteredViewTemplate';
import BaseForm from '~/components/Form/BaseForm';

export default {
    name: 'AttributeGridTab',
    components: {
        ResponsiveCenteredViewTemplate,
        BaseForm,
        BaseButton: () => import('~/components/Buttons/BaseButton'),
        List: () => import('~/components/List/List'),
        NotificationListElement: () => import('~/components/List/Notifications/NotificationListElement'),
        NotificationListFooter: () => import('~/components/List/Notifications/NotificationListFooter'),
        NotificationPlaceholder: () => import('~/components/List/Notifications/NotificationPlaceholder'),
    },
    computed: {
        ...mapState('notifications', {
            notifications: (state) => state.notifications,
            limit: (state) => state.limit,
            count: (state) => state.count,
        }),
        horizontalOrientation() {
            return LayoutOrientation.HORIZONTAL;
        },
        buttonTitle() {
            const notificationsNumber = this.limit + DATA_LIMIT < this.count
                ? DATA_LIMIT
                : this.count - this.limit + DATA_LIMIT;

            return `LOAD MORE NOTIFICATIONS (${notificationsNumber})`;
        },
    },
    methods: {
        ...mapActions('notifications', [
            'setNotificationsLimit',
            'requestForNotifications',
        ]),
        onLoadMoreNotifications() {
            this.setNotificationsLimit(this.limit + DATA_LIMIT);
            this.requestForNotifications();
        },
    },
};
</script>

<style lang="scss">
    .notifications-list {
        width: 560px;
    }
</style>
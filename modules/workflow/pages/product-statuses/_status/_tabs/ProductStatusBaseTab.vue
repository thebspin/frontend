/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #content>
            <VerticalFixedScroll>
                <ProductStatusForm />
            </VerticalFixedScroll>
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ProductStatusForm from '~/components/Forms/ProductStatusForm';
import ResponsiveCenteredViewTemplate from '~/core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import VerticalFixedScroll from '~/core/components/Layout/Scroll/VerticalFixedScroll';

export default {
    name: 'ProductStatusBaseTab',
    components: {
        VerticalFixedScroll,
        ProductStatusForm,
        ResponsiveCenteredViewTemplate,
    },
};
</script>

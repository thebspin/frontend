/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Card :title="selectedLanguage">
        <Form>
            <FormGroup>
                <TextField
                    :value="parsedValue('label')"
                    solid
                    label="Attribute name"
                    regular
                    :error-messages="errorLabelMessage"
                    :disabled="!isUserAllowedToUpdate"
                    @input="(value) => setTranslationPropertyValue(value, 'label')" />
                <TextArea
                    v-if="hasPlaceholder"
                    :value="parsedValue('placeholder')"
                    solid
                    label="Placeholder"
                    resize="none"
                    :style="{height: '150px'}"
                    :error-messages="errorPlaceholderMessage"
                    :disabled="!isUserAllowedToUpdate"
                    @input="(value) => setTranslationPropertyValue(value, 'placeholder')" />
                <TextArea
                    :value="parsedValue('hint')"
                    solid
                    label="Tooltip for writers"
                    resize="none"
                    :style="{height: '150px'}"
                    :error-messages="errorHintMessage"
                    :disabled="!isUserAllowedToUpdate"
                    @input="(value) => setTranslationPropertyValue(value, 'hint')" />
                <template v-if="hasOptions">
                    <Divider />
                    <AttributeOptionValues
                        :language-code="languageCode"
                        :disabled="!isUserAllowedToUpdate" />
                </template>
            </FormGroup>
        </Form>
    </Card>
</template>

<script>
import { mapState } from 'vuex';
import { hasPlaceholder, hasOptions } from '~/model/attributes/AttributeTypes';
import { getKeyByValue } from '~/model/objectWrapper';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';
import translationCardMixin from '~/mixins/card/translationCardMixin';
import TextField from '~/core/components/Inputs/TextField';
import TextArea from '~/core/components/Inputs/TextArea';
import Divider from '~/core/components/Dividers/Divider';
import AttributeOptionValues from '~/components/Card/AttributeOptionValues';
import Card from '~/core/components/Card/Card';
import Form from '~/core/components/Form/Form';
import FormGroup from '~/core/components/Form/FormGroup';

export default {
    name: 'AttributeTranslationForm',
    components: {
        Card,
        Form,
        FormGroup,
        Divider,
        TextField,
        TextArea,
        AttributeOptionValues,
    },
    mixins: [errorValidationMixin, translationCardMixin],
    computed: {
        ...mapState('data', {
            attrTypes: (state) => state.attrTypes,
        }),
        ...mapState('attribute', {
            type: (state) => state.type,
        }),
        hasPlaceholder() {
            return hasPlaceholder(this.typeKey);
        },
        hasOptions() {
            return hasOptions(this.typeKey);
        },
        typeKey() {
            return getKeyByValue(this.attrTypes, this.type);
        },
        isUserAllowedToUpdate() {
            return this.$hasAccess(['ATTRIBUTE_UPDATE']);
        },
        errorLabelMessage() {
            const labelIndex = `label_${this.languageCode}`;
            return this.elementIsValidate(labelIndex);
        },
        errorPlaceholderMessage() {
            const placeholderIndex = `placeholder_${this.languageCode}`;
            return this.elementIsValidate(placeholderIndex);
        },
        errorHintMessage() {
            const hintIndex = `hint_${this.languageCode}`;
            return this.elementIsValidate(hintIndex);
        },
    },
};
</script>

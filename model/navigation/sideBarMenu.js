/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const unassignedToSectionItems = [
    {
        title: 'Dashboard',
        routing: '/dashboard',
        icon: 'Dashboard',
        privileges: [],
    },
];

const manageSectionItems = [
    {
        title: 'Products catalog',
        routing: '/products',
        icon: 'Document',
        privileges: ['PRODUCT_READ'],
    },
    {
        title: 'Product templates',
        routing: '/templates',
        icon: 'Templates',
        privileges: ['TEMPLATE_DESIGNER_READ'],
    },
    {
        title: 'Categories',
        routing: '/categories',
        icon: 'Category',
        privileges: ['CATEGORY_READ'],
    },
    {
        title: 'Category trees',
        routing: '/category-trees',
        icon: 'Tree',
        privileges: ['CATEGORY_TREE_READ'],
    },
    {
        title: 'Attributes',
        routing: '/attributes',
        icon: 'Attributes',
        privileges: ['CATEGORY_TREE_READ'],
    },
    {
        title: 'Media',
        routing: '/placeholder/media',
        icon: 'Media',
        privileges: ['CATEGORY_TREE_READ'],
    },
    {
        title: 'Segments',
        routing: '/placeholder/segments',
        icon: 'Templates',
        privileges: [],
    },
];

const collectAndDistributeSectionItems = [
    {
        title: 'Export',
        routing: '/placeholder/export',
        icon: 'Export',
        privileges: [],
    },
    {
        title: 'Channels',
        routing: '/placeholder/channels',
        icon: 'Channels',
        privileges: [],
    },
];

const systemSectionItems = [
    {
        title: 'Users',
        routing: '/users',
        icon: 'User',
        privileges: ['USER_READ'],
    },
    {
        title: 'Workflows',
        routing: '/placeholder/workflow',
        icon: 'Flow',
        privileges: [],
    },
    {
        title: 'Settings',
        routing: '/settings',
        icon: 'Settings',
        privileges: [],
    },
];

const sections = [
    {
        key: null,
        items: unassignedToSectionItems,
    },
    {
        key: 'MANAGE',
        items: manageSectionItems,
    },
    {
        key: 'COLLECT & DISTRIBUTE',
        items: collectAndDistributeSectionItems,
    },
    {
        key: 'SYSTEM',
        items: systemSectionItems,
    },
];

const extendSections = (modulesMenu) => {
    for (let i = 0; i < modulesMenu.length; i += 1) {
        const index = sections.findIndex(e => e.key === modulesMenu[i].key);
        if (index >= 0) {
            sections[index].items.push(...modulesMenu[i].items);
        } else {
            sections.push(modulesMenu[i]);
        }
    }
    return sections;
};

export const getValidatedMenuData = (canIUse, modulesMenu) => {
    const menu = [];
    const extendedSections = extendSections(modulesMenu);
    const { length: sectionsNumber } = extendedSections;

    for (let i = 0; i < sectionsNumber; i += 1) {
        const { key, items } = extendedSections[i];
        const filteredItems = items.filter(e => !e.privileges
          || (e.privileges && !e.privileges.length)
          || e.privileges.every(privilege => canIUse(privilege)));
        menu.push({
            key,
            items: filteredItems,
        });
    }
    return menu;
};

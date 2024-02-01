import { registerBlockType } from '@wordpress/blocks';
import { __experimentalText as Text, TextControl, Card, CardBody, CardHeader, __experimentalHeading as Heading, SelectControl } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { useBlockProps } from '@wordpress/block-editor';

registerBlockType('mve-timeline/year', {
    edit: ({ setAttributes, attributes }) => {
        const blockProps = useBlockProps();
        const postType = useSelect(
            (select) => select('core/editor').getCurrentPostType(),
            []
        );
        const postId = useSelect(
            (select) => select('core/editor').getCurrentPostId(),
            []
        );

        const { editEntityRecord } = useDispatch('core');

        const tags = useSelect((select) => {
            return select('core').getEntityRecords('taxonomy', 'mve_timeline', { orderBy: 'name', 'order': 'asc', 'per_page': -1 }); // name and slug
        });

        const currentTags = useSelect(
            (select) => select('core/editor').getEditedPostAttribute('mve_timeline'),
            []
        );

        const options = [{
            value: 0,
            label: 'Choose timeline...'
        }].concat(tags ? tags.map((tag) => {
            return {
                value: tag.id,
                label: tag.name
            };
        }) : []);

        function onChangeTimeline(value) {
            value = parseInt(value, 10);
            editEntityRecord('postType', 'mve_timeline_item', postId, {
                'mve_timeline': !isNaN(value) ? [parseInt(value, 10)] : [0]
            });
        }

        const [meta, setMeta] = useEntityProp('postType', postType, 'meta');

        const valueYear = meta['mve_timeline_year'] ?? '';
        const valueYearEnd = meta['mve_timeline_year_end'] ?? '';

        const updateYear = (newValue) => {
            if (newValue === '') {
                setMeta({ ...meta, mve_timeline_year: null });
            } else {
                newValue = parseInt(newValue, 10);
                setMeta({ ...meta, mve_timeline_year: !isNaN(newValue) ? newValue.toString() : null });
            }
        };

        const updateYearEnd = (newValue) => {
            if (newValue === '') {
                setMeta({ ...meta, mve_timeline_year_end: null });
            } else {
                newValue = parseInt(newValue, 10);
                setMeta({ ...meta, mve_timeline_year_end: !isNaN(newValue) ? newValue.toString() : null });
            }
        };

        return (
            <Card {...blockProps}>
                <CardHeader>
                    <Heading level={4}>Year and timeline</Heading>
                </CardHeader>
                <CardBody>
                    <TextControl onChange={updateYear} value={valueYear} label="Year start" />
                    <TextControl onChange={updateYearEnd} value={valueYearEnd} label="Year end" />
                    <SelectControl label="Timeline" options={options} onChange={onChangeTimeline} value={currentTags ? currentTags[0] : ''} />
                </CardBody>
            </Card>
        );
    },

    // No information saved to the block.
    // Data is saved to post meta via the hook.
    save: () => {
        return null;
    },
});
import { registerBlockType } from '@wordpress/blocks';
import { __experimentalText as Text, Card, CardBody } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { useBlockProps } from '@wordpress/block-editor';

registerBlockType('mve-timeline/year', {
    edit: ({ setAttributes, attributes }) => {
        const blockProps = useBlockProps();
        const postType = useSelect(
            (select) => select('core/editor').getCurrentPostType(),
            []
        );
        const currentTags = useSelect(
            (select) => select('core/editor').getEditedPostAttribute('mve_timeline'),
            []
        );

        const tags = useSelect((select) => {
            return select('core').getEntityRecords('taxonomy', 'mve_timeline', { include: currentTags });
        }, [currentTags]);

        const [meta, setMeta] = useEntityProp('postType', postType, 'meta');

        const metaFieldValue = meta['mve_timeline_year'];

        return (
            <div {...blockProps}>
                <Card><CardBody>
                <Text>{metaFieldValue ? metaFieldValue : 'Year?'}</Text>
                <Text> - </Text>
                <Text>{(tags && tags.length) ? tags[0].name : 'Timeline?'}</Text>
                </CardBody></Card>
            </div>
        );
    },

    // No information saved to the block.
    // Data is saved to post meta via the hook.
    save: () => {
        return null;
    },
});
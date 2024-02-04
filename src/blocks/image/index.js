import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { useBlockProps } from '@wordpress/block-editor';
import { Card, CardBody, CardHeader, __experimentalHeading as Heading } from '@wordpress/components';
import { init as initImage, Widget as ImageWidget } from '../../shared/image.js';

registerBlockType('mve-timeline/image', {
    edit: ({ setAttributes, attributes }) => {
        const blockProps = useBlockProps();

        // Hetzelfde als in plugin
        const postType = useSelect(
            (select) => select('core/editor').getCurrentPostType(),
            []
        );

        const [meta, setMeta] = useEntityProp('postType', postType, 'meta');

        initImage(meta, setMeta);

        return (
            <Card {...blockProps}>
                <CardHeader>
                    <Heading level={4}>Image</Heading>
                </CardHeader>
                <CardBody>
                    <ImageWidget />
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
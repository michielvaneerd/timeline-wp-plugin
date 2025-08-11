import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { useBlockProps } from '@wordpress/block-editor';
import { Card, CardBody, CardHeader, __experimentalHeading as Heading } from '@wordpress/components';
import { init as initLinks, Widget as LinksWidget } from '../../shared/links.js';

registerBlockType('mve-timeline/links', {
    edit: ({ setAttributes, attributes }) => {
        const blockProps = useBlockProps();
        const postType = useSelect(
            (select) => select('core/editor').getCurrentPostType(),
            []
        );

        const [meta, setMeta] = useEntityProp('postType', postType, 'meta');

        initLinks(meta, setMeta);

        return (
            <Card {...blockProps}>
                <CardHeader>
                    <Heading level={4}>Links</Heading>
                </CardHeader>
                <CardBody>
                    <LinksWidget />
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
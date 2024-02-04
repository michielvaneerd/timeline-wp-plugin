import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { useBlockProps } from '@wordpress/block-editor';
import { Card, CardBody, CardHeader, __experimentalHeading as Heading } from '@wordpress/components';
import { init as initIntro, Widget as IntroWidget } from '../../shared/intro.js';

registerBlockType('mve-timeline/intro', {
    edit: ({ setAttributes, attributes }) => {
        const blockProps = useBlockProps();
        const postType = useSelect(
            (select) => select('core/editor').getCurrentPostType(),
            []
        );

        const [meta, setMeta] = useEntityProp('postType', postType, 'meta');

        initIntro(meta, setMeta);

        return (
            <Card {...blockProps}>
                <CardHeader>
                    <Heading level={4}>Intro</Heading>
                </CardHeader>
                <CardBody>
                    <IntroWidget />
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
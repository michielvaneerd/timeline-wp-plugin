import { registerBlockType } from '@wordpress/blocks';
import { Card, CardBody, CardHeader, __experimentalHeading as Heading } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { useBlockProps } from '@wordpress/block-editor';
import { init as initYearAndTimeline, Widget as YearAndTimelineWidget } from '../../shared/year_and_timeline.js';

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

        const [meta, setMeta] = useEntityProp('postType', postType, 'meta');

        initYearAndTimeline(meta, setMeta, postId);

        return (
            <Card {...blockProps}>
                <CardHeader>
                    <Heading level={4}>Year and timeline</Heading>
                </CardHeader>
                <CardBody>
                    <YearAndTimelineWidget />
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
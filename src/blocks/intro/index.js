import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { __experimentalText as Text } from '@wordpress/components';


registerBlockType('mve-timeline/intro', {
    edit: ({ setAttributes, attributes }) => {
        const blockProps = useBlockProps();
        const postType = useSelect(
            (select) => select('core/editor').getCurrentPostType(),
            []
        );

        const [meta, setMeta] = useEntityProp('postType', postType, 'meta');

        const metaFieldValue = meta['mve_timeline_intro'];
        const updateMetaValue = (newValue) => {
            setMeta({ ...meta, mve_timeline_intro: newValue });
        };

        return (
            <div {...blockProps}>
                <Text upperCase={true}>Intro</Text>
                <RichText
                    placeholder="Intro..."
                    allowedFormats={['core/bold', 'core/italic', 'mve-timeline/internal-link']}
                    label="MVE Timeline Intro"
                    value={metaFieldValue}
                    onChange={updateMetaValue}
                    style={{backgroundColor: '#F0F0F0', padding: '1rem', border: '1px solid #C0C0C0'}}
                />
            </div>
        );
    },

    // No information saved to the block.
    // Data is saved to post meta via the hook.
    save: () => {
        return null;
    },
});
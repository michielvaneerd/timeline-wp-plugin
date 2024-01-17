import { registerBlockType } from '@wordpress/blocks';
import { useState } from 'react';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { useBlockProps } from '@wordpress/block-editor';
import { __experimentalText as Text, TextControl, Button } from '@wordpress/components';


registerBlockType('mve-timeline/links', {
    edit: ({ setAttributes, attributes }) => {
        const blockProps = useBlockProps();
        const postType = useSelect(
            (select) => select('core/editor').getCurrentPostType(),
            []
        );
        const [value, setValue] = useState('');

        const [meta, setMeta] = useEntityProp('postType', postType, 'meta');

        let metaFieldValue = meta['mve_timeline_links'];
        if (!metaFieldValue) {
            metaFieldValue = [];
        } else {
            metaFieldValue = JSON.parse(metaFieldValue);
        }
        const addMetaValue = () => {
            metaFieldValue.push(value);
            setMeta({...meta, mve_timeline_links: JSON.stringify(metaFieldValue)});
            setValue('');
        };
        const removeMetaValue = (valueToRemove) => {
            const index = metaFieldValue.indexOf(valueToRemove);
            if (index > -1) {
                metaFieldValue.splice(index, 1);
                setMeta({...meta, mve_timeline_links: JSON.stringify(metaFieldValue)});
            }
        };

        return (
            <div {...blockProps}>
                <Text upperCase={true}>Links</Text>
                <ul>
                    {metaFieldValue.map((link) => (
                        <li key={link}>{link}
                        <Button isDestructive size="small" onClick={() => removeMetaValue(link)}>X</Button>
                        </li>
                    ))}
                </ul>
                <TextControl value={value} onChange={(newValue) => setValue(newValue)} />
                <Button size="small" variant="secondary" onClick={addMetaValue}>Add link</Button>
            </div>
        );
    },

    // No information saved to the block.
    // Data is saved to post meta via the hook.
    save: () => {
        return null;
    },
});
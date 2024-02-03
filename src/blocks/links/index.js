import { registerBlockType } from '@wordpress/blocks';
import { useState } from 'react';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { useBlockProps } from '@wordpress/block-editor';
import { __experimentalText as Text, TextControl, Button, Card, CardBody, CardHeader, __experimentalHeading as Heading } from '@wordpress/components';


registerBlockType('mve-timeline/links', {
    edit: ({ setAttributes, attributes }) => {
        const blockProps = useBlockProps();
        const postType = useSelect(
            (select) => select('core/editor').getCurrentPostType(),
            []
        );
        const [valueName, setValueName] = useState('');
        const [valueUrl, setValueUrl] = useState('');

        const [meta, setMeta] = useEntityProp('postType', postType, 'meta');

        let metaFieldValue = meta['mve_timeline_links'];
        if (!metaFieldValue) {
            metaFieldValue = [];
        } else {
            metaFieldValue = JSON.parse(metaFieldValue); // [{"name": "", "url": ""}]
        }
        const addMetaValue = () => {
            metaFieldValue.push({
                name: valueName,
                url: valueUrl
            });
            setMeta({ ...meta, mve_timeline_links: JSON.stringify(metaFieldValue) });
            setValueName('');
            setValueUrl('');
        };
        const removeLink = (valueToRemove) => {
            const newMetaFieldValue = [];
            for (const val of metaFieldValue) {
                if (val.name === valueToRemove.name && val.url === valueToRemove.url) {

                } else {
                    newMetaFieldValue.push(val);
                }
            }
            setMeta({ ...meta, mve_timeline_links: JSON.stringify(newMetaFieldValue) });
        };

        return (
            <Card {...blockProps}>
                <CardHeader>
                    <Heading level={4}>Links</Heading>
                </CardHeader>
                <CardBody>
                    <ul style={{ overflowX: 'auto', listStyleType: 'none', padding: 0, margin: 0, marginBottom: '1rem' }}>
                        {metaFieldValue.map((link) => (
                            <li key={link.url} style={{ whiteSpace: 'nowrap' }}><Button isDestructive size="small" onClick={() => removeLink(link)}>X</Button> {link.name} - {link.url}</li>
                        ))}
                    </ul>

                    <TextControl value={valueName} onChange={(newValue) => setValueName(newValue)} label="Title" />
                    <TextControl value={valueUrl} onChange={(newValue) => setValueUrl(newValue)} label="URL" />
                    <Button size="small" variant="secondary" onClick={addMetaValue} disabled={!(valueName && valueUrl)}>Add link</Button>
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